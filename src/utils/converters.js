const { TYPE_STRING, TYPE_NUMBER, TYPE_BOOL, TYPE_DATE } = require("../constants");

function convertToString(value) {
  return String(value);
}

function convertToNumber(value) {
  return Number(value);
}

function convertToBool(value) {
  return Boolean(value);
}

function convertToDate(value) {
  return Date.parse(value);
}

var functions = {};

Object.assign(functions,
  {[TYPE_STRING]:convertToString},
  {[TYPE_NUMBER]:convertToNumber},
  {[TYPE_BOOL]:convertToBool},
  {[TYPE_DATE]:convertToDate},
);

function converter(value, type) {
  return functions[type](value);
}

module.exports = {
  converter
}