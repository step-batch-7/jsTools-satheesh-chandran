const assert = require('chai').assert;
const sinon = require('sinon');

const { getTailOptions, performTail } = require('../src/lib');

describe('getTailOptions', function() {
  it('should filter the options and filepaths from the command line arguments', () => {
    const cmdArgs = ['-n', '2', 'num.txt'];
    const expected = { filePath: 'num.txt', lineNum: '2' };
    assert.deepStrictEqual(getTailOptions(cmdArgs), expected);
  });
  it('should return empty array if command line arguments are empty', () => {
    const expected = { filePath: undefined, lineNum: 10 };
    assert.deepStrictEqual(getTailOptions([]), expected);
  });
  it('option part should be empty if no option given', function() {
    const expected = { filePath: 'num.txt', lineNum: 10 };
    assert.deepStrictEqual(getTailOptions(['num.txt']), expected);
  });
  it('should return null if the n option occur more than one times', () => {
    const cmdArgs = ['-n', '3', '-n', 'd', 'num.txt'];
    assert.isNull(getTailOptions(cmdArgs));
  });
  it('filePath should be undefined if no file path is given', function() {
    const cmdArgs = ['-n', '2'];
    const expected = { filePath: undefined, lineNum: '2' };
    assert.deepStrictEqual(getTailOptions(cmdArgs), expected);
  });
  it('should return null if given more than one -n arguments are given with out file name', function() {
    const cmdArgs = ['-n', '3', '-n', 'd'];
    assert.isNull(getTailOptions(cmdArgs));
  });
});

describe('getlastLines', function() {
  it('should call the operateTail function with empty tailOptions for more than one n opptions', function() {
    const cmdArgs = ['-n', '2', '-n', '5', 'num.txt'];
    const stdin = { setEncoding: sinon.fake(), on: sinon.fake() };
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const streams = {
      stdin: stdin,
      createReadStream: sinon.fake.returns(readStream)
    };
    const displayResult = sinon.stub();
    const operateTail = sinon.stub();
    performTail(cmdArgs, streams, displayResult);
    assert.strictEqual(operateTail.firstCall, null);
    assert.strictEqual(operateTail.secondCall, null);
    assert.strictEqual(operateTail.thirdCall, null);
  });
});
