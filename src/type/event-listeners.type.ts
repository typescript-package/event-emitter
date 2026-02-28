/**
 * @description A type representing a partial mapping of event names to their listener arrays.
 * @export
 * @template E 
 */
export type EventListeners<E> = Partial<{ [K in keyof E]: E[K][] | E[K] }>;