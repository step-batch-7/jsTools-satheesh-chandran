'use strict';
const { operateTail } = require('./tailOperations');

const usage = () => 'usage: tail [-n #] [file ...]';

const getIndexOfFirstFilePath = function(userArgs) {
  for (let index = 0; index < userArgs.length; index++) {
    if (userArgs[index] != '-n' && userArgs[index - 1] != '-n') return index;
  }
  return userArgs.length;
};

const getTailOptions = function(cmdArgs) {
  const firstFilePathPosition = getIndexOfFirstFilePath(cmdArgs);
  if (cmdArgs.slice(0, firstFilePathPosition).length > 2) return null;
  const tailOption = {
    filePath: cmdArgs[firstFilePathPosition],
    lineNum: cmdArgs[firstFilePathPosition - 1]
  };
  if (!tailOption.lineNum) tailOption.lineNum = 10;
  return tailOption;
};

const getLastLines = function(cmdArgs, fileSystem) {
  const tailResult = { err: '', content: [''] };
  const tailOptions = getTailOptions(cmdArgs);
  if (!tailOptions) {
    tailResult.err = usage();
    return tailResult;
  }
  return operateTail(tailOptions.lineNum, tailOptions.filePath, fileSystem);
};

module.exports = {
  getLastLines,
  getTailOptions
};
