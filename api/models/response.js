const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new Schema({
  usertoken: {
    type: String,
    required: true,
    unique: true,
  },
  accounts: Schema.Types.Mixed,
  date: {
    type: Date,
    default: Date.now,
  },
  preq: Schema.Types.Mixed,
  postq: Schema.Types.Mixed,
  instructions: Schema.Types.Mixed,
  rq1: {
    group: String,
    emotionSort: String,
    // responses: Schema.Types.Array,
    responses: Schema.Types.Mixed,
    accounts: Schema.Types.Array,
  },
  rq2: {
    group: String,
    // responses: Schema.Types.Array,
    responses: Schema.Types.Mixed,
    people: Schema.Types.Array,
  },
  task: Schema.Types.Number,
});

// const Response = mongoose.model("tresponse", responseSchema);

module.exports = responseSchema;
