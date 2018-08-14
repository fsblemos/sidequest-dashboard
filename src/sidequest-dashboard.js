const http = require('http');

module.exports = (() => {
    let server;
    let serverPort = 3000;
    let serverHost = 'localhost';

    function initialize(masterWorker) {
        let workersExecutedCount = 0;

        masterWorker.on('task-done', (task) =>{
            workersExecutedCount++;
        });

        server = http.createServer((req, res) => {
            if(req.url == '/data'){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(JSON.stringify({
                    schedulers: getSchedulers(masterWorker.schedulers()),
                    startedAt: masterWorker.startedAt(),
                    workers: getWorkers(masterWorker.currentWorkers()),
                    workersExecutedCount: workersExecutedCount
                }));
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    message: "not found"
                }));
            }
          });
          
          server.listen(serverPort, serverHost, () => {
            console.log(`Server running at http://${serverHost}:${serverPort}/`);
          });
    }

    function getSchedulers(schedulers) {
        return schedulers.map(scheduler => { 
            return {
                id: scheduler.id(),
                pid: scheduler.pid(),
                tasks: scheduler.tasks()
            }
        });
    }

    function getWorkers(workers) {
        return workers.map(worker => { 
            return {
                id: worker.id(),
                pid: worker.pid(),
            }
        });
    }

    function terminate(masterWorker) {
        server.close();
    }

    function port(portNumber){
        serverPort = portNumber;
        return this;
    }

    function host(hostname){
        serverHost = hostname;
        return this;
    }

    return {
        initialize: initialize,
        terminate: terminate,
        port: port,
        host: host
    }
})();
