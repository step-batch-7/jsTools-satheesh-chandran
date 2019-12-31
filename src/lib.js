'use strict';

const { operateTail } = require('./tailOperations');

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

const formatTailOptions = function(filePath, previousArg) {
  return {
    filePath: filePath,
    lineNum: getLineNum(previousArg)
  };
};

const getTailOptions = function(cmdArgs) {
  const filePath = getFilePath(cmdArgs);
  const pathPositionLimit = 2;
  let pathPosition = cmdArgs.indexOf(filePath);
  if (!filePath) {
    pathPosition = cmdArgs.length;
  }
  if (pathPosition > pathPositionLimit) {
    return null;
  }
  const nonExistingIndex = -1;
  const previousArg = cmdArgs[pathPosition + nonExistingIndex];
  return formatTailOptions(filePath, previousArg);
};

const getLastLines = function(cmdArgs, streams, displayResult) {
  const tailOptions = getTailOptions(cmdArgs);
  return operateTail(tailOptions, streams, displayResult);
};

module.exports = {
  getLastLines,
  getTailOptions
};
