// Class.
import { Listeners } from "@typescript-package/listeners";
// Type & Interface.
import { ListenersAdapter, ListenerFunction } from "@typedly/listeners";
/**
 * @description A type representing the listeners for a specific event in a named event emitter, utilizing a specified listeners adapter and supporting asynchronous capabilities.
 * @export
 * @template {keyof E} Event 
 * @template {Record<string, ListenerFunction<any[]>>} E 
 * @template [T=any] 
 * @template {boolean} [R=false] 
 */
export type ListenersFor<
  Event extends keyof E,
  E extends Record<string, ListenerFunction<any[]>>,
  T = any,
  R extends boolean = false,
  A extends ListenersAdapter<Parameters<E[Event]>, E[Event], T, R> = ListenersAdapter<Parameters<E[Event]>, E[Event], T, R>
> = Listeners<A, E[Event], Parameters<E[Event]>, T, R>
