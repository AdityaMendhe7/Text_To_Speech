const fs = require('fs');
const path = require('path');
const json = require('./input.json');

const answers = json.map(item => item.answers_asm);

const formatData = (answers) => {
  const formattedData = answers.map(answer => {
    return answer.map( subAnswer => {
      const obj = {};
      for (const key in subAnswer) {
        obj[key] = subAnswer[key];
      }
      return obj;
    });
  });

  return formattedData;
};

const output = formatData(answers);

const csv = output.map(item => item.map(subItem => Object.values(subItem).join(',')));

fs.writeFileSync(path.join(__dirname, 'output.csv'), csv.join('\n'));
