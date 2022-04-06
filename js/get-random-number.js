const { SHA3 } = require("sha3");

function makeComputerChoise(arr) {
  let rand = 0 + Math.random() * (arr.length - 0);
  return Math.floor(rand);
}

function getHash(compChoice, arr) {
  "use strict";
  const hash = new SHA3(256);
  hash.update(arr[compChoice]);
  let newHash = hash.digest("hex");
  return newHash;
}

module.exports = { makeComputerChoise, getHash };
