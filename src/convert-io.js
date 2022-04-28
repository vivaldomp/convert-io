"use strict";

const fs = require("fs");
const { pipeline } = require("stream");
const csvToJson = require("./transformers/csvToJson");

class ConvertIO {
  generateJSonFileFromCsv(csvFile, jsonFile) {
    const csvReadStream = fs.createReadStream(csvFile);
    const jsonWriteStream = fs.createWriteStream(jsonFile);
    pipeline(
      csvReadStream,
      csvToJson,
      jsonWriteStream,
      (err) =>{
        if (err) {
          throw err; 
        }
      }
    );
  }
}

module.exports = new ConvertIO();