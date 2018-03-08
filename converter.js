module.exports = (inputfile = 'customer-data.csv') => {

// Import fs, path and os modules
  const fs = require('fs');
  const path = require('path');
  const os = require('os');

/**
 * Converts line of CSV text to Javascript object
 * @param {string} header The header from csv.
 * @param {string} line A row from the csv.
 * @return {object} The resultant object with header as key and corresponding value from csv as value.
**/
  const convertToJSON = (header, line) => {

    let result = {};

    // Get keys and values via splitting
    const keys = header.split(',');
    const values = line.split(',');

    // Assign values to corresponding keys
    for(let i = 0; i < keys.length; i++)
    result[keys[i]] = values[i];

    return result;

  }
  /**
   * Gets data from file read operationof csv and converts to JSON file.
   * @param {string} data Data read from the csv file.
  **/
  const handleData = (data) => {

    const outputFile = 'customer-data.json';
    const endOfLine = os.EOL;

    // Convert file data into separate lines by splitting using end of line character (/n, /r/n, etc., based on OS).
    const allLines = data.split(endOfLine);
    let jsonValue = [];

    // Call the convertToJSON method on each line and push the resultant object to array.
    for(let i = 1; i < allLines.length; i ++)
      jsonValue.push(convertToJSON(allLines[0], allLines[i]));

      // Write the JSON object into a file
      fs.writeFile(path.join(__dirname, outputFile), JSON.stringify(jsonValue), 'utf8', (error) => {
        if(error) console.error(error);
        else {
          console.log(`Writing done! Output file is ${outputFile} .`);
        }

      });
  }

  // Read the input CSV file and use the handleData function to write to JSON file.
  fs.readFile(path.join(__dirname, inputfile), {encoding: 'utf-8'}, (error, data) => {

    if(error) return console.error(error);
    handleData(data);
  })
};
