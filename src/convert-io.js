"use strict";

const fs = require("fs");
const { pipeline } = require("stream");
const CsvToJson = require("./transformers/csvToJson");

class ConvertIO {
  generateJSonFileFromCsv(csvFile, jsonFile, layout) {
    const csvReadStream = fs.createReadStream(csvFile);
    const jsonWriteStream = fs.createWriteStream(jsonFile);
    const csvToJson = new CsvToJson({ layout });
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

  getJSonFromCsv(csvFile, layout) {
    const csvReadStream = fs.createReadStream(csvFile);
    const csvToJson = new CsvToJson({ layout });
    return csvReadStream.pipe(csvToJson)
  }
}

module.exports = new ConvertIO();