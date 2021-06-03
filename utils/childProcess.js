const randomNumbers = (cant = 100000000) => {
  const randomArray = [];
  for (let i = 0; i < cant; i++) {
    randomArray.push(Math.floor(Math.random() * (1 - 1001)) + 1);
  }
  const keys = randomArray.filter((el, index) => randomArray.indexOf(el) === index);
  const randomObj = keys.reduce((acc, currentValue, index, array) => {
    acc[currentValue] = randomArray.filter((el) => el === currentValue).length;
  }, {});
  return randomObj;
};

process.on('data', cant => {
  console.log(cant)
  const randoms = cant ? randomNumbers(cant) : randomNumbers();
  process.send(randoms);
});
