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
  prequestionnaire: Schema.Types.Mixed,
  postquestionnaire: Schema.Types.Mixed,
  rq1: {
    group: String,
    responses: Schema.Types.Mixed,
    accounts: Schema.Types.Array,
  },
  rq2: {
    group: String,
    responses: Schema.Types.Mixed,
    people: Schema.Types.Array,
  },
});

module.exports = responseSchema;
