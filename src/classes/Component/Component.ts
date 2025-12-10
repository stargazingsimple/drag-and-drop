export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  rootElement!: T;
  templateElement!: HTMLTemplateElement;
  attachedElement!: U;

  protected constructor(
    rootElementId: string,
    templateElementId: string,
    insertAtBeginning: boolean,
    attachedElementId?: string,
  ) {
    this.rootElement = <T>document.getElementById(rootElementId);
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateElementId)
    );

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );

    this.attachedElement = <U>importedNode.firstElementChild;

    if (attachedElementId) {
      this.attachedElement.id = attachedElementId;
    }

    this.rootElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.attachedElement,
    );
  }

  abstract configure(): void;
}
