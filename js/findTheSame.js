const findTheSameWords = (arr) => {
  const obj = arr.reduce((acc, item) => {
    acc[item] = acc[item] ? acc[item] + 1 : 1;
    return acc;
  }, {});
  const numbers = Object.values(obj);
  return Math.max.apply(Math, numbers);
};

module.exports = findTheSameWords;
