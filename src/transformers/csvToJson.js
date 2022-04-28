"use strict";

const { Transform } = require("stream");
const { converter } = require("../utils/converters");

const newLine = /\r?\n/;
const defaultFieldDelimiter = ";";

class CsvToJson extends Transform {
  
  constructor(opts){
    super(opts);
    if (opts) {
      if (opts.layout && opts.layout.fields) {
        this.layout = {};
        opts.layout.fields.forEach((field)=>{
          Object.assign(this.layout, {
            [field.name]: field.type
          })
        })
      }
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
        object[fields[i]] = this.layout ? converter(value, this.layout[fields[i]]) : value;
      })
      result.push(object);
    })
    this.push(JSON.stringify(result));
    callback();
  }

}

module.exports = CsvToJson;