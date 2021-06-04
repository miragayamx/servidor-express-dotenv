const path = require("path");
const { fork } = require("child_process");

const getRandomNumbers = (req, res) => {
  const randomNumbers = fork(path.join(__dirname, "../utils/childProcess.js"));
  const cant = req.query.cant ? req.query.cant : 0;
  randomNumbers.send(cant);
  randomNumbers.on("message", (msg) => {
    res.status(200).json(msg)
  });
};

module.exports = {
  getRandomNumbers,
};
