const Writable = require('stream').Writable;

class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }
  _write(chunk, encoding, done) {
    console.log(chunk.toString());
    done();
  }
}

const myWritable = new MyWritable();

for (let i = 0; i < 2; i++) {
  myWritable.write(String(i));
}
myWritable.write(new Array(10).fill('-').join(''));
myWritable.end('end');
myWritable.on('finish', () => {
  console.log('done');
});