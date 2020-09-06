const express = require("express");
const router = express.Router();
const csv = require("csvtojson");
const randomstring = require("randomstring");
const mongoose = require("mongoose");
const responseSchema = require("../models/response");

const Response = mongoose.model("tresponse", responseSchema);

let groups = ["image", "noImage"];

// const clusterNames = [
//   [129, "Donald Trump", "I"],
//   [111, "Vladimir Putin", "J"],
//   [122, "Theresa May", "K"],
//   [100, "Hillary Clinton", "L"],
//   [54, "Emanuel Macron", "M"],
//   [126, "Angela Merkel", "N"],
//   [117, "Barack Obama", "O"],
//   [132, "Kim Jong-un", "P"],
// ];

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

// router.get("/init", (req, res) => {
//   let usertoken = req.session.usertoken;
//   let [people, group] = getPersonAssignment();
//   req.session.people = people;
//   req.session.personIndex = 0;
//   req.session.group = group;
//   Response.findOneAndUpdate(
//     { usertoken: usertoken },
//     {
//       "rq2.people": people,
//       "rq2.group": group,
//     },
//     {
//       new: true,
//     },
//     function (err, doc) {
//       if (err) {
//         return res.send(500, { error: err });
//       }
//       return res.status(200).json(people);
//     }
//   );
// });

router.post("/data", (req, res) => {
  let personIndex = req.body.personIndex;
  req.session.personIndex = personIndex;
  let people = req.session.people;
  let personAssignment = people[personIndex];
  let personName = personAssignment.person;
  let showImage = personAssignment.showImage;
  let idx = personAssignment.imageIdx;
  // console.log(personName);
  csv()
    .fromFile("./public/rq2data.csv")
    .then((jsonObj) => {
      let data = jsonObj.filter((x) => {
        return x["person_name"] == personName;
      });
      data.forEach((x) => {
        x["idx"] = x[idx];
      });
      if (data.length > 0) {
        res.status(200).json({
          data: data,
          showImage: showImage,
          personAssignment: personAssignment,
        });
      } else {
        res.status(404).send("could not find");
      }
    });
});

router.post("/response", function (req, res) {
  // console.log(req.body);
  console.log(req.session.personIndex);
  let usertoken = req.session.usertoken;
  let update = {};
  update[`rq2.responses.${req.session.personIndex}`] = req.body;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    // {
    //   $push: { "rq2.responses": req.body },
    // },
    {
      $set: update,
    },
    (err, doc) => {
      if (err) res.status(404).send("error");
      else res.status(200).send("success");
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

module.exports = router;
