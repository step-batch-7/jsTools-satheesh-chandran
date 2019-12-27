const { operateTail } = require('./tailOperations');

const usage = () => 'usage: tail [-n #] [file ...]';

const isLineNumOk = function(option) {
  const num = +option.slice(2);
  return Number.isInteger(Math.abs(num)) && Math.abs(num) % 1 == 0;
};

const concatNOption = function(cmdArgs) {
  const userArguments = [];
  for (let index = 0; index < cmdArgs.length; index++) {
    if (cmdArgs[index] == '-n') {
      userArguments.push(cmdArgs[index] + cmdArgs[index + 1]);
      index++;
    } else userArguments.push(cmdArgs[index]);
  }
  return userArguments;
};

const getIndexOfFirstFilePath = function(userArgs) {
  for (let index = 0; index < userArgs.length; index++) {
    if (userArgs[index].slice(0, 2) != '-n') return index;
  }
  return userArgs.length;
};

const filterOptionsAndFilePaths = function(cmdArgs) {
  const userArgs = concatNOption(cmdArgs);
  const firstFilePathPosition = getIndexOfFirstFilePath(userArgs);
  return [
    userArgs.slice(0, firstFilePathPosition),
    userArgs.slice(firstFilePathPosition)
  ];
};

const getLastLines = function(cmdArgs, fileSystem) {
  const tailResult = { err: '', content: [''] };
  let [option, filePath] = filterOptionsAndFilePaths(cmdArgs);
  if (option.length == 0) option = ['-n10'];
  if (!option.every(isLineNumOk)) {
    tailResult.err = usage();
    return tailResult;
  }
  return operateTail(option[0], filePath[0], tailResult, fileSystem);
};

module.exports = {
  getLastLines,
  concatNOption,
  filterOptionsAndFilePaths
};
