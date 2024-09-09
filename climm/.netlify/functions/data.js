const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const filePath = path.join(__dirname, '../../public/data.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return {
    statusCode: 200,
    body: fileContent,
  };
};