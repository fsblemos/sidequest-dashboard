const { assert } = require('chai');
const sidequest = require('sidequest');
const request  = require('request');
const dash = require('../src/sidequest-dashboard');

describe('Sidequest Dashboard', () => {
    beforeEach(() => {
        sidequest.use(dash.port(5011).host('localhost'));
    });
    
    afterEach(() => {
        sidequest.terminate();
    });
    
    it('return data', (done) => {
        sidequest.use({
            initialize: (masterWorker) => {
                masterWorker.on('task-registred', () => {
                    request('http://localhost:5011/data', function (error, response) {
                        assert.equal(response.headers["content-type"], 'application/json');
                        let body = JSON.parse(response.body);
                        assert.isNotEmpty(body.startedAt);
                        assert.lengthOf(body.schedulers, 2); 
                        assert.lengthOf(body.schedulers[0].tasks, 1);
                        assert.instanceOf(body.workers, Array);
                        done();
                    });
                });
            },
            terminate: () => {}
        });
        sidequest.initialize();
    });

    it('should count worker execution', (done) => {
        sidequest.use({
            initialize: (masterWorker) => {
                let counter = 0;
                masterWorker.on('task-done', () => {
                    counter++;
                    if(counter == 3){
                        request('http://localhost:5011/data', function (error, response) {
                            let body = JSON.parse(response.body);
                            assert.equal(body.workersExecutedCount, 3);
                            done();
                        });
                    }
                });
            },
            terminate: () => {}
        });
        sidequest.initialize();
    });

    it('should return current workers', (done) => {
        sidequest.use({
            initialize: (masterWorker) => {
                masterWorker.on('task-started', () => {
                        request('http://localhost:5011/data', function (error, response) {
                        let body = JSON.parse(response.body);
                        assert.isAtLeast(body.workers.length, 1);
                        done();
                    });
                });
            },
            terminate: () => {}
        });
        sidequest.initialize();
    });

    it('return 404', (done) => {
        sidequest.initialize();
        request('http://localhost:5011/', function (error, response) {
            assert.equal(response.statusCode, 404);
            let body = JSON.parse(response.body);
            assert.equal(body.message, "not found"); 
            done();
        });
    });
});