const assert = require('chai').assert;
const { filterOptionsAndFilePaths, concatNOption } = require('../src/lib');

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
