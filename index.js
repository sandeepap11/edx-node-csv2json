const converter = require('./converter');

/**
* This is the file that needs to run via node command.
* Pass a csv file as argument. If not customer-data.csv will be taken by default
**/
converter(process.argv[2]);
