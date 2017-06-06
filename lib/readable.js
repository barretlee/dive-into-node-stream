const Readable = require('stream').Readable;

class MyReadable extends Readable {
  constructor(dataSource, options) {
    super(options);
    this.dataSource = dataSource;
    this.on('drain', () => {
      console.log('drain');
    });
  }
  _read() {
    const data = this.dataSource.makeData();
    this.push(data);
  }
}

const dataSource = {
  data: new Array(1E6).fill('-'),
  makeData() {
    if (!dataSource.data.length) return null;
    return dataSource.data.pop();
  }
};

const myReadable = new MyReadable(dataSource);
myReadable.setEncoding('utf8');

let once = false;
myReadable.on('readable', () => {
  console.log(myReadable._readableState.buffer.length);
  if (!once) {
    once = true;
    console.log(myReadable.read());
  }
});
// myReadable.on('data', (chunk) => {
//   console.log(chunk);
// });


// let once = false;
// myReadable.on('data', (chunk) => {
//   console.log(myReadable._readableState.buffer.length);
//   if (once) return;
//   once = true;
//   console.log(myReadable.read());
// });
// myReadable.resume();