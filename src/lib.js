const operateTail = require('./tailOperations').operateTail;

const usage = () => ['usage: tail [-n #] [file ...]'];
const isLineNumOk = function(option) {
  const num = +option.slice(2);
  return Number.isInteger(Math.abs(num)) && Math.abs(num) % 1 == 0;
};

const getNonOccuranceOfN = function(cmdArgs, i) {
  return (
    cmdArgs[i] != undefined &&
    cmdArgs[i].slice(0, 2) != '-n' &&
    cmdArgs[i - 1] != '-n'
  );
};

const getIndexOfPath = function(cmdArgs) {
  for (i = 0; i < cmdArgs.length; i++) {
    if (cmdArgs[i] == '-n') i++;
    const nonOccuranceOfN = getNonOccuranceOfN(cmdArgs, i);
    if (nonOccuranceOfN) return i;
  }
  return cmdArgs.length;
};

const concatOption = function(options) {
  return function(option, i) {
    if (option == '-n') {
      i++;
      return option + options[i];
    }
    return option;
  };
};

const doTail = function(cmdArgs) {
  const indexOfPath = getIndexOfPath(cmdArgs);
  const options = cmdArgs.slice(0, indexOfPath);
  let option = options.map(concatOption(options));
  const path = cmdArgs.slice(indexOfPath);
  if (option.length == 0 || path.length == 0) option.push('-n10');
  if (!option.every(isLineNumOk)) return usage();
  return operateTail(option, path);
};

module.exports = {
  doTail,
  getIndexOfPath,
  concatOption
};
