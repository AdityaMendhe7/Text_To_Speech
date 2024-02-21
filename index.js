const fs = require('fs');
const path = require('path');
const json = require('./input.json');

const formatData = (json) => {
  const formattedData = json.map(item => {
    const answers = Array.isArray(item.answers_asm) ? item.answers_asm.map(subAnswer => subAnswer.answer) : [];
    return {
      categoryQuestion_asm: item.categoryQuestion_asm,
      answer: answers
    };
  });

  return formattedData;
};

const output = formatData(json);

fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(output, null, 2));
