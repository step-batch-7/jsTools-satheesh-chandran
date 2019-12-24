const assert = require('chai').assert;
const { getIndexOfPath, concatOption } = require('../src/lib');

describe('getIndexOfPath', function() {
  it('should return the index of the path', function() {
    assert.equal(getIndexOfPath(['-n', '2', 'num.txt']), 2);
    assert.equal(getIndexOfPath(['-n2', 'num.txt']), 1);
  });
  it('should return length of the cmdArgs if no file path found', function() {
    assert.equal(getIndexOfPath(['-n2']), 1);
  });
});

describe('concatOption', function() {
  it('should return the concatenated option', function() {
    const options = ['-n', '2'];
    assert.deepStrictEqual(concatOption(options, '-n', 0), '-n2');
  });
  it('should return the same array if option already concatenated', function() {
    assert.deepStrictEqual(concatOption(['-n2'], '-n2', 0), '-n2');
  });
});
