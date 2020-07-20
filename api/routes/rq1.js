const express = require("express");
const router = express.Router();
const csv = require("csvtojson");
const randomstring = require("randomstring");
const mongoose = require("mongoose");

const url =
  "mongodb+srv://thesis:mammadNABOODI1989@cluster0.7mtj9.mongodb.net/thesisstudy?retryWrites=true&w=majority";

mongoose.connect(url);
mongoose.promise = global.Promise;

const Schema = mongoose.Schema;

const responseSchema = new Schema({
  usertoken: {
    type: String,
    required: true,
    unique: true,
  },
  accounts: Schema.Types.Mixed,
  group: String,
  date: {
    type: Date,
    default: Date.now,
  },
  prequestionnaire: Schema.Types.Mixed,
  postquestionnaire: Schema.Types.Mixed,
  rq1: Schema.Types.Mixed,
  rq2: Schema.Types.Mixed,
});

let groups = ["block", "mixed"];

let accs = [
  "veteranstoday",
  "amlookout",
  "opednews",
  "InvestWatchBlog",
  "MotherJones",
  "nypost",
  "CNNPolitics",
  "ladailynews",
];

const accGroups = {
  suspicious_left: ["veteranstoday", "opednews"],
  suspicious_right: ["amlookout", "InvestWatchBlog"],
  trustworthy_left: ["MotherJones", "CNNPolitics"],
  trustworthy_right: ["nypost", "ladailynews"],
};

const getAccAssignments = (group) => {
  let accAssignments = [];
  if (group == "block") {
    Object.keys(accGroups).forEach((key) => {
      let accounts = [...accGroups[key]];
      let angryIndex = getRandomInt(2);
      let happyIndex = angryIndex ^ 1;
      accAssignments.push({
        account: accounts[angryIndex],
        block: true,
        emotionSort: "angry",
        showImage: true,
      });
      accAssignments.push({
        account: accounts[happyIndex],
        block: true,
        emotionSort: "happy",
        showImage: true,
      });
    });
  } else if (group == "mixed") {
    Object.keys(accGroups).forEach((key) => {
      let accounts = [...accGroups[key]];
      let withImageIndex = getRandomInt(2);
      let noImageIndex = withImageIndex ^ 1;
      accAssignments.push({
        account: accounts[withImageIndex],
        block: false,
        emotionSort: null,
        showImage: true,
      });
      accAssignments.push({
        account: accounts[noImageIndex],
        block: false,
        emotionSort: null,
        showImage: false,
      });
    });
  }
  return shuffle(accAssignments);
};

const Response = mongoose.model("response", responseSchema);

router.get("/consent", (req, res) => {
  if (!req.session.consent) {
    let usertoken = randomstring.generate(8);
    let group = choose(groups);
    let accounts = getAccAssignments(group);
    req.session.accounts = accounts;
    req.session.usertoken = usertoken;
    req.session.accIndex = 0;
    req.session.group = group;
    console.log(req.session.accounts);
    let newResponse = new Response({
      usertoken: usertoken,
      group: group,
      accounts: accounts,
    });

    newResponse.save(function (err) {
      if (err) console.log(err);
      res.send({
        token: usertoken,
        group: group,
        accounts: accounts,
      });
    });
  } else {
    res.send({
      token: req.session.usertoken,
      group: req.session.group,
      accounts: req.session.accounts,
    });
  }
});

router.post("/data", (req, res) => {
  let accIndex = req.body.accIndex;
  req.session.accIndex = accIndex;
  let accounts = req.session.accounts;
  console.log(accIndex);
  let accAssignment = accounts[accIndex];
  let screen_name = accAssignment.account;
  let showImage = accAssignment.showImage;
  let blockSize;
  let emotionSort;
  if (accAssignment.block) {
    blockSize = 10;
    emotionSort = accAssignment.emotionSort;
  } else {
    blockSize = 1;
    emotionSort = "happy";
  }
  csv()
    .fromFile("./public/rq1data.csv")
    .then((jsonObj) => {
      let data = jsonObj.filter((x) => {
        return x["screen_name"] == screen_name;
      });
      if (data.length > 0) {
        let outData = getDataBlock(data, emotionSort, blockSize);
        res.status(200).json({
          data: outData,
          showImage: showImage,
          accAssignment: accAssignment,
        });
      } else {
        res.status(404).send("could not find");
      }
    });
});

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getDataBlock(data, emotion, blockSize) {
  let happy = data.filter((x) => x["selection"] == "happy");
  happy = happy.sort((a, b) => {
    return +b["dpfc_happy"] - +a["dpfc_happy"];
  });
  let angry = data.filter((x) => x["selection"] == "angry");
  angry = angry.sort((a, b) => {
    return +b["dpfc_angry"] - +a["dpfc_angry"];
  });
  let outputData = [];
  for (let i = 0; i < happy.length; i = i + blockSize) {
    if (emotion == "happy") {
      outputData.push(...happy.slice(i, i + blockSize));
      outputData.push(...angry.slice(i, i + blockSize));
    } else if (emotion == "angry") {
      outputData.push(...angry.slice(i, i + blockSize));
      outputData.push(...happy.slice(i, i + blockSize));
    }
  }
  return outputData;
}

module.exports = router;
