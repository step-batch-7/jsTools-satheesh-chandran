const getLastLines = require('./src/lib').getLastLines;

const main = () => {
  const cmdArgs = process.argv.slice(2);
  const output = getLastLines(cmdArgs);
  process.stderr.write(output.err);
  process.stdout.write(output.content.join('\n'));
};

main();
