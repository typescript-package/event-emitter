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
 * @template {ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], T, R>} [A=ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, any>] The adapter type for the listeners.
 * @template [T=A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], infer U, any> ? U : any] The type of the listeners underlying data, inferred from the adapter if possible.
 * @template {boolean} [R=A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, infer V> ? V : false] The async flag for the listeners, inferred from the adapter if possible.
 * @extends {NamedEventEmitterBase<E, A, T, R>} The base class for the named event emitter.
 */
export class NamedEventEmitter<
  E extends Record<string, ListenerFunction<any[]>>,
  A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], T, R> = ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, any>,
  T = A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], infer U, any> ? U : any,
  R extends boolean = A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, infer V> ? V : false
> extends NamedEventEmitterBase<E, A, T, R> {
  /**
   * Creates an instance of `NamedEventEmitter`.
   * @constructor
   * @param {R} async Whether the emitter listeners operate asynchronously.
   * @param {?Partial<{ [K in keyof E]: E[K][] }>} [events] The initial listeners.
   * @param {new (...listeners: E[keyof E][]) => A} [adapter=ListenersSetAdapter as any] The adapter class to manage listeners.
   */
  constructor(
    {adapter, async}: {adapter?: new (...listeners: E[keyof E][]) => A, async?: R},
    events?: Partial<{ [K in keyof E]: E[K][] }>,
  ) {
    super(async ?? false as R, adapter ?? ListenersSetAdapter as any, events);
  }
}
