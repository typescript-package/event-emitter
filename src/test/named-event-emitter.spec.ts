import { ListenersSetAdapter } from "../adapter";
import { NamedEventEmitter } from "../lib";

const eventEmitter = new NamedEventEmitter({
  adapter: ListenersSetAdapter,
  async: false
}, {
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

describe('NamedEventEmitter', () => {
  let eventEmitter: NamedEventEmitter<any>;
  let handler1: any;
  let handler2: any;

  beforeEach(() => {
    // Create new spies (reset for every test)
    handler1 = vi.fn();
    handler2 = vi.fn();
    
    // Fresh emitter for each test!
    eventEmitter = new NamedEventEmitter({
      adapter: ListenersSetAdapter,
      async: false
    }, {
      'event1': [handler1],
      'event2': [handler2]
    });
  });

  it('should add listeners on initialization', () => {
    eventEmitter.clear('event1');
    expect(eventEmitter.count('event1')).toBe(0); // Clear should remove initial listeners

    // Add listeners again for this test
    eventEmitter.on('event1', handler1);
    eventEmitter.on('event2', handler2);

    expect(eventEmitter.count('event1')).toBe(1);
    expect(eventEmitter.count('event2')).toBe(1);
  });

  it('should add listeners at runtime', () => {
    const runtimeSpy = vi.fn();
    eventEmitter.on('event1', runtimeSpy);
    expect(eventEmitter.count('event1')).toBe(2); // One initial + one runtime
  });

  it('should remove listeners', () => {
    eventEmitter.off('event2', handler2);
    expect(eventEmitter.count('event2')).toBe(0); // One listener removed
  });

  it('should check if emitter is paused', () => {
    expect(eventEmitter.isPaused('event1')).toBe(false);
    eventEmitter.pause('event1');
    expect(eventEmitter.isPaused('event1')).toBe(true);
    eventEmitter.resume('event1');
    expect(eventEmitter.isPaused('event1')).toBe(false);
  });

  it('should clear all listeners', () => {
    eventEmitter.clear('event1');
    eventEmitter.clear('event2');
    expect(eventEmitter.count('event1')).toBe(0);
    expect(eventEmitter.count('event2')).toBe(0);
  });

  it('should emit events to listeners', () => {
    const message = 'Hello, World!';
    eventEmitter.emit('event1', message);

    expect(handler1).toHaveBeenCalledWith(message);
  });

  it('should emit listener once', () => {
    const onceHandler = vi.fn();
    eventEmitter.once('event1', onceHandler);

    eventEmitter.emit('event1', 'ping');
    eventEmitter.emit('event1', 'ping');

    expect(onceHandler).toHaveBeenCalledWith('ping');
    expect(onceHandler).toHaveBeenCalledTimes(1);
  });

  it('should resume and emit events', () => {
    eventEmitter.pause('event1');
    eventEmitter.emit('event1', 'Test');
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
    eventEmitter.resume('event1');
    const message = 'Resumed!';
    eventEmitter.emit('event1', message);

    expect(handler1).toHaveBeenCalledWith(message);
  });

  it('should not emit events when paused', () => {
    eventEmitter.pause('event1');
    eventEmitter.emit('event1', 'Test');
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });

  it('should emit events to listeners', () => {
    const message = 'Hello, World!';
    eventEmitter.emit('event1', message);

    expect(handler1).toHaveBeenCalledWith(message);
  });

  it('should allow new listeners to be added at runtime', () => {
    const runtimeSpy = vi.fn();
    eventEmitter.on('event1', runtimeSpy);

    eventEmitter.emit('event1', 'ping');
    expect(runtimeSpy).toHaveBeenCalledWith('ping');
  });

  it('should not call removed listeners', () => {
    eventEmitter.off('event2', handler2);
    eventEmitter.emit('event2', 'X');
    expect(handler2).not.toHaveBeenCalled();
  });
});