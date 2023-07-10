// const EventEmitter = require('events');
// const emitter = new EventEmitter();
const events = require('events');
const emitter = new events.EventEmitter();
const callback1 = (args) => {
  console.log('first callback-', args);
};

//event 등록하기
emitter.on('ellie', callback1);

emitter.on('ellie', (args) => {
  console.log('seocnd callback-', args);
});

//이벤트 이름과 전달하고자 하는 데이터 명시하면 위 등록한 event가 실행된다.
emitter.emit('ellie', { message: 1 });
emitter.emit('ellie', { message: 2 });
emitter.removeListener('ellie', callback1);
emitter.emit('ellie', { message: 3 });

//TIL: 이벤트를 위와같이 직접 만들 수 있다.
//createReadStream을 확인해보면 ReadStream을 만들어주고,
//ReadStream은 stream.Readable을 상속하고
//Readable은 NodeJS.ReadableStream을 상속하고
//ReadableStream은 EventEmitter를 상속하기 때문에
