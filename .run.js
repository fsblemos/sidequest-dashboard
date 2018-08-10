const sidequest = require('sidequest');
const sidequestDash = require('./src/sidequest-dashboard');

sidequest.use(sidequestDash);
sidequest.initialize();