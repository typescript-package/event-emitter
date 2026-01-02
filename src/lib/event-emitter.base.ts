// Class.
import { Listeners } from "@typescript-package/listeners";
// Type & Interface.
import { ListenersAdapter, ListenerFunction } from "@typedly/listeners";
/**
 * @description The base abstraction class for an event emitter pattern.
 * @export
 * @abstract
 * @class EventEmitterBase
 * @template {ListenerFunction<any[]>} E The listener function type.
 * @template [T=any] The type of the listeners underlying data.
 * @template {boolean} [R=false] The async flag for the listeners.
 * @template {ListenersAdapter<Parameters<E>, E, T, R>} [A=any] The adapter type for the listeners.
 */
export abstract class EventEmitterBase<
  E extends ListenerFunction<any[]>,
  T = any,
  R extends boolean = false,
  A extends ListenersAdapter<Parameters<E>, E, T, R> = any
> {
  /**
   * @description The adapter class used to manage listeners.
   * @type {new (...listeners: E[]) => A}
   */
  #adapter: new (...listeners: E[]) => A;

  /**
   * @description Indicates whether the emitter listeners operate asynchronously.
   * @type {R}
   */
  #async: R;

  /**
   * @description The map of events to their listeners.
   * @type {Listeners<Parameters<E>, E, T, R, A>}
   */
  #listeners: Listeners<Parameters<E>, E, T, R, A>;

  /**
   * @description The paused state of the event emitter.
   * @type {boolean}
   */
  #paused: boolean = false;

  /**
   * Creates an instance of `EventEmitterBase`.
   * @constructor
   * @param {{async?: R, value?: T}} param0 The object with configuration options.
   * @param {R} param0.async Whether the emitter listeners operate asynchronously.
   * @param {T} param0.value The underlying data for the listeners for capture its type only.
   * @param {new (...listeners: E[]) => A} adapter The adapter class to manage listeners.
   * @param {?(E | E[])} [events] The initial listeners.
   */
  constructor(
    {async, value}: {async?: R, value?: T},
    adapter: new (...listeners: E[]) => A,
    events?: E | E[]
  ) {
    this.#listeners = new Listeners(async ?? false, adapter, ...(Array.isArray(events) ? events : events ? [events] : []));
    this.#adapter = adapter;
    this.#async = async ?? false as R;
  }

  /**
   * @description Removes all listeners for a specific event type.
   * @public
   * @returns {this} The current instance.
   */
  public clear(): this {
    return this.#listeners?.clear(), this;
  }

  /**
   * @description Gets the number of listeners for a specific event.
   * @public
   * @returns {number} The number of listeners for the event.
   */
  public count(): number {
    return this.#listeners.size;
  }

  /**
   * @description Emits an event, calling all listeners for that event type.
   * @public
   * @param {...Parameters<E>} args The arguments for the event listeners.
   */
  public emit(...args: Parameters<E>): this {
    return !this.isPaused() && this.#listeners.forEach(listener => listener(...args)),
      this
  }

  /**
   * @description Checks if the event is paused.
   * @public
   * @returns {boolean} Whether the event is paused.
   */
  public isPaused(): boolean {
    return this.#paused === true;
  }

  /**
   * @description Gets the listeners for a specific event type.
   * @public
   * @returns {(ListenersFor<Event, E, T, R> | undefined)} The listeners for the event.
   */
  public listeners(): Listeners<Parameters<E>, E, T, R, A> {
    return this.#listeners;
  }

  /**
   * @description Emits an event asynchronously, calling all listeners for that event type.
   * @public
   * @async
   * @param {...Parameters<E>} args The arguments for the event listeners.
   * @returns {this} The current instance.
   */
  public async emitAsync(...args: Parameters<E>): Promise<this> {
    const listeners = this.listeners();
    if (!listeners || this.isPaused()) {
      return this;
    }
    const snapshot = await listeners.snapshot();
    await Promise.all(snapshot.map(listener => Promise.resolve(listener(...args))));
    return this;
  }

  /**
   * @description Adds a listener for event.
   * @public
   * @param {E} listener The listener function.
   * @returns {this} The current instance.
   */
  public on(listener: E): this {
    return this.#listeners.add(listener),
      this;
  }

  /**
   * @description Adds a one-time listener for event.
   * @public
   * @param {E} listener The listener function.
   * @returns {this} The current instance.
   */
  public once(listener: E): this {
    return this.#listeners.once(listener),
      this;
  }

  /**
   * @description Removes a listener for event.
   * @public
   * @param {E} listener The listener function.
   * @returns {this} The current instance.
   */
  public off(listener: E): this {
    return this.#listeners.delete(listener), this;
  }

  /**
   * @description Pauses the event, preventing it from being emitted.
   * @public
   * @returns {this} The current instance.
   */
  public pause(): this {
    return this.#paused = true, this;
  }

  /**
   * @description Resumes the event if it was paused.
   * @public
   * @returns {this} The current instance.
   */
  public resume(): this {
    return this.#paused = false, this;
  }
}
