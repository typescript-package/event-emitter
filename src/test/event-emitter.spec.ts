import { ListenersSetAdapter } from "../adapter";
import { EventEmitter } from "../lib";

const eventEmitter = new EventEmitter({
  // adapter: ListenersSetAdapter,
  async: false
});

eventEmitter.on((msg) => console.log(`Received: ${msg}`));
eventEmitter.emit('Hello, World!');
