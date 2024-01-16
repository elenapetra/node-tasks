const getRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 100);
  return `Random number: ${randomNumber}`;
};
console.log(getRandomNumber());

module.exports = { getRandomNumber };
