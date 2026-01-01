// Abstract.
import { EventEmitterBase } from "./event-emitter.base";
// Class.
import { ListenersSetAdapter } from "../adapter";
// Type & Interface.
import { ListenersAdapter, ListenerFunction } from "@typedly/listeners";
/**
 * @description A class that implements an event emitter pattern.
 * @export
 * @class EventEmitter
 * @template {ListenerFunction<any[]>} E The object type of events.
 * @template {boolean} [R=false] The async flag for the listeners.
 * @template {ListenersAdapter<Parameters<E>, E, any, R >} [A=R extends false ? ListenersSetAdapter<E> : any] The adapter type for the listeners.
 * @extends {EventEmitterBase<E, any, R, A>}Base class abstracting common event emitter functionality.
 */
export class EventEmitter<
  E extends ListenerFunction<any[]>,
  R extends boolean = false,
  A extends ListenersAdapter<Parameters<E>, E, any, R > = R extends false ? ListenersSetAdapter<E> : any
> extends EventEmitterBase<E, any, R, A> {
  /**
   * Creates an instance of `EventEmitter`.
   * @constructor
   * @param {R} async Whether the emitter listeners operate asynchronously.
   * @param {?(E | E[])} [events] The initial listeners.
   * @param {new (...listeners: E[]) => A} [adapter=ListenersSetAdapter as any] The adapter class to manage listeners.
   */
  constructor(
    async: R,
    events?: E | E[],
    adapter: new (...listeners: E[]) => A = ListenersSetAdapter as any,
  ) {
    super(async, adapter, events);
  }
}
