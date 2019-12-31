const { createReadStream } = require('fs');
const { stderr, stdout, stdin, argv } = require('process');

const getLastLines = require('./src/lib').getLastLines;

const main = () => {
  const streams = { createReadStream, stdin };
  const displayResult = function(tailResult) {
    stderr.write(tailResult.err);
    stdout.write(tailResult.content.join('\n'));
  };

  const [, , ...cmdArgs] = argv;
  const tailResult = getLastLines(cmdArgs, streams, displayResult);
  displayResult(tailResult);
};

main();
