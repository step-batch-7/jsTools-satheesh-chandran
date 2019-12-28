'use strict';

const { operateTail } = require('./tailOperations');

const usage = () => 'usage: tail [-n #] [file ...]';

const isFilePath = function(userArgs, index) {
  const PastPositionParam = 1;
  return (
    userArgs[index] !== '-n' && userArgs[index - PastPositionParam] !== '-n'
  );
};

const getFilePath = function(userArgs) {
  for (let index = 0; index < userArgs.length; index++) {
    if (isFilePath(userArgs, index)) {
      return userArgs[index];
    }
  }
};

const getTailOptions = function(cmdArgs) {
  const filePath = getFilePath(cmdArgs);
  const desiredPathPosition = 2;
  if (cmdArgs.indexOf(filePath) > desiredPathPosition) {
    return null;
  }
  const PastPositionParam = 1;
  const lineNum = cmdArgs[cmdArgs.indexOf(filePath) - PastPositionParam];
  const tailOption = {
    filePath: filePath,
    lineNum: lineNum
  };
  if (!tailOption.lineNum) {
    tailOption.lineNum = 10;
  }
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
