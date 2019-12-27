const assert = require('chai').assert;
const {
  getTailLines,
  operateTail,
  getFileContent
} = require('../src/tailOperations');

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

describe('getTailLines', function() {
  it('should give the last n number of lines ', function() {
    const content = ['file name', 1, 2, 3, 4];
    const expected = [3, 4];
    assert.deepStrictEqual(getTailLines(content, 2), expected);
  });
});

describe('operateTail', function() {
  it('should give the last 10 lines of the content of the file given', function() {
    let fileOperations = {
      read: () => '0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10',
      encoding: 'utf8',
      exist: () => true
    };
    const tailResult = { err: '', content: [''] };
    const expected = {
      err: '',
      content: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    };

    assert.deepStrictEqual(
      operateTail('-n10', 'num.txt', tailResult, fileOperations),
      expected
    );
  });
  it('the tail result should contain a desired error string', function() {
    let fileOperations = {
      read: () => null,
      encoding: 'utf8',
      exist: () => false
    };
    const tailResult = { err: '', content: [''] };
    const expected = {
      err: 'tail: num.txt: No such file or directory',
      content: ['']
    };

    assert.deepStrictEqual(
      operateTail('-n10', 'num.txt', tailResult, fileOperations),
      expected
    );
  });
});
