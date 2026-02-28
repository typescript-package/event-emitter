/*
 * Public API Surface of event-emitter
 */

export {
  ListenersSetAdapter
} from './adapter';

export {
  // Abstract.
  EventEmitterBase,
  NamedEventEmitterBase,
  // Concrete.
  EventEmitter,
  NamedEventEmitter
} from './lib';

export type {
  EventListeners,
  ListenersFor
} from './type';
