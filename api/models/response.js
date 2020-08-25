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
  rq1: {
    group: String,
    emotionSort: String,
    responses: Schema.Types.Array,
    accounts: Schema.Types.Array,
  },
  rq2: {
    group: String,
    responses: Schema.Types.Array,
    people: Schema.Types.Array,
  },
});

module.exports = responseSchema;
