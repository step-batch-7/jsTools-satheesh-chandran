const assert = require('chai').assert;
const {
  filterOptionsAndFilePaths,
  concatNOption,
  getLastLines
} = require('../src/lib');

describe('concatNOption', function() {
  it('should return the concatenated option', function() {
    const options = ['-n', '2'];
    assert.deepStrictEqual(concatNOption(options), ['-n2']);
  });
  it('should return the same array if option already concatenated', function() {
    assert.deepStrictEqual(concatNOption(['-n2']), ['-n2']);
  });
});

describe('filterOptionsAndFilePaths ', function() {
  it('should filter the options and filepaths from the command line arguments', function() {
    const cmdArgs = ['-n', '2', 'num.txt'];
    const expected = [['-n2'], ['num.txt']];
    assert.deepStrictEqual(filterOptionsAndFilePaths(cmdArgs), expected);
  });
  it('should return empty array if command line argiments are empty', function() {
    assert.deepStrictEqual(filterOptionsAndFilePaths([]), [[], []]);
  });
  it('option part should be empty if no option given', function() {
    assert.deepStrictEqual(filterOptionsAndFilePaths(['num.txt']), [
      [],
      ['num.txt']
    ]);
  });
  it('path part should be empty if no path is given', function() {
    assert.deepStrictEqual(filterOptionsAndFilePaths(['-n2']), [['-n2'], []]);
  });
});

describe('getLastLines', function() {
  it('should give a usage message if the given line number is not valid', function() {
    const cmdArgs = ['-n', 'a', 'num.txt'];
    const expected = { err: 'usage: tail [-n #] [file ...]', content: [''] };
    assert.deepStrictEqual(getLastLines(cmdArgs, ''), expected);
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
});
