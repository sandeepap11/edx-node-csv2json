module.exports = (inputfile = 'customer-data.csv') => {

  const fs = require('fs');
  const path = require('path');
  const os = require('os');

  const convertToJSON = (header, line) => {

    let result = {};

    const keys = header.split(',');
    const values = line.split(',');

    for(let i = 0; i < keys.length; i++)
    result[keys[i]] = values[i];

    return result;

  }

  const handleData = (data) => {

    const outputFile = 'customer-data.json';
    const endOfLine = os.EOL;
    const allLines = data.split(endOfLine);
    let jsonValue = [];

    for(let i = 1; i < allLines.length; i ++)
      jsonValue.push(convertToJSON(allLines[0], allLines[i]));

      fs.writeFile(path.join(__dirname, outputFile), JSON.stringify(jsonValue), 'utf8', (error) => {
        if(error) console.error(error);
        else {
          console.log(`Writing done! Output file is ${outputFile} .`);
        }

      });
  }

  fs.readFile(path.join(__dirname, inputfile), {encoding: 'utf-8'}, (error, data) => {

    if(error) return console.error(error);
    handleData(data);
  })
};
