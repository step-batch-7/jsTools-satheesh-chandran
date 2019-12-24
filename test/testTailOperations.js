const assert = require('chai').assert;
const fs = require('fs');
const {
  getTailedLines,
  getFileContent,
  getFileOperations,
  operateTail
} = require('../src/tailOperations');

describe('getFileOperations', function() {
  it('should give the object of file operations', function() {
    const expected = {
      read: fs.readFileSync,
      encoding: 'utf8',
      exist: fs.existsSync
    };
    assert.deepStrictEqual(getFileOperations(), expected);
  });
});

describe('getFileContent', function() {
  it('should return the file content if called with an existing path', function() {
    const read = function(path, encoding) {
      assert.strictEqual('./test/testFile', path);
      assert.strictEqual('utf8', encoding);
      return 'hello';
    };
    const exist = function(path) {
      assert.strictEqual('./test/testFile', path);
      return true;
    };

    let fileOperations = {
      read: read,
      exist: exist,
      encoding: 'utf8'
    };

    let expected = 'hello';
    let actual = getFileContent(fileOperations, './test/testFile');
    assert.deepStrictEqual(actual, expected);
  });
  it('should return undefined if called with a non existing path', function() {
    const read = function(path, encoding) {
      assert.strictEqual('./test/testFile', path);
      assert.strictEqual('utf8', encoding);
      return;
    };

    const exist = function(path) {
      assert.strictEqual('./test/testFile', path);
      return false;
    };

    let fileOperations = {
      read: read,
      exist: exist,
      encoding: 'utf8'
    };

    let actual = getFileContent(fileOperations, './test/testFile');
    assert.isNull(actual);
  });
});

describe('getTailedLines', function() {
  it('should give the last n number of lines ', function() {
    const content = ['file name', 1, 2, 3, 4];
    const expected = [3, 4];
    assert.deepStrictEqual(getTailedLines(content, 2), expected);
  });
});
