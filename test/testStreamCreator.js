const assert = require('chai').assert;
const sinon = require('sinon');
const StreamCreator = require('../src/streamCreator').StreamCreator;

describe('StreamSelector', () => {
  let createStdin, createReadStream, streamCreator;

  beforeEach(() => {
    createStdin = sinon.fake.returns({});
    createReadStream = sinon
      .stub()
      .withArgs('filePath')
      .returns({ fileName: 'filePath' });
    streamCreator = new StreamCreator(createStdin, createReadStream);
  });

  it('should create createReadStream in case of file ', () => {
    assert.deepStrictEqual(streamCreator.create('filePath'), {
      fileName: 'filePath'
    });
  });

  it('should create createStdin in the absence of file ', () => {
    assert.deepStrictEqual(streamCreator.create(), {});
  });
});
