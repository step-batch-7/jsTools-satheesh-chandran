const assert = require('chai').assert;
const {
  fetchStandardOptions,
  getIndexOfFirstPath,
  getPrioritizedOptions
} = require('../src/lib');

describe('fetchStandardOptions', function() {
  it('should return the copy of the inputs if it the input is a standard', function() {
    const cmdArgs = ['-q', '-r', '-n2'];
    const expected = ['-q', '-r', '-n2'];
    assert.deepStrictEqual(fetchStandardOptions(cmdArgs), expected);
  });
  it('should return the standard options even if n option and line number given with space', function() {
    const cmdArgs = ['-q', '-r', '-n', '2'];
    const expected = ['-q', '-r', '-n2'];
    assert.deepStrictEqual(fetchStandardOptions(cmdArgs), expected);
  });
  it('should the return value include undefined if the line number in appropriate', function() {
    const cmdArgs = ['-na'];
    assert.isUndefined(fetchStandardOptions(cmdArgs)[0]);
  });
  it('should the return include undefined if the line number is a decimal value', function() {
    const c = ['-n', '2.2'];
    assert.isUndefined(fetchStandardOptions(c)[0]);
  });
  it('should return value include undefined if same options repeated more than one time', function() {
    const cmdArgs = ['-q', '-r', '-n2', '-n3'];
    assert.deepStrictEqual(fetchStandardOptions(cmdArgs), [undefined]);
  });
});

describe('getIndexOfFirstPath', function() {
  it('should return the index of the first file path', function() {
    const cmdArgs = ['-q', '-r', '-n', '2', 'num.txt', '-r', '-n2'];
    assert.equal(getIndexOfFirstPath(cmdArgs), 4);
  });
  it('should return the index of the first path if number of lines given without space', function() {
    const cmdArgs = ['-q', '-r', '-n2', 'num.txt', '-r', '-n2'];
    assert.equal(getIndexOfFirstPath(cmdArgs), 3);
  });
  it('should return length of the array if no file path given', function() {
    const cmdArgs = ['-q', '-r', '-n2', '-r', '-n2'];
    assert.equal(getIndexOfFirstPath(cmdArgs), 5);
  });
  it('should return length of the array if the -n option is in complete', function() {
    const cmdArgs = ['-q', '-r', '-n'];
    assert.equal(getIndexOfFirstPath(cmdArgs), 3);
  });
  it('should return index of first file path even if number of lines are incorrect', function() {
    const cmdArgs = ['-q', '-r', '-na', 'num.txt'];
    assert.equal(getIndexOfFirstPath(cmdArgs), 3);
    const c = ['-q', '-r', '-n', 'a', 'num.txt'];
    assert.equal(getIndexOfFirstPath(c), 4);
  });
  it('should return the index of the first file path even if one option present twice before path', function() {
    const cmdArgs = ['-q', '-r', '-na', '-n', '2', 'num.txt'];
    assert.equal(getIndexOfFirstPath(cmdArgs), 5);
  });
});

describe('getPrioritizedOptions', function() {
  it('should return an array in a prioritized order', function() {
    const options = ['-n10', '-r', '-q'];
    const expected = ['-n10', '-r', '-q'];
    assert.deepStrictEqual(getPrioritizedOptions(options), expected);
    const a = ['-r', '-n10', '-q'];
    assert.deepStrictEqual(getPrioritizedOptions(a), expected);
    const b = ['-q', '-r', '-n10'];
    assert.deepStrictEqual(getPrioritizedOptions(b), expected);
  });
  it('should work if one of the primary option not present in the input', function() {
    const options = ['-q', '-n10'];
    const expected = ['-n10', '-q'];
    assert.deepStrictEqual(getPrioritizedOptions(options), expected);
  });
});
