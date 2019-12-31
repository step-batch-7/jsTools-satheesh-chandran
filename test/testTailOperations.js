const assert = require('chai').assert;

const { getTailLines } = require('../src/tailOperations');

describe('getTailLines', function() {
  it('should give the last n number of lines ', function() {
    const content = ['file name', 1, 2, 3, 4];
    const expected = [3, 4];
    assert.deepStrictEqual(getTailLines(content, 2), expected);
  });
});
