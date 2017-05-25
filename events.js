let events = require('events');

let eventEmitter = new events.EventEmitter();

let connectHandler = function connected(){
    console.log('connection done');

    eventEmitter.emit('data_send');
}

eventEmitter.on('connection',connectHandler);
eventEmitter.on('data_send',function(){
    console.log('data send ');
});

eventEmitter.emit('connection');