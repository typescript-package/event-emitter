import { ListenerFunction } from "@typedly/listeners";
import { SetAdapter } from "@typescript-package/collection-adapter";

export class ListenersSetAdapter<L extends ListenerFunction<any[]>> extends SetAdapter<L> {
  public override version: string = '1.0.0';
  public once(...listeners: L[]): this {
    listeners.forEach(listener => {
      if (this.has(listener)) {
        throw new Error('Listener already exists in the collection.');
      }

      const onceListener = (...args: any[]) => (
        this.delete(onceListener as L),
        listener(...args)
      );

      this.add(onceListener as L)

    });
    return this;
  }

  public snapshot(): L[] {
    return Array.from(this.value);
  }
}