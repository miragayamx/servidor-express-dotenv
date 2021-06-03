const getInfo = (req, res) => {
    const data = {
        arg: process.argv.join(' '),
        platform: process.platform,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage().heapUsed,
    }
    res.status(200).render('info', data);
} 

module.exports = {
    getInfo
}