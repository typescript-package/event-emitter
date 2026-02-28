import { ListenersSetAdapter } from "../adapter";
import { EventEmitter } from "../lib";

const eventEmitter = new EventEmitter({
  adapter: ListenersSetAdapter,
  async: false
}, [
  (msg: string) => console.log('Hello, World!'),
  (num: number) => console.log(`Number: ${num}`)
]);


describe('EventEmitter', () => {
  beforeEach(() => {
    eventEmitter.on((msg: string) => console.log(`Received: ${msg}`));
  })
  it('should emit events to listeners', () => {
    eventEmitter.emit('Hello, World!');
  });
});


describe('EventEmitter', () => {
  let eventEmitter: EventEmitter<any>;
  let handler1: any;
  let handler2: any;

  beforeEach(() => {
    // Create new spies (reset for every test)
    handler1 = vi.fn();
    handler2 = vi.fn();
    
    // Fresh emitter for each test!
    eventEmitter = new EventEmitter({
      adapter: ListenersSetAdapter,
      async: false
    }, [handler1, handler2]);
  });

  it('should add listeners on initialization', () => {
    eventEmitter.clear();
    expect(eventEmitter.count()).toBe(0); // Clear should remove initial listeners

    // Add listeners again for this test
    eventEmitter.on(handler1);
    eventEmitter.on(handler2);

    expect(eventEmitter.count()).toBe(2);
  });

  it('should add listeners at runtime', () => {
    const runtimeSpy = vi.fn();
    eventEmitter.on(runtimeSpy);
    expect(eventEmitter.count()).toBe(3); // Two initial + one runtime
  });

  it('should remove listeners', () => {
    eventEmitter.off(handler2);
    expect(eventEmitter.count()).toBe(1); // One listener removed
  });

  it('should check if emitter is paused', () => {
    expect(eventEmitter.isPaused()).toBe(false);
    eventEmitter.pause();
    expect(eventEmitter.isPaused()).toBe(true);
    eventEmitter.resume();
    expect(eventEmitter.isPaused()).toBe(false);
  });

  it('should clear all listeners', () => {
    eventEmitter.clear();
    expect(eventEmitter.count()).toBe(0);
  });

  it('should emit events to listeners', () => {
    const message = 'Hello, World!';
    eventEmitter.emit(message);

    expect(handler1).toHaveBeenCalledWith(message);
    expect(handler2).toHaveBeenCalledWith(message);
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  it('should emit listener once', () => {
    const onceHandler = vi.fn();
    eventEmitter.once(onceHandler);

    eventEmitter.emit('ping');
    eventEmitter.emit('ping');

    expect(onceHandler).toHaveBeenCalledWith('ping');
    expect(onceHandler).toHaveBeenCalledTimes(1);
  });

  it('should resume and emit events', () => {
    eventEmitter.pause();
    eventEmitter.emit('Test');
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
    eventEmitter.resume();
    const message = 'Resumed!';
    eventEmitter.emit(message);

    expect(handler1).toHaveBeenCalledWith(message);
    expect(handler2).toHaveBeenCalledWith(message);
  });

  it('should not emit events when paused', () => {
    eventEmitter.pause();
    eventEmitter.emit('Test');
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });

  it('should emit events to listeners', () => {
    const message = 'Hello, World!';
    eventEmitter.emit(message);

    expect(handler1).toHaveBeenCalledWith(message);
    expect(handler2).toHaveBeenCalledWith(message);
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  it('should allow new listeners to be added at runtime', () => {
    const runtimeSpy = vi.fn();
    eventEmitter.on(runtimeSpy);

    eventEmitter.emit('ping');
    expect(runtimeSpy).toHaveBeenCalledWith('ping');
  });

  it('should not call removed listeners', () => {
    eventEmitter.off(handler2);
    eventEmitter.emit('X');
    expect(handler2).not.toHaveBeenCalled();
    expect(handler1).toHaveBeenCalledWith('X');
  });
});