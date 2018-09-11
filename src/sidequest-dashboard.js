
const Hapi = require('hapi');
const Inert = require('inert');
const path = require('path');



module.exports = (() => {
    let serverPort = 3000;
    let serverHost = 'localhost';
    
    
    const startServer = async (masterWorker) => {

        let workersExecutedCount = 0;
        
        masterWorker.on('task-done', (task) =>{
            workersExecutedCount++;
        });

        const server = Hapi.server({
            host: serverHost,
            port: serverPort,
            routes: {
                files: {
                    relativeTo: path.resolve('./dist')
                }
            }
        });

        await server.register(Inert);
        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true,
                    index: true,
                }
            }
        });
        
        server.route({
            method:'GET',
            path:'/data',
            handler: function(req,h) {
                return {
                    schedulers: getSchedulers(masterWorker.schedulers()),
                    startedAt: masterWorker.startedAt(),
                    workers: getWorkers(masterWorker.currentWorkers()),
                    workersExecutedCount: workersExecutedCount
                }
            }
        });
        
        await server.start();
        
        console.log('Server running at:', server.info.uri);
    };
    
    
    function initialize(masterWorker) {
        startServer(masterWorker)
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