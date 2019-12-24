const fs = require('fs');

const getFileOperations = function() {
  return { read: fs.readFileSync, encoding: 'utf8', exist: fs.existsSync };
};

const getFileContent = function(fileOperations, path) {
  const read = fileOperations.read;
  const encoding = fileOperations.encoding;
  const exist = fileOperations.exist;
  if (exist(path)) return read(path, encoding);
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

const getOperatedLines = function(options, content, optionalOperations) {
  let resultantLines = content;
  for (let i = 0; i < options.length; i++) {
    let action = optionalOperations[options[i].slice(0, 2)];
    resultantLines = action(resultantLines, options[i].slice(2));
  }
  return resultantLines;
};

const actionForOnePath = function(options, optionalOperations) {
  return function(path) {
    const fileOperations = getFileOperations();
    if (getFileContent(fileOperations, path) == undefined) {
      return [`tail: ${path}: No such file or directory`];
    }
    let resultantLines = getFileContent(fileOperations, path).split('\n');
    resultantLines.unshift(`==> ${path} <==`);
    return getOperatedLines(options, resultantLines, optionalOperations).join(
      ','
    );
  };
};

const actionForStdInput = function(options, optionalOperations) {
  let resultantLines = '==> stdin <==\n';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', data => {
    resultantLines = resultantLines + data;
  });
  process.stdin.on('end', () => {
    resultantLines = resultantLines.split('\n');
    process.stdout.write(
      getOperatedLines(options, resultantLines, optionalOperations).join('\n')
    );
  });
};

const doOptionalOperations = function(options, paths) {
  const optionalOperations = {
    '-n': getTailedLines,
    '-r': reverseLines,
    '-q': supressFilename
  };
  if (paths.length == 0) {
    actionForStdInput(options, optionalOperations);
  }
  const resultantLines = [];
  resultantLines.push(
    ...paths.map(actionForOnePath(options, optionalOperations))
  );
  return resultantLines.join(',').split(',');
};

module.exports = {
  doOptionalOperations,
  getTailedLines,
  reverseLines,
  supressFilename,
  getFileOperations,
  getFileContent
};
