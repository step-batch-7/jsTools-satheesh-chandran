class StreamCreator {
  constructor(createStdin, createReadStream) {
    this.createStdin = createStdin;
    this.createReadStream = createReadStream;
  }

  create(path) {
    return path ? this.createReadStream(path) : this.createStdin();
  }
}

module.exports = { StreamCreator };
