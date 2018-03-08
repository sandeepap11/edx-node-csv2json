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

  const endOfLine = os.EOL;
  const allLines = data.split(endOfLine);
  let jsonValue = [];

  for(let i = 1; i < allLines.length; i ++)
    jsonValue.push(convertToJSON(allLines[0], allLines[i]));

    fs.writeFile(path.join(__dirname, 'customer-data.json'), JSON.stringify(jsonValue), 'utf8', (error) => {
      if(error) console.error(error);
      else {
        console.log('Writing done!');
      }

    });
}

fs.readFile(path.join(__dirname, 'customer-data.csv'), {encoding: 'utf-8'}, (error, data) => {

  if(error) return console.error(error);
  handleData(data);
})