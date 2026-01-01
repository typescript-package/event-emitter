import { NamedEventEmitter } from "../lib";

const eventEmitter = new NamedEventEmitter(false, {
  'event1': [(msg: string) => {
    console.log(`Listener 1: ${msg}`);
  }],
  'event2': [(num: number) => {
    console.log(`Event 2 received number: ${num}`);
  }]
});

eventEmitter.clear('event1')
eventEmitter.on('event1', (msg: string) => {
  console.log(`Listener 2: ${msg}`);
});

eventEmitter.on('event2', (num: number) => {
  console.log(`Event 2 received number: ${num}`);
});

eventEmitter.emit('event1', 'Hello, World!');
eventEmitter.listeners('event1')?.forEach(listener => {
  listener('Hello, World!');
});
