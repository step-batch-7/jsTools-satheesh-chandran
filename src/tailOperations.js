const fs = require('fs');

const getFileOperations = function() {
  return { read: fs.readFileSync, encoding: 'utf8', exist: fs.existsSync };
};

const getFileContent = function(fileOperations, path) {
  const read = fileOperations.read;
  const encoding = fileOperations.encoding;
  const exist = fileOperations.exist;
  if (exist(path)) {
    return read(path, encoding);
  }
};

const getTailedLines = function(content, lineNum) {
  const headLine = content[0];
  const lastNNumberOfLines = content.slice(-lineNum);
  lastNNumberOfLines.unshift(headLine);
  return lastNNumberOfLines;
};

const reverseLines = function(content) {
  const headLine = content[0];
  const reversedLines = content.slice(1).reverse();
  reversedLines.unshift(headLine);
  return reversedLines;
};

const supressFilename = function(content) {
  const supressedContent = content.slice(1);
  return supressedContent;
};

const doOptionalOperations = function(options, paths) {
  const optionalOperations = {
    '-n': getTailedLines,
    '-r': reverseLines,
    '-q': supressFilename
  };
  return;
};

module.exports = {
  doOptionalOperations,
  getTailedLines,
  reverseLines,
  supressFilename,
  getFileOperations,
  getFileContent
};
