import { ListenerFunction, ListenersAdapter } from "@typedly/listeners";
import { SetAdapter } from "@typescript-package/collection-adapter";

export class ListenersSetAdapter<
  L extends ListenerFunction<any[]>,
  T extends Set<L> = Set<L>
> extends SetAdapter<L, T>
  implements ListenersAdapter<Parameters<L>, L, T, false> {
  public override version: string = '1.0.0';
  public once(...listeners: L[]): this {
    listeners.forEach(listener => {
      if (super.has(listener)) {
        throw new Error('Listener already exists in the collection.');
      }

      const onceListener = (...args: any[]) => (
        super.delete(onceListener as L),
        listener(...args)
      );

      super.add(onceListener as L);

    });
    return this;
  }

  public snapshot(): L[] {
    return Array.from(this.value);
  }
}