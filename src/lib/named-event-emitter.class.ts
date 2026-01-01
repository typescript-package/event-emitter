// Abstract.
import { NamedEventEmitterBase } from "./named-event-emitter.base";
// Class.
import { ListenersSetAdapter } from "../adapter";
// Type & Interface.
import { ListenersAdapter, ListenerFunction } from "@typedly/listeners";
/**
 * @description
 * @export
 * @class NamedEventEmitter
 * @template {Record<string, ListenerFunction<any[]>>} E 
 * @template {boolean} [R=false] 
 * @template {ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, R>} [A=R extends false ?  ListenersSetAdapter<E[keyof E]> : any] 
 * @extends {NamedEventEmitterBase<E, any, R, A>}
 */
export class NamedEventEmitter<
  E extends Record<string, ListenerFunction<any[]>>,
  R extends boolean = false,
  A extends ListenersAdapter<Parameters<E[keyof E]>, E[keyof E], any, R> = R extends false ?  ListenersSetAdapter<E[keyof E]> : any
> extends NamedEventEmitterBase<E, any, R, A> {
  /**
   * Creates an instance of `NamedEventEmitter`.
   * @constructor
   * @param {R} async Whether the emitter listeners operate asynchronously.
   * @param {?Partial<{ [K in keyof E]: E[K][] }>} [events] The initial listeners.
   * @param {new (...listeners: E[keyof E][]) => A} [adapter=ListenersSetAdapter as any] The adapter class to manage listeners.
   */
  constructor(
    async: R,
    events?: Partial<{ [K in keyof E]: E[K][] }>,
    adapter: new (...listeners: E[keyof E][]) => A = ListenersSetAdapter as any
  ) {
    super(async, adapter, events);
  }
}
