"use strict";

const convertIO = require("./src/convert-io");
const { TYPE_NUMBER, TYPE_STRING, TYPE_BOOL } = require("./src/constants");

const layout = {
  delimiter : ";",
  fields: [
    { name: "first_name", type: TYPE_STRING },
    { name: "last_name", type: TYPE_STRING },
    { name: "email", type: TYPE_STRING },
    { name: "gender", type: TYPE_STRING },
    { name: "age", type: TYPE_NUMBER },
    { name: "zip", type: TYPE_NUMBER },
    { name: "registered", type: TYPE_BOOL },
  ]
};

convertIO.generateJSonFileFromCsv("test.csv", "test.json", layout);