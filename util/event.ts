document.addEventListener;

type EventMap = {
  选择完毕: any;
};

export class TypedEvent<M> extends EventTarget {
  addEventListener<K extends keyof EventMap>(type: K, listener: (this: Document, ev: EventMap[K]) => any) {
    super.addEventListener(type, listener as any);
  }
}
new EventTarget().addEventListener("ss", () => {});
