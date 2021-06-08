const fServerOn = require('./fServerOn');

process.on('message', (msg) => {
    console.log(msg)
    fServerOn();
});
