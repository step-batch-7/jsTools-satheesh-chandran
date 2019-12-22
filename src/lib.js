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

/////////////////////////////////////////////////

const isNumOk = function(num) {
  return Number.isInteger(Math.abs(num)) && Math.abs(num) % 1 == 0;
};

const validateLineNum = function(cmdArgs, i) {
  if (isNumOk(+cmdArgs[i].slice(2)) && +cmdArgs[i].length > 2) {
    return cmdArgs[i];
  }
};

const filterOptions = function(cmdArgs) {
  const options = [];

  for (let i = 0; i < cmdArgs.length; i++) {
    if (['-q', '-r'].includes(cmdArgs[i])) {
      options.push(cmdArgs[i]);
    }
    if (cmdArgs[i].slice(0, 2) == '-n') {
      options.push(validateLineNum(cmdArgs, i));
    }
  }
  return options;
};

/////////////////////////////////////////////////

const getIndexOfFirstPath = function(cmdArgs, options) {
  for (let i = 0; i < options.length; i++) {
    if (options[i] != cmdArgs[i]) return i;
  }
  return NaN;
};

const doTail = function(cmdArgs) {
  let options = filterOptions(cmdArgs);
  let paths;
  const firstPathIndex = getIndexOfFirstPath(cmdArgs, options);
  if (firstPathIndex) {
    options = options.slice(0, firstPathIndex);
    paths = cmdArgs.slice(firstPathIndex);
  } else {
    options = options.slice(firstPathIndex);
  }
  return;
};

module.exports = {
  doTail,
  getFileOperations,
  getFileContent,
  filterOptions,
  getIndexOfFirstPath
};
