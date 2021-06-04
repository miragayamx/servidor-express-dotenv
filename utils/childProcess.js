const randomNumbers = (cant = 100000000) => {
  const randomArray = [];
  for (let i = 0; i < cant; i++) {
    randomArray.push(Math.floor(Math.random() * (1 - 1001)) + 1);
  }
  const keys = randomArray.filter(
    (el, index) => randomArray.indexOf(el) === index
  );
  const randomObj = keys.reduce((acc, currentValue, index, array) => {
    acc[currentValue] = randomArray.filter((el) => el === currentValue).length;
  }, {});
  return randomObj;
};

let cant = 100000000;
process.on("message", (msg) => {
  console.log(msg);
  if (msg) cant = Number(msg);
});

const randoms = randomNumbers(cant);
process.send(randoms);
