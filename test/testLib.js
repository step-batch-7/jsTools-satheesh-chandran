const assert = require('chai').assert;

const { getTailOptions } = require('../src/lib');

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
