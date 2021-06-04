const randomNumbers = (cant = 100000000) => {
  const randomArray = [];
  for (let i = 0; i < cant; i++) {
    randomArray.push(Math.floor(Math.random() * (1001 - 1)) + 1);
  }
  const keys = randomArray.filter(
    (el, index) => randomArray.indexOf(el) === index
  );
  const randomObj = {};
  keys.forEach((key) => {
    randomObj[key] = randomArray.filter((el) => el === key).length;
  });
  return randomObj;
};

process.on("message", (msg) => {
  if(!!msg){
    const randoms = randomNumbers(Number(msg));
    process.send(randoms);
  } else {
    const randoms = randomNumbers();
    process.send(randoms);
  }
});