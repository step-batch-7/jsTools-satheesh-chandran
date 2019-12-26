const operateTail = require('./tailOperations').operateTail;

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

const filterOptionAndFilePath = function(cmdArgs) {
  let firstFilePathIndex;
  const userArgs = concatNOption(cmdArgs);
  for (let index = 0; index < userArgs.length; index++) {
    if (userArgs[index].slice(0, 2) != '-n') {
      firstFilePathIndex = index;
      break;
    }
  }
  if (firstFilePathIndex == undefined) firstFilePathIndex = userArgs.length;
  return [
    userArgs.slice(0, firstFilePathIndex),
    userArgs.slice(firstFilePathIndex)
  ];
};

const getLastLines = function(cmdArgs) {
  const tailResult = { err: '', content: [''] };
  let [option, filePath] = filterOptionAndFilePath(cmdArgs);
  if (option.length == 0) option = ['-n10'];
  if (!option.every(isLineNumOk)) {
    tailResult.err = usage();
    return tailResult;
  }
  return operateTail(option[0], filePath[0], tailResult);
};

module.exports = {
  getLastLines,
  concatNOption
};
