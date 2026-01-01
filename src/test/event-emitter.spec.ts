import { EventEmitter } from "../lib";

const eventEmitter = new EventEmitter(false);

eventEmitter.on((msg) => console.log(`Received: ${msg}`));
eventEmitter.emit('Hello, World!');
