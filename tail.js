const getLastLines = require('./src/lib').getLastLines;
const { stderr, stdout } = require('process');

const main = () => {
  const cmdArgs = process.argv.slice(2);
  const output = getLastLines(cmdArgs);
  stderr.write(output.err);
  stdout.write(output.content.join('\n'));
};

main();
