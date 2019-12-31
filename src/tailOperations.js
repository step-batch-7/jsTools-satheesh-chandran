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
  return '';
};

const streamAction = function(stream, callback, lineNum) {
  stream.setEncoding('utf8');
  stream.on('data', data => {
    const lastNNumberOfLines = getTailLines(data.split('\n'), lineNum);
    callback({ err: '', content: lastNNumberOfLines });
  });
  stream.on('error', () => {
    const tailResult = { err: '', content: [''] };
    tailResult.err = pathErr(stream.path);
    callback(tailResult);
  });
};

const selectStream = function(path, createReadStream, stdin) {
  if (!path) {
    return stdin;
  }
  return createReadStream(path, 'utf8');
};

const operateTail = function(tailOptions, streams, displayResult) {
  const tailResult = { err: '', content: [''] };
  tailResult.err = handleError(tailOptions);
  if (tailResult.err) {
    return tailResult;
  }
  const stream = selectStream(
    tailOptions.filePath,
    streams.createReadStream,
    streams.stdin
  );
  streamAction(stream, displayResult, tailOptions.lineNum);
  return { err: '', content: [''] };
};

module.exports = {
  getTailLines,
  operateTail
};
