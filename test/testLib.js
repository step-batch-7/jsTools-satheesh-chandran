const assert = require('chai').assert;

const { getTailOptions, getLastLines } = require('../src/lib');

describe('getTailOptions', function() {
  it('should filter the options and filepaths from the command line arguments', function() {
    const cmdArgs = ['-n', '2', 'num.txt'];
    const expected = { filePath: 'num.txt', lineNum: '2' };
    assert.deepStrictEqual(getTailOptions(cmdArgs), expected);
  });
  it('should return empty array if command line arguments are empty', function() {
    const expected = { filePath: undefined, lineNum: 10 };
    assert.deepStrictEqual(getTailOptions([]), expected);
  });
  it('option part should be empty if no option given', function() {
    const expected = { filePath: 'num.txt', lineNum: 10 };
    assert.deepStrictEqual(getTailOptions(['num.txt']), expected);
  });
  it('should return null if the n option occur more than one times', function() {
    const cmdArgs = ['-n', '3', '-n', 'd', 'num.txt'];
    assert.isNull(getTailOptions(cmdArgs));
  });
});

describe('getLastLines', function() {
  it('should give an offset error message if the given line number is not valid', function() {
    const fileSystem = {
      read: () => '',
      encoding: 'utf8',
      exist: () => false
    };
    const cmdArgs = ['-n', 'a', 'num.txt'];
    const expected = { err: 'tail: illegal offset -- a', content: [] };
    assert.deepStrictEqual(getLastLines(cmdArgs, fileSystem), expected);
  });
  it('should return the last given number of lines of content of the given file', function() {
    const fileSystem = {
      read: () => '0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10',
      encoding: 'utf8',
      exist: () => true
    };
    const cmdArgs = ['-n', '10', 'num.text'];
    const expected = {
      err: '',
      content: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    };
    assert.deepStrictEqual(getLastLines(cmdArgs, fileSystem), expected);
  });
  it('should give the last 10 lines of the given file if no line number is given', function() {
    const fileSystem = {
      read: () => '0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10',
      encoding: 'utf8',
      exist: () => true
    };
    const cmdArgs = ['num.text'];
    const expected = {
      err: '',
      content: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    };
    assert.deepStrictEqual(getLastLines(cmdArgs, fileSystem), expected);
  });
  it('the tail result should contain a desired error string of file does not exist', function() {
    const fileSystem = {
      read: () => null,
      encoding: 'utf8',
      exist: () => false
    };
    const cmdArgs = ['num.txt'];
    const expected = {
      err: 'tail: num.txt: No such file or directory',
      content: ['']
    };
    assert.deepStrictEqual(getLastLines(cmdArgs, fileSystem), expected);
  });
  it('should return a usage message if the n option occur more than one times', function() {
    const fileSystem = {
      read: () => null,
      encoding: 'utf8',
      exist: () => false
    };
    const cmdArgs = ['-n', '3', '-n', '4', 'num.txt'];
    const expected = {
      err: 'usage: tail [-n #] [file ...]',
      content: ['']
    };
    assert.deepStrictEqual(getLastLines(cmdArgs, fileSystem), expected);
  });
});
