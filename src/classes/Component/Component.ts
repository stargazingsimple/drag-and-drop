export abstract class Component<T extends HTMLElement> {
  rootElement = <HTMLDivElement>document.getElementById("app");
  templateElement!: HTMLTemplateElement;
  attachedElement!: T;

  protected constructor(
    templateId: string,
    attachedElementId: string,
    insertAtBeginning: boolean,
  ) {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateId)
    );

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );

    this.attachedElement = <T>importedNode.firstElementChild;
    this.attachedElement.id = attachedElementId;

    this.rootElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.attachedElement,
    );
  }

  abstract configure(): void;
}
