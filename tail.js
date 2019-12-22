const doTail = require('./src/lib').doTail;

const main = () => {
  const cmdArgs = process.argv.slice(2);
  console.log(doTail(cmdArgs));
};

main();
