const cp = require('child_process')
const net = require('net')
const cpus = require('os').cpus()

const server = net.createServer()

server.listen(1337)

const workers = {}

function createWorkers() {
    const worker = cp.fork(`${__dirname}/work.js`)

    worker.on('exit', () => {
        console.log(worker.pid + 'exit')
        delete workers[worker.pid]
        createWorkers()
    })
    worker.send('server', server)
    workers[worker.pid] = worker
    console.log('create worker' + worker.pid)
}

for (let i = 0; i < cpus.length; i++) {
    createWorkers()
}

process.on('exit', () => {
    for (const pid in workers) {
        workers[pid].kill()
    }
})
