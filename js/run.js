const inquirer = require("inquirer");
const { makeComputerChoise, getHash } = require("./get-random-number");
const findTheSameWords = require("./findTheSame");

function run(arr) {
  if (arr.length < 3) {
    console.log(
      "You should type at least 3 words and remember about odd amount"
    );
    return;
  }
  if (arr.length % 2 == 0) {
    console.log("Please enter an odd amount of values");
    return;
  }
  if (findTheSameWords(arr) > 1) {
    console.log(
      "The input words must not be repeated. Please enter different words"
    );
    return;
  }
  console.log("Your characters are accepted!");
  return gameStart(arr);
}

function gameStart(arr) {
  let counter = 1;
  let computerChoice = makeComputerChoise(arr);
  let getComputerHash = getHash(computerChoice, arr);
  let userChoice = "";
  let menuArr = arr
    .map((el) => `${counter++} - ${el}`)
    .concat([
      new inquirer.Separator(),
      "0 - exite",
      "? - help",
      new inquirer.Separator(),
    ]);

  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: `Computer has already made the choice!\nWait for your choice:`,
        choices: menuArr,
      },
    ])
    .then((answers) => {
      userChoice = answers.userChoice;
      let userIndex = arr.indexOf(userChoice.slice(4));
      if (userIndex >= 0) {
        gameProcessStart(arr, userIndex, computerChoice);
        console.log(
          `Computer choice was - ${arr[computerChoice]}\nHMAC: ${getComputerHash}`
        );
      }
      if (userChoice === "0 - exit") return;
      if (userChoice === "? - help") showHelpTable(arr);
    });
}

function gameProcessStart(arr, userChoice, compChoice) {
  let userWinItems = [];
  if (userChoice === compChoice) {
    console.log("Draw");
    return;
  }
  const findTheHalf = Math.floor(arr.length / 2);

  if (userChoice <= findTheHalf) {
    userWinItems = arr.slice(userChoice + 1, userChoice + findTheHalf + 1);
    return determineTheWinner(userWinItems, arr[compChoice]);
  } else {
    userWinItems = [...arr];
    userWinItems.splice(userChoice - findTheHalf, findTheHalf + 1);
    return determineTheWinner(userWinItems, arr[compChoice]);
  }
}

function determineTheWinner(winItems, compChoice) {
  if (winItems.includes(compChoice)) {
    console.log("Congratulations! You're a winner!");
    return;
  }
  console.log("Sorry, the computer has won");
  return;
}

function showHelpTable(arr) {
  let userWinItems = [];
  let statCollection = [];
  const findTheHalf = Math.floor(arr.length / 2);
  for (let i = 0; i < arr.length; i++) {
    if (i <= findTheHalf) {
      userWinItems = arr.slice(i + 1, i + findTheHalf + 1);
      statCollection.push({
        name: arr[i],
        win: `will win ${userWinItems.join(", ")}`,
      });
    } else {
      userWinItems = [...arr];
      userWinItems.splice(i - findTheHalf, findTheHalf + 1);
      statCollection.push({
        name: arr[i],
        win: `will win ${userWinItems.join(", ")}`,
      });
    }
  }
  console.table(statCollection);
  gameStart(arr);
}

module.exports = run;
