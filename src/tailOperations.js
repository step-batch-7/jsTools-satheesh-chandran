'use strict';

const isLineNumValid = function(lineNum) {
  const requiredModulus = 0;
  const divisor = 1;
  const num = +lineNum;
  return (
    Number.isInteger(Math.abs(num)) &&
    Math.abs(num) % divisor === requiredModulus
  );
};

const usage = () => 'usage: tail [-n #] [file ...]';
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

const handleError = function(tailOptions) {
  if (!tailOptions) {
    return usage();
  }
  if (!isLineNumValid(tailOptions.lineNum)) {
    return offsetErr(tailOptions.lineNum);
  }
};

const streamAction = function(stream, lineNum, callback) {
  stream.setEncoding('utf8');
  let fileContent = '';
  stream.on('data', data => {
    fileContent = fileContent + data;
  });
  stream.on('end', () => {
    const lastNNumberOfLines = getTailLines(fileContent.split('\n'), lineNum);
    callback(lastNNumberOfLines, '');
  });
  stream.on('error', () => {
    callback([''], pathErr(stream.path));
  });
};

const onTailOptions = function(tailOptions, streamCreator, onTailComplete) {
  const tailErrors = handleError(tailOptions);
  if (tailErrors) {
    onTailComplete([''], tailErrors);
    return;
  }
  const stream = streamCreator.create(tailOptions.filePath);
  streamAction(stream, tailOptions.lineNum, onTailComplete);
};

module.exports = {
  getTailLines,
  onTailOptions,
  handleError,
  streamAction
};
