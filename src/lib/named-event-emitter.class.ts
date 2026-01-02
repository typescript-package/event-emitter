// Abstract.
import { NamedEventEmitterBase } from "./named-event-emitter.base";
// Class.
import { ListenersSetAdapter } from "../adapter";
// Type & Interface.
import { ListenersAdapter, ListenerFunction } from "@typedly/listeners";
/**
 * @description A concrete class that implements a named event emitter pattern.
 * @export
 * @class NamedEventEmitter
 * @template {Record<string, ListenerFunction<any[]>>} E Object mapping event names to their listener function types.
 * @template {boolean} [R=false] The `boolean` type of the async flag for the listeners.
 * @template {ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, R>} [A=R extends false ?  ListenersSetAdapter<E[keyof E]> : any] 
 * @extends {NamedEventEmitterBase<E, any, R, A>}
 */
export class NamedEventEmitter<
  E extends Record<string, ListenerFunction<any[]>>,
  T = any,
  R extends boolean = false,
  A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], T, R> = R extends false ?  ListenersSetAdapter<E[keyof E]> : any
> extends NamedEventEmitterBase<E, T, R, A> {
  /**
   * Creates an instance of `NamedEventEmitter`.
   * @constructor
   * @param {R} async Whether the emitter listeners operate asynchronously.
   * @param {?Partial<{ [K in keyof E]: E[K][] }>} [events] The initial listeners.
   * @param {new (...listeners: E[keyof E][]) => A} [adapter=ListenersSetAdapter as any] The adapter class to manage listeners.
   */
  constructor(
    {adapter, async, value}: {adapter?: new (...listeners: E[keyof E][]) => A, async?: R, value?: T},
    events?: Partial<{ [K in keyof E]: E[K][] }>,
  ) {
    super({async}, adapter ?? ListenersSetAdapter as any, events);
  }
}
