// Abstract.
import { EventEmitterBase } from "./event-emitter.base";
// Class.
import { ListenersSetAdapter } from "../adapter";
// Type & Interface.
import { ListenersAdapter, ListenerFunction } from "@typedly/listeners";
/**
 * @description A concrete class that implements an event emitter pattern.
 * @export
 * @class EventEmitter
 * @template {ListenerFunction<any[]>} E The object type of events.
 * @template [T=any] The type of the listeners underlying data.
 * @template {boolean} [R=false] The async flag for the listeners.
 * @template {ListenersAdapter<Parameters<E>, E, any, R >} [A=R extends false ? ListenersSetAdapter<E> : any] The adapter type for the listeners.
 * @extends {EventEmitterBase<E, any, R, A>}Base class abstracting common event emitter functionality.
 */
export class EventEmitter<
  E extends ListenerFunction<any[]>,
  T = any,
  R extends boolean = false,
  A extends ListenersAdapter<Parameters<E>, E, T, R > = R extends false ? ListenersSetAdapter<E> : any
> extends EventEmitterBase<E, T, R, A> {
  /**
   * Creates an instance of `EventEmitter`.
   * @constructor
   * @param {R} async 
   * @param {?(E | E[])} [events] 
   * @param {new (...listeners: E[]) => A} [adapter=ListenersSetAdapter as any] 
   */
  
  /**
   * Creates an instance of `EventEmitter`.
   * @constructor
   * @param {{adapter?: new (...listeners: E[]) => A, async?: R, value?: T}} param0 
   * @param {new (...listeners: {}) => A} param0.adapter The adapter class to manage listeners.
   * @param {R} param0.async Whether the emitter listeners operate asynchronously.
   * @param {T} param0.value The underlying data for the listeners for capture its type only.
   * @param {?(E | E[])} [events] The initial listeners.
   */
  constructor(
    {adapter, async, value}: {adapter?: new (...listeners: E[]) => A, async?: R, value?: T},
    events?: E | E[],
  ) {
    super({async, value}, adapter ?? ListenersSetAdapter as any, events);
  }
}
