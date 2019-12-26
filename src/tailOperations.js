const fs = require('fs');

const getFileOperations = function() {
  return { read: fs.readFileSync, encoding: 'utf8', exist: fs.existsSync };
};

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

const actionForStdInput = function(option, getTailedLines) {
  let resultantLines = '==> stdin <==\n';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', data => {
    resultantLines = resultantLines + data;
  });
  process.stdin.on('end', () => {
    resultantLines = resultantLines.split('\n');
    const lineNum = option.slice(2);
    process.stdout.write(getTailedLines(resultantLines, lineNum).join('\n'));
  });
};

const operateTail = function(option, path, tailResult) {
  if (!path) {
    actionForStdInput(option, getTailLines);
    return tailResult;
  }
  const content = getFileContent(getFileOperations(), path);
  if (!content) {
    tailResult.err = `tail: ${path}: No such file or directory`;
    return tailResult;
  }
  tailResult.content = getTailLines(content.split('\n'), option.slice(2));
  return tailResult;
};

module.exports = {
  getFileOperations,
  getFileContent,
  getTailLines,
  operateTail
};
