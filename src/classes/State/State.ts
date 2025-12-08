type ListenerType<T> = (items: T[]) => void;

export abstract class State<T> {
  protected listeners: ListenerType<T>[] = [];

  addListener(listener: ListenerType<T>) {
    this.listeners.push(listener);
  }
}
