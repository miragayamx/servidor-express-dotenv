const cluster = require('cluster');
const { fork } = require('child_process');
const numCPUs = require('os').cpus().length;
const fServerOn = require('./fServerOn');
const logger = require('./winstonConfig');

let clusterMode = false;

process.argv.forEach((value, index) => {
	if (value.includes('CLUSTER')) clusterMode = true;
});

if (clusterMode) {
	if (cluster.isMaster) {
		for (let i = 0; i < numCPUs; i++) {
			cluster.fork();
		}
		cluster.on('exit', (worker, code, signal) => {
			logger.info(`Worker ${worker.process.pid} died`);
		});
	} else {
		logger.info('Running server cluster!!!')
		fServerOn(8082);
	}
} else {
	const serverOn = fork('childServer.js');
	serverOn.send('Running server fork!!!');
}
