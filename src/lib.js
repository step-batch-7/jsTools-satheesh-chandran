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
module.exports = { getFileOperations, getFileContent };
