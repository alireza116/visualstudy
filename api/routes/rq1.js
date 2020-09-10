const express = require("express");
const router = express.Router();
const csv = require("csvtojson");
const randomstring = require("randomstring");
const mongoose = require("mongoose");
// const Response = require("../models/response");

const responseSchema = require("../models/response");

let test = false;
let collection;
if (test) collection = "tresponse";
else collection = "s1v2response";

const Response = mongoose.model(collection, responseSchema);

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
        // if we want the block design
        // let outData = getDataBlock(data, emotionSort, blockSize);
        // if we want the no block design
        let outData = getDataNoBlock(data, emotionSort, blockSize);
        //
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

router.post("/response", function (req, res) {
  // console.log(req.body);
  let update = {};
  update[`rq1.responses.${req.session.accIndex}`] = req.body;
  if (req.session.accIndex == 7) {
    req.session.completed = true;
  }
  console.log(req.session.accIndex);
  console.log(req.session.completed);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    {
      // $push: { "rq1.responses": req.body },
      $set: update,
    },
    (err, doc) => {
      if (err) res.status(404).send("error");
      else res.status(200).send();
    }
  );
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

function getDataNoBlock(data, emotion, blockSize) {
  let happy = data.filter((x) => x["selection"] == "happy");
  // happy = happy.sort((a, b) => {
  //   return +b["dpfc_happy"] - +a["dpfc_happy"];
  // });
  let angry = data.filter((x) => x["selection"] == "angry");
  // angry = angry.sort((a, b) => {
  //   return +b["dpfc_angry"] - +a["dpfc_angry"];
  // });
  let outputData = [];
  // for (let i = 0; i < happy.length; i = i + blockSize) {
  //   if (emotion == "happy") {
  //     outputData.push(...happy.slice(i, i + blockSize));
  //     outputData.push(...angry.slice(i, i + blockSize));
  //   } else if (emotion == "angry") {
  //     outputData.push(...angry.slice(i, i + blockSize));
  //     outputData.push(...happy.slice(i, i + blockSize));
  //   }
  // }
  if (blockSize === 10) {
    if (emotion == "happy") {
      outputData = happy;
    } else if (emotion == "angry") {
      outputData = angry;
    }
  } else {
    for (let i = 0; i < happy.length; i = i + blockSize) {
      if (emotion == "happy") {
        outputData.push(...happy.slice(i, i + blockSize));
        outputData.push(...angry.slice(i, i + blockSize));
      } else if (emotion == "angry") {
        outputData.push(...angry.slice(i, i + blockSize));
        outputData.push(...happy.slice(i, i + blockSize));
      }
    }
  }
  return outputData;
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
