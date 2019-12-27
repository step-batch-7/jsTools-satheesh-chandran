const getLastLines = require('./src/lib').getLastLines;
const { readFileSync, existsSync } = require('fs');
const { stderr, stdout } = require('process');

const main = () => {
  const fileOperations = {
    read: readFileSync,
    encoding: 'utf8',
    exist: existsSync
  };

  const cmdArgs = process.argv.slice(2);
  const output = getLastLines(cmdArgs, fileOperations);
  stderr.write(output.err);
  stdout.write(output.content.join('\n'));
};

main();
