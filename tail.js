const { createReadStream } = require('fs');
const { stderr, stdout, stdin, argv } = require('process');

const performTail = require('./src/lib').performTail;
const StreamCreator = require('./src/streamCreator').StreamCreator;

const createStdin = () => stdin;

const main = () => {
  const streamCreator = new StreamCreator(createStdin, createReadStream);
  const displayResult = function(content, error) {
    stderr.write(error);
    stdout.write(content.join('\n'));
  };

  const [, , ...cmdArgs] = argv;
  performTail(cmdArgs, streamCreator, displayResult);
};

main();
