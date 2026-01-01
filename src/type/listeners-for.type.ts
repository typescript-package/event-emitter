// Class.
import { Listeners } from "@typescript-package/listeners";
// Type & Interface.
import { ListenersAdapter, ListenerFunction } from "@typedly/listeners";
/**
 * @description
 * @export
 * @template {keyof E} Event 
 * @template {Record<string, ListenerFunction<any[]>>} E 
 * @template [T=any] 
 * @template {boolean} [R=false] 
 */
export type ListenersFor<
  Event extends keyof E,
  E extends Record<string, ListenerFunction<any[]>>,
  T = any, R extends boolean = false
> = Listeners<Parameters<E[Event]>, E[Event], T, R, ListenersAdapter<Parameters<E[Event]>, E[Event], T, R>>
