const path = require('path');
const { fork } = require("child_process");

const getRandomNumbers = (req, res) => {
  const randomNumbers = fork(path.join(__dirname, "../utils/childProcess.js"));
  console.log(path.join(__dirname, "../utils/childProcess.js"));
  const cant = req.query ? req.query.cant : null;
  if(cant) randomNumbers.send(Number(cant));
  randomNumbers.on("data", (data) => {
    console.log(data);
  });
  res.status(200).json({ note: "randoms numbers" });
};

module.exports = {
  getRandomNumbers,
};
