const getFileContent = function(fileOperations, path) {
  if (fileOperations.exist(path)) {
    return fileOperations.read(path, fileOperations.encoding);
  }
  return null;
};

const getTailLines = function(content, lineNum) {
  const lastNNumberOfLines = content.slice(-lineNum);
  return lastNNumberOfLines;
};

const operateTail = function(option, path, tailResult, fs) {
  const content = getFileContent(fs, path);
  if (!content) {
    tailResult.err = `tail: ${path}: No such file or directory`;
    return tailResult;
  }
  tailResult.content = getTailLines(content.split('\n'), option.slice(2));
  return tailResult;
};

module.exports = {
  getFileContent,
  getTailLines,
  operateTail
};
