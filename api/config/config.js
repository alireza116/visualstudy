var fs = require("fs"),
  configPath = "/config.json";

var parsed = JSON.parse(fs.readFileSync(__dirname + configPath, "UTF-8"));

module.exports = parsed;
