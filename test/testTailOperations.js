const assert = require('chai').assert;
const sinon = require('sinon');

const {
  getTailLines,
  onTailOptions,
  streamAction,
  selectStream
} = require('../src/tailOperations');

describe('getTailLines', function() {
  it('should give the last n number of lines ', () => {
    const content = ['file name', 1, 2, 3, 4];
    const expected = [3, 4];
    assert.deepStrictEqual(getTailLines(content, 2), expected);
  });
});

describe('onTailOptions', function() {
  it('should call the display function with usage error if the tail option is empty', function(done) {
    const handleError = sinon.fake.returns('usage: tail [-n #] [file ...]');
    const displayResult = (content, error) => {
      assert.deepStrictEqual(content, ['']);
      assert.strictEqual(error, handleError());
      done();
    };
    onTailOptions(null, null, displayResult);
  });
  it('should call the display function with offset error if the line number is invalid', function(done) {
    const handleError = sinon.fake.returns('tail: illegal offset -- a');
    const displayResult = (content, error) => {
      assert.deepStrictEqual(content, ['']);
      assert.strictEqual(error, handleError());
      done();
    };
    const tailOptions = { lineNum: 'a', filePath: 'num.txt' };
    onTailOptions(tailOptions, null, displayResult);
  });
  it('should call the streamAction function with stdin stream if path is a falsy value', function() {
    const tailOptions = { lineNum: '10', filePath: undefined };
    const stdin = { setEncoding: sinon.fake(), on: sinon.fake() };
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const streams = {
      stdin: stdin,
      createReadStream: sinon.fake.returns(readStream)
    };
    onTailOptions(tailOptions, streams, sinon.fake());
    assert.isTrue(stdin.setEncoding.calledWith('utf8'));
    assert.strictEqual(stdin.on.firstCall.args[0], 'data');
    assert.strictEqual(stdin.on.secondCall.args[0], 'end');
    assert.strictEqual(stdin.on.thirdCall.args[0], 'error');
    assert.isTrue(stdin.on.calledThrice);
  });
  it('should call the streamAction function with readStream if path is a true value', function() {
    const tailOptions = { lineNum: '10', filePath: 'num.txt' };
    const stdin = { setEncoding: sinon.fake(), on: sinon.fake() };
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const streams = {
      stdin: stdin,
      createReadStream: sinon.fake.returns(readStream)
    };
    onTailOptions(tailOptions, streams, sinon.fake());
    assert.isTrue(readStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(readStream.on.firstCall.args[0], 'data');
    assert.strictEqual(readStream.on.secondCall.args[0], 'end');
    assert.strictEqual(readStream.on.thirdCall.args[0], 'error');
    assert.isTrue(readStream.on.calledThrice);
  });
});

describe('selectStream', function() {
  it('should select the stdin stream if file path is undefined', function() {
    const streams = { stdin: 'stdin', createReadStream: () => 'readStream' };
    assert.deepStrictEqual(selectStream(undefined, streams), 'stdin');
  });
  it('should select the create read stream if path is a true value', function() {
    const streams = { stdin: 'stdin', createReadStream: () => 'readStream' };
    assert.deepStrictEqual(selectStream(1, streams), 'readStream');
  });
});

describe('streamAction', function() {
  it('should call the onTailComplete function with last number of lines for data event', function(done) {
    const stream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const callback = function(content, error) {
      assert.deepStrictEqual(content, ['9', '10']);
      assert.strictEqual(error, '');
      done();
    };
    streamAction(stream, 2, callback);
    assert(stream.setEncoding.calledWith('utf8'));
    assert.strictEqual(stream.on.firstCall.args[0], 'data');
    assert.strictEqual(stream.on.secondCall.args[0], 'end');
    assert.strictEqual(stream.on.thirdCall.args[0], 'error');
    stream.on.firstCall.args[1]('1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
    stream.on.secondCall.args[1]();
    assert.strictEqual(stream.on.callCount, 1);
  });

  it('should call the onTailComplete function with last number of lines for data event', function(done) {
    const stream = {
      setEncoding: sinon.fake(),
      on: sinon.fake(),
      path: 'num.txt'
    };
    const callback = function(content, error) {
      assert.deepStrictEqual(content, ['']);
      assert.strictEqual(error, 'tail: num.txt: No such file or directory');
      done();
    };
    streamAction(stream, 2, callback);
    assert(stream.setEncoding.calledWith('utf8'));
    assert.strictEqual(stream.on.firstCall.args[0], 'data');
    assert.strictEqual(stream.on.secondCall.args[0], 'end');
    assert.strictEqual(stream.on.thirdCall.args[0], 'error');
    stream.on.thirdCall.args[1]();
    assert.ok(stream.on.calledThrice);
  });
});
