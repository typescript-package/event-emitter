// Abstract.
import { EventEmitterBase } from "./event-emitter.base";
// Class.
import { ListenersSetAdapter } from "../adapter";
// Type & Interface.
import { ListenersAdapter, ListenerFunction } from "@typedly/listeners";
/**
 * @description A concrete class for an event emitter pattern with replaceable listeners adapter and asynchronous capabilities.
 * @export
 * @class EventEmitter
 * @template {ListenerFunction<any[]>} L The listener function type.
 * @template {ListenersAdapter<Parameters<L>, L, T, any>} [A=ListenersAdapter<Parameters<L>, L, any, any>] The adapter type for the listeners.
 * @template [T=A extends ListenersAdapter<Parameters<L>, L, infer U, any> ? U : any] The type of the listeners underlying data, inferred from the adapter if possible.
 * @template {boolean} [R=false] The async flag for the listeners.
 * @extends {EventEmitterBase<L, T, R, A>}
 */
export class EventEmitter<
  L extends ListenerFunction<any[]>,
  A extends ListenersAdapter<Parameters<L>, L, T, any> = ListenersAdapter<Parameters<L>, L, any, any>,
  T = A extends ListenersAdapter<Parameters<L>, L, infer U, any> ? U : any,
  R extends boolean = false,
> extends EventEmitterBase<L, T, R, A> {
  /**
   * Creates an instance of `EventEmitter`.
   * @constructor
   * @param {{adapter?: new (...listeners: L[]) => A, async?: R}} param0 The options for the event emitter.
   * @param {new (...listeners: L[]) => A} param0.adapter The adapter class to manage listeners.
   * @param {R} param0.async Whether the emitter listeners operate asynchronously.
   * @param {?(L | L[])} [listeners] The initial listeners.
   */
  constructor(
    {adapter, async}: {adapter?: new (...listeners: L[]) => A, async?: R},
    listeners?: L | L[],
  ) {
    super(async ?? false as R, adapter ?? ListenersSetAdapter as any, listeners);
  }
}
