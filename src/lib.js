const doOptionalOperations = require('./tailOperations').doOptionalOperations;

const isNumOk = function(num) {
  return Number.isInteger(Math.abs(num)) && Math.abs(num) % 1 == 0;
};

const giveStandardNOption = function(cmdArgs, i) {
  if (cmdArgs[i].length == 2 && isNumOk(cmdArgs[i + 1])) {
    return [cmdArgs[i] + cmdArgs[i + 1], ++i];
  }
  if (cmdArgs[i].length == 2 && !isNumOk(cmdArgs[i + 1])) {
    return [undefined, ++i];
  }
  if (cmdArgs[i].length > 2 && isNumOk(cmdArgs[i].slice(2))) {
    return [cmdArgs[i], i];
  }
  return [undefined, i];
};

const fetchStandardOptions = function(cmdArgs) {
  const fetchingFuncs = {
    '-r': (cmdArgs, i) => [cmdArgs[i], i],
    '-q': (cmdArgs, i) => [cmdArgs[i], i],
    '-n': giveStandardNOption
  };
  const options = [];
  const countOfOptions = { '-n': 0, '-r': 0, '-q': 0 };
  for (let i = 0; i < cmdArgs.length; i++) {
    const action = fetchingFuncs[cmdArgs[i].slice(0, 2)];
    options.push(action(cmdArgs, i)[0]);
    ++countOfOptions[cmdArgs[i].slice(0, 2)];
    i = action(cmdArgs, i)[1];
  }
  if (Object.values(countOfOptions).every(count => count < 2)) return options;
  return [undefined];
};

const getIndexOfFirstPath = function(cmdArgs) {
  for (let i = 0; i < cmdArgs.length; i++) {
    const occuranceOfRQ = ['-r', '-q'].includes(cmdArgs[i]);
    if (cmdArgs[i] == '-n') i++;
    const nonOccuranceOfN =
      cmdArgs[i] != undefined &&
      cmdArgs[i].slice(0, 2) != '-n' &&
      cmdArgs[i - 1] != '-n';
    if (!occuranceOfRQ && nonOccuranceOfN) {
      return i;
    }
  }
  return cmdArgs.length;
};

const getPrioritizedOptions = function(options) {
  const prioritizedOptions = [];
  if (options.includes('-r')) prioritizedOptions.push('-r');
  if (options.includes('-q')) prioritizedOptions.push('-q');
  for (let i = 0; i < options.length; i++) {
    if (options[i].slice(0, 2) == '-n') prioritizedOptions.unshift(options[i]);
  }
  return prioritizedOptions;
};

/////////////////////////////////////////////////

const doTail = function(cmdArgs) {
  const indexOfFirstPath = getIndexOfFirstPath(cmdArgs);
  let filePaths = cmdArgs.slice(indexOfFirstPath);
  let options = cmdArgs.slice(0, indexOfFirstPath);
  if (options.length == 0 && filePaths.length < 2) {
    options = ['-n10', '-q'];
  }
  if (options.length == 0 && filePaths.length > 1) {
    options = ['-n10'];
  }
  const standardOptions = fetchStandardOptions(options);
  if (standardOptions.includes(undefined))
    return ['usage: tail [-r] [-q] [-n #] [file ...]'];
  const leadOptions = getPrioritizedOptions(standardOptions);
  return doOptionalOperations(leadOptions, filePaths);
};

module.exports = {
  doTail,
  fetchStandardOptions,
  getIndexOfFirstPath,
  getPrioritizedOptions
};
