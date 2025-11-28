class ProjectInput {
  rootElement;
  templateElement;

  constructor() {
    this.rootElement = <HTMLDivElement>document.getElementById("app");
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-input")
    );

    this.render();
  }

  private render() {
    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );

    this.rootElement.appendChild(importedNode);
  }
}

new ProjectInput();
