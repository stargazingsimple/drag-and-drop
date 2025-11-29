class ProjectInput {
  rootElement!: HTMLDivElement;
  templateElement!: HTMLTemplateElement;

  constructor() {
    this.init();
    this.render();
  }

  private init() {
    this.rootElement = <HTMLDivElement>document.getElementById("app");
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-input")
    );
  }

  private render() {
    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );

    const formElement = <HTMLFormElement>importedNode.firstElementChild;
    formElement.id = "user-input";

    this.rootElement.insertAdjacentElement("afterbegin", formElement);
  }
}

new ProjectInput();
