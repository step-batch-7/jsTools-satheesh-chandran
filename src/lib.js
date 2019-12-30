'use strict';

const { operateTail } = require('./tailOperations');

const usage = () => 'usage: tail [-n #] [file ...]';

const isFilePath = function(currentArg, previousArg) {
  return currentArg !== '-n' && previousArg !== '-n';
};

const getFilePath = function(userArgs) {
  const lastIndex = -1;
  for (let index = 0; index < userArgs.length; index++) {
    if (isFilePath(userArgs[index], userArgs[index + lastIndex])) {
      return userArgs[index];
    }
  }
};

const getLineNum = function(lineNum) {
  if (lineNum) {
    return lineNum;
  }
  const defaultNumberOfLine = 10;
  return defaultNumberOfLine;
};

const getTailOptions = function(cmdArgs) {
  const filePath = getFilePath(cmdArgs);
  const pathPositionLimit = 2;
  if (cmdArgs.indexOf(filePath) > pathPositionLimit) {
    return null;
  }
  const nonExistingIndex = -1;
  const previousArg = cmdArgs[cmdArgs.indexOf(filePath) + nonExistingIndex];
  const tailOption = {
    filePath: filePath,
    lineNum: getLineNum(previousArg)
  };
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
