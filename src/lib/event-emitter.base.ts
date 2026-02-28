// Class.
import { Listeners } from "@typescript-package/listeners";
// Type & Interface.
import type { ListenersAdapter, ListenerFunction } from "@typedly/listeners";
/**
 * @description The base abstraction class for an event emitter pattern.
 * @export
 * @abstract
 * @class EventEmitterBase
 * @template {ListenerFunction<any[]>} L The listener function type.
 * @template [T=any] The type of the listeners underlying data.
 * @template {boolean} [R=false] The async flag for the listeners.
 * @template {ListenersAdapter<Parameters<L>, L, T, R>} [A=ListenersAdapter<Parameters<L>, L, T, R>] The adapter type for the listeners.
 */
export abstract class EventEmitterBase<
  L extends ListenerFunction<any[]>,
  T = any,
  R extends boolean = false,
  A extends ListenersAdapter<Parameters<L>, L, T, R> = ListenersAdapter<Parameters<L>, L, T, R>
> {
  /**
   * @description Gets the async flag for the listeners.
   * @public
   * @readonly
   * @type {R}
   */
  public get async(): R {
    return this.#listeners.async;
  }

  /**
   * @description Gets the listeners for a specific event type.
   * @public
   * @readonly
   * @type {Listeners<A, L, Parameters<L>, T, R>} The listeners for the event.
   */
  public get listeners(): Listeners<A, L, Parameters<L>, T, R> {
    return this.#listeners;
  }

  /**
   * @description Gets the adapter constructor.
   * @protected
   * @returns {new (...listeners: {}) => A} The adapter constructor.
   */
  protected adapterCtor() {
    return this.#adapterCtor;
  }

  /**
   * @description The adapter class used to manage listeners.
   * @type {new (...listeners: L[]) => A}
   */
  #adapterCtor: new (...listeners: L[]) => A;

  /**
   * @description The map of events to their listeners.
   * @type {Listeners<A, L, Parameters<L>, T, R>}
   */
  #listeners: Listeners<A, L, Parameters<L>, T, R>;

  /**
   * @description The paused state of the event emitter.
   * @type {boolean}
   */
  #paused: boolean = false;

  /**
   * Creates an instance of `EventEmitterBase`.
   * @constructor
   * @param {R} async Whether the emitter listeners operate asynchronously.
   * @param {new (...listeners: L[]) => A} adapter The adapter class to manage listeners.
   * @param {?(L | L[])} [listeners] The initial listeners.
   */
  constructor(
    async: R,
    adapter: new (...listeners: L[]) => A,
    listeners?: L | L[]
  ) {
    this.#listeners = new Listeners(
      async,
      adapter,
      ...(Array.isArray(listeners) ? listeners : listeners ? [listeners] : [])
    );
    this.#adapterCtor = adapter;
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
   * @param {...Parameters<L>} args The arguments for the event listeners.
   */
  public emit(...args: Parameters<L>): this {
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
   * @description Emits an event asynchronously, calling all listeners for that event type.
   * @public
   * @async
   * @param {...Parameters<L>} args The arguments for the event listeners.
   * @returns {this} The current instance.
   */
  public async emitAsync(...args: Parameters<L>): Promise<this> {
    const listeners = this.listeners;
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
   * @param {L} listener The listener function.
   * @returns {this} The current instance.
   */
  public on(listener: L): this {
    return this.#listeners.add(listener),
      this;
  }

  /**
   * @description Adds a one-time listener for event.
   * @public
   * @param {L} listener The listener function.
   * @returns {this} The current instance.
   */
  public once(listener: L): this {
    return this.#listeners.once(listener),
      this;
  }

  /**
   * @description Removes a listener for event.
   * @public
   * @param {L} listener The listener function.
   * @returns {this} The current instance.
   */
  public off(listener: L): this {
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
