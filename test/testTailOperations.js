const assert = require('chai').assert;

const {
  getTailLines,
  operateTail,
  getFileContent
} = require('../src/tailOperations');

describe('getFileContent', function() {
  it('should return the file content if called with an existing path', function() {
    const fileOperations = {
      read: () => 'hello',
      encoding: 'utf8',
      exist: () => true
    };

    const expected = 'hello';
    const actual = getFileContent(fileOperations, './test/testFile');
    assert.deepStrictEqual(actual, expected);
  });
  it('should return empty string if called with a non existing path', function() {
    const fileOperations = {
      read: () => '',
      encoding: 'utf8',
      exist: () => false
    };
    const actual = getFileContent(fileOperations, './test/testFile');
    assert.equal(actual, '');
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
    const fileOperations = {
      read: () => '0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10',
      encoding: 'utf8',
      exist: () => true
    };
    const expected = {
      err: '',
      content: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    };

    assert.deepStrictEqual(
      operateTail('10', 'num.txt', fileOperations),
      expected
    );
  });
  it('the tail result should contain a desired error string', function() {
    const fileOperations = {
      read: () => null,
      encoding: 'utf8',
      exist: () => false
    };
    const expected = {
      err: 'tail: num.txt: No such file or directory',
      content: ['']
    };

    assert.deepStrictEqual(
      operateTail('10', 'num.txt', fileOperations),
      expected
    );
  });
  it('should return an off set error message if the line number is not valid', function() {
    const fileOperations = {
      read: () => '0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10',
      encoding: 'utf8',
      exist: () => true
    };
    const expected = {
      err: 'tail: illegal offset -- a',
      content: []
    };

    assert.deepStrictEqual(
      operateTail('a', 'num.txt', fileOperations),
      expected
    );
  });
});
