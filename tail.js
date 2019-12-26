const doTail = require('./src/lib').doTail;

const main = () => {
  const cmdArgs = process.argv.slice(2);
  const output = doTail(cmdArgs);
  process.stderr.write(output.err);
  process.stdout.write(output.content.join('\n'));
};

main();
