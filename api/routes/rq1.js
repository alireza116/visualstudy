const express = require("express");
const router = express.Router();
const csv = require("csvtojson");
const randomstring = require("randomstring");
const mongoose = require("mongoose");
const responseSchema = require("../models/response");

const Response = mongoose.model("response", responseSchema);

router.get("/consent", (req, res) => {
  if (!req.session.consent) {
    let usertoken = randomstring.generate(8);
    let [accounts, accGroup] = getAccAssignments();
    req.session.accounts = accounts;
    req.session.usertoken = usertoken;
    req.session.accIndex = 0;
    req.session.accGroup = group;

    let [people, peopleGroup] = getPersonAssignment();
    req.session.people = people;
    req.session.personIndex = 0;
    req.session.peopleGroup = group;

    let newResponse = new Response({
      usertoken: usertoken,
      "rq1.group": accGroup,
      "rq1.accounts": accounts,
      "rq2.group": peopleGroup,
      "rq2.peeople": people,
    });

    newResponse.save(function (err) {
      if (err) console.log(err);
      res.send({
        token: usertoken,
        accGroup: accGroup,
        peopleGroup: peopleGroup,
        accounts: accounts,
        people: people,
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

const getPersonAssignment = () => {
  const groups = ["image", "noImage"];
  const clusterNames = [
    [129, "Donald Trump", "I"],
    [111, "Vladimir Putin", "J"],
    [122, "Theresa May", "K"],
    [100, "Hillary Clinton", "L"],
    [54, "Emanuel Macron", "M"],
    [126, "Angela Merkel", "N"],
    [117, "Barack Obama", "O"],
    [132, "Kim Jong-un", "P"],
  ];
  let group = choose(groups);
  let clusterNamesCopy = shuffle([...clusterNames]);
  let personAssignments;
  if (group === "image") {
    personAssignments = clusterNamesCopy.map((person, index) => {
      return index < 4
        ? {
            person: person[1],
            accAlias: person[2],
            personCluster: person[0],
            showImage: true,
            imageIdx: "happy_img_idx",
          }
        : {
            person: person[1],
            accAlias: person[2],
            personCluster: person[0],
            showImage: true,
            imageIdx: "angry_img_idx",
          };
    });
  } else {
    personAssignments = clusterNamesCopy.map((person) => {
      return {
        person: person[1],
        accAlias: person[2],
        personCluster: person[0],
        showImage: false,
      };
    });
  }
  return [shuffle(personAssignments), group];
};

const getAccAssignments = () => {
  let groups = ["block", "mixed"];
  let group = choose(groups);
  const accGroups = {
    suspicious_left: [
      ["veteranstoday", "A"],
      ["opednews", "C"],
    ],
    suspicious_right: [
      ["amlookout", "B"],
      ["InvestWatchBlog", "D"],
    ],
    trustworthy_left: [
      ["MotherJones", "E"],
      ["CNNPolitics", "G"],
    ],
    trustworthy_right: [
      ["nypost", "F"],
      ["Jerusalem_Post", "H"],
    ],
  };
  let accAssignments = [];
  if (group == "block") {
    Object.keys(accGroups).forEach((key) => {
      let accounts = [...accGroups[key]];
      let angryIndex = getRandomInt(2);
      let happyIndex = angryIndex ^ 1;
      accAssignments.push({
        account: accounts[angryIndex][0],
        accAlias: accounts[angryIndex][1],
        block: true,
        emotionSort: "angry",
        showImage: true,
      });
      accAssignments.push({
        account: accounts[happyIndex][0],
        accAlias: accounts[happyIndex][1],
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
        account: accounts[withImageIndex][0],
        accAlias: accounts[withImageIndex][1],
        block: false,
        emotionSort: null,
        showImage: true,
      });
      accAssignments.push({
        account: accounts[noImageIndex][0],
        accAlias: accounts[noImageIndex][1],
        block: false,
        emotionSort: null,
        showImage: false,
      });
    });
  }
  return [shuffle(accAssignments), group];
};

module.exports = router;
