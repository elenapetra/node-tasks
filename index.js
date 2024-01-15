const getRandomNumber = () => {
    return Math.floor(Math.random() * 100);
  };
  console.log("Random number:", getRandomNumber());
  
  module.exports = { getRandomNumber };
  