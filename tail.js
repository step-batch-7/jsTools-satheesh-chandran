const { readFileSync, existsSync } = require('fs');
const { stderr, stdout, argv } = require('process');

const getLastLines = require('./src/lib').getLastLines;

const displayResult = function(tailResult) {
  stderr.write(tailResult.err);
  stdout.write(tailResult.content.join('\n'));
};

const main = () => {
  const fileOperations = {
    read: readFileSync,
    exist: existsSync
  };

  const [, , ...cmdArgs] = argv;
  const tailResult = getLastLines(cmdArgs, fileOperations);
  displayResult(tailResult);
};

main();
