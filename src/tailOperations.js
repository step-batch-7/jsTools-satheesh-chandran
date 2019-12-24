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

const getTailedLines = function(content, lineNum) {
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
    const lineNum = option[0].slice(2);
    process.stdout.write(getTailedLines(resultantLines, lineNum).join('\n'));
  });
};

const operateTail = function(option, path) {
  if (path.length == 0) {
    actionForStdInput(option, getTailedLines);
    return [];
  }
  const fileOperations = getFileOperations();
  const content = getFileContent(fileOperations, path[0]);
  if (content == null) return [`tail: ${path[0]}: No such file or directory`];
  resultantLines = getTailedLines(content.split('\n'), option[0].slice(2));
  return resultantLines;
};

module.exports = {
  getFileOperations,
  getFileContent,
  getTailedLines,
  operateTail
};
