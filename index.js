const fs = require('fs');
const json = require('./input.json');

const answers = json.map(item => item.answers_or);

const csv = answers.map(answer => {
  const row = [];
  for (const key in answer) {
    if (typeof answer[key] === 'object') {
      for (const subKey in answer[key]) {
        row.push(answer[key][subKey]);
      }
    } else {
      row.push(answer[key]);
    }
  }
  return row.join(',');
});

fs.writeFileSync('output.json', JSON.stringify(csv));
