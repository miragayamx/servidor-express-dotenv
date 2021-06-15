const winston = require('winston')

const logger = winston.createLogger({
    level: 'warn',
    transports : [
        new winston.transports.Console({level:'verbose'}),
        new winston.transports.File({ filename: 'info.log', level:'error'}),
    ]
})

module.exports = logger;