// Class.
import { Listeners } from "@typescript-package/listeners";
// Type & Interface.
import type { ListenersAdapter, ListenerFunction } from "@typedly/listeners";
import type { EventListeners, ListenersFor } from "../type";
/**
 * @description A base abstraction class that implements a named event emitter pattern.
 * @export
 * @abstract
 * @class NamedEventEmitterBase
 * @template {Record<string, ListenerFunction<any[]>>} E Object mapping event names to their listener function types.
 * @template {ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], T, R>} [A=ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, any>] The adapter type for the listeners.
 * @template [T=A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], infer U, any> ? U : any] The type of the listeners underlying data, inferred from the adapter if possible.
 * @template {boolean} [R=A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, infer V> ? V : false] The async flag for the listeners, inferred from the adapter if possible.
 */
export abstract class NamedEventEmitterBase<
  E extends Record<string, ListenerFunction<any[]>>,
  A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], T, R> = ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, any>,
  T = A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], infer U, any> ? U : any,
  R extends boolean = A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, infer V> ? V : false
> {
  /**
   * @description The adapter class used to manage listeners.
   * @type {new (...listeners: E[keyof E][]) => A}
   */
  #adapterCtor: new (...listeners: E[keyof E][]) => A;

  /**
   * @description The async flag for the listeners.
   * @type {R}
   */
  #async: R;

  /**
   * @description The map of events to their listeners.
   * @type {Map<keyof E, Listeners<A, E[keyof E], Parameters<E[keyof E]>, T, R>>}
   */
  #events: Map<keyof E, Listeners<A, E[keyof E], Parameters<E[keyof E]>, T, R>> = new Map();

  /**
   * @description The set of names of paused events.
   * @type {Set<keyof E>}
   */
  #pausedEvents: Set<keyof E> = new Set();
  
  /**
   * Creates an instance of `NamedEventEmitterBase`.
   * @constructor
   * @param {R} async Whether the emitter listeners operate asynchronously.
   * @param {new (...listeners: E[keyof E][]) => A} adapter  The adapter class to manage listeners.
   * @param {?EventListeners<E>} [events] The initial events and their listeners.
   */
  constructor(
    async: R,
    adapter: new (...listeners: E[keyof E][]) => A,
    events?: EventListeners<E>
  ) {
    this.#adapterCtor = adapter;
    this.#async = async;
    for (const [event, listeners] of Object.entries(events ?? {})) {
      this.#events.set(event as keyof E, new Listeners(async, adapter));
      for (const listener of listeners!) {
        this.#events.get(event as keyof E)!.add(listener);
      }
    }
  }

  /**
   * @description Removes all listeners for a specific event type.
   * @public
   * @template {keyof E} Event The event key.
   * @param {Event} event The event name of key.
   * @returns {this} The current instance.
   */
  public clear<Event extends keyof E>(event: Event): this {
    return this.#events.get(event)?.clear(), this;
  }

  /**
   * @description Removes all listeners for all event types.
   * @public
   * @returns {this} The current instance.
   */
  public clearAll(): this {
    return this.#events.clear(), this;
  }

  /**
   * @description Gets the number of listeners for a specific event.
   * @public
   * @template {keyof E} Event The event key.
   * @param {Event} event The event name of key.
   * @returns {number} The number of listeners for the event.
   */
  public count<Event extends keyof E>(event: Event): number {
    return this.#events.get(event)?.size ?? 0;
  }

  /**
   * @description Emits an event, calling all listeners for that event type.
   * @public
   * @template {keyof E} Event The event key.
   * @param {Event} event The event name of key.
   * @param {...Parameters<E[Event]>} args The arguments for the event listeners.
   */
  public emit<Event extends keyof E>(event: Event, ...args: Parameters<E[Event]>): this {
    return !this.isPaused(event) && this.#events.get(event)?.forEach(listener => listener(...args)),
      this
  }

  /**
   * @description Gets all event names with registered listeners.
   * @public
   * @returns {(keyof E)[]} Array of event names.
   */
  public eventNames(): (keyof E)[] {
    return Array.from(this.#events.keys());
  }

  /**
   * @description Checks if the event is paused.
   * @public
   * @param {keyof E} event The event name of key.
   * @returns {boolean} Whether the event is paused.
   */
  public isPaused(event: keyof E): boolean {
    return this.#pausedEvents.has(event);
  }

  /**
   * @description Gets the listeners for a specific event type.
   * @public
   * @template {keyof E} Event The event key.
   * @param {Event} event The event name of key.
   * @returns {(ListenersFor<Event, E, T, R> | undefined)} The listeners for the event.
   */
  public listeners<Event extends keyof E>(event: Event): ListenersFor<Event, E, T, R> | undefined {
    return this.#events.get(event) as any;
  }

  /**
   * @description Emits an event asynchronously, calling all listeners for that event type.
   * @public
   * @async
   * @template {keyof E} Event The event key.
   * @param {Event} event The event name of key.
   * @param {...Parameters<E[Event]>} args The arguments for the event listeners.
   * @returns {this} The current instance.
   */
  public async emitAsync<Event extends keyof E>(event: Event, ...args: Parameters<E[Event]>): Promise<this> {
    const listeners = this.listeners(event);
    if (!listeners || this.isPaused(event)) {
      return this;
    }
    const snapshot = await listeners.snapshot();
    await Promise.all(snapshot.map(listener => Promise.resolve(listener(...args))));
    return this;
  }

  /**
   * @description Adds a listener for a specific event type.
   * @public
   * @template {keyof E} Event The event key.
   * @param {Event} event The event name of key.
   * @param {E[Event]} listener The listener function.
   * @returns {this} The current instance.
   */
  public on<Event extends keyof E>(event: Event, listener: E[Event]): this {
    return !this.#events.has(event) && this.#events.set(event, new Listeners(this.#async, this.#adapterCtor)),
      this.#events.get(event)!.add(listener),
      this;
  }

  /**
   * @description Adds a listener for a specific event type.
   * @public
   * @template {keyof E} Event The event key.
   * @param {Event} event The event name of key.
   * @param {E[Event]} listener The listener function.
   * @returns {this} The current instance.
   */
  public once<Event extends keyof E>(event: Event, listener: E[Event]): this {
    return !this.#events.has(event) && this.#events.set(event, new Listeners(this.#async, this.#adapterCtor)),
      this.#events.get(event)!.once(listener),
      this;
  }

  /**
   * @description Removes a listener for a specific event type.
   * @public
   * @template {keyof E} Event The event key.
   * @param {Event} event The event name of key.
   * @param {E[Event]} listener The listener function.
   * @returns {this} The current instance.
   */
  public off<Event extends keyof E>(event: Event, listener: E[Event]): this {
    return this.#events.get(event)?.delete(listener), this;
  }

  /**
   * @description Pauses the event, preventing it from being emitted.
   * @public
   * @template {keyof E} Event The event key.
   * @param {Event} event The event name of key.
   * @returns {this} The current instance.
   */
  public pause<Event extends keyof E>(event: Event): this {
    return this.#pausedEvents.add(event), this;
  }

  /**
   * @description Resumes the event if it was paused.
   * @public
   * @template {keyof E} Event The event key.
   * @param {Event} event The event name of key.
   * @returns {this} The current instance.
   */
  public resume<Event extends keyof E>(event: Event): this {
    return this.#pausedEvents.delete(event), this;
  }
}
