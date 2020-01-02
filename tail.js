const { createReadStream } = require('fs');
const { stderr, stdout, stdin, argv } = require('process');

const performTail = require('./src/lib').performTail;

const main = () => {
  const streams = { createReadStream, stdin };
  const displayResult = function(content, error) {
    stderr.write(error);
    stdout.write(content.join('\n'));
  };

  const [, , ...cmdArgs] = argv;
  performTail(cmdArgs, streams, displayResult);
};

main();
