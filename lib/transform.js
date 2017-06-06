const Transform = require('stream').Transform;
const MAP = {
  'Barret': '靖',
  'Lee': '李'
};
  
class Translate extends Transform {
  constructor(dataSource, options) {
    super(options);
  }
  _transform(buf, enc, next) {
    const key = buf.toString();
    const data = MAP[key];
    this.push(data);
    next();
  }
}

var transform = new Translate();
transform.on('data', data => console.log(data.toString()));
transform.write('Lee');
transform.write('Barret');
transform.end();