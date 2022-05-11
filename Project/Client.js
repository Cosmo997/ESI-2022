const { Client, logger } = require('camunda-external-task-client-js');
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);
module.exports = client;
