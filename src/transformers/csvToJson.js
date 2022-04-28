"use strict";

const { Transform } = require("stream");

const newLine = /\r?\n/;
const defaultFieldDelimiter = ";";

class CsvToJson extends Transform {
  
  constructor(opts){
    super(opts);
    if (opts) {
      this.layout = opts.layout;
    }
  }

  _transform(data, enconding, callback) {
    let lines = data.toString().split(newLine);
    let fields = lines.shift().split(defaultFieldDelimiter);
    let result = []
    lines.forEach((line)=>{
      let object = Object.create(Object.prototype);
      let values = line.split(defaultFieldDelimiter);
      values.forEach((value, i)=>{
        object[fields[i]]=value;
      })
      result.push(object);
    })
    this.push();
    callback();
  }

}

module.exports = new CsvToJson();