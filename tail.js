const { readFileSync, existsSync } = require('fs');
const { stderr, stdout } = require('process');
const getLastLines = require('./src/lib').getLastLines;

const main = () => {
  const fileOperations = {
    read: readFileSync,
    encoding: 'utf8',
    exist: existsSync
  };

  const cmdArgs = process.argv.slice(2);
  const tailResult = getLastLines(cmdArgs, fileOperations);
  stderr.write(tailResult.err);
  stdout.write(tailResult.content.join('\n'));
};

main();
