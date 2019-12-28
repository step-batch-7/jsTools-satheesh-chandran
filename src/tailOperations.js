'use strict';

const getFileContent = function(fileOperations, path) {
  if (fileOperations.exist(path)) {
    return fileOperations.read(path, fileOperations.encoding);
  }
  return null;
};

const isLineNumValid = function(lineNum) {
  const requiredModulus = 0;
  const divisor = 1;
  const num = +lineNum;
  return (
    Number.isInteger(Math.abs(num)) &&
    Math.abs(num) % divisor === requiredModulus
  );
};

const offsetErr = lineNum => `tail: illegal offset -- ${lineNum}`;
const pathErr = path => `tail: ${path}: No such file or directory`;

const getTailLines = function(content, lineNum) {
  const startingPoint = 0;
  const lastNNumberOfLines = content
    .reverse()
    .slice(startingPoint, lineNum)
    .reverse();
  return lastNNumberOfLines;
};

const operateTail = function(lineNum, path, fs) {
  const tailResult = { err: '', content: [''] };
  if (!isLineNumValid(lineNum)) {
    tailResult.err = offsetErr(lineNum);
    return tailResult;
  }
  const content = getFileContent(fs, path);
  if (!content) {
    tailResult.err = pathErr(path);
    return tailResult;
  }
  tailResult.content = getTailLines(content.split('\n'), lineNum);
  return tailResult;
};

module.exports = {
  getFileContent,
  getTailLines,
  operateTail
};
