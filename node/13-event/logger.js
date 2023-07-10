const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(callback) {
    // 이미 emitter를 상속받아서 emit메소드를 가지고 있기 때문에 필
    // emitter.emit('log','started...'); 여기서 emitter를 생략가능 바로사용
    this.emit('log', 'started...');
    callback();
    this.emit('log', 'end...');
  }
}

module.exports.Logger = Logger;
