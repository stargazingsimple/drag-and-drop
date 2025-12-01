import { Autobind } from "./decorators/autobind.js";

class ProjectInput {
  rootElement!: HTMLDivElement;
  formElement!: HTMLFormElement;
  titleInputElement!: HTMLInputElement;
  descriptionTextAreaElement!: HTMLTextAreaElement;
  peopleInputElement!: HTMLInputElement;
  submitButtonElement!: HTMLButtonElement;

  constructor() {
    this.renderForm();
    this.getFormElements();
  }

  private renderForm() {
    this.rootElement = <HTMLDivElement>document.getElementById("app");
    const templateElement = <HTMLTemplateElement>(
      document.getElementById("project-input")
    );

    const importedNode = document.importNode(templateElement.content, true);

    this.formElement = <HTMLFormElement>importedNode.firstElementChild;
    this.formElement.id = "user-input";
    this.formElement.addEventListener("submit", this.submitHandler);

    this.rootElement.insertAdjacentElement("afterbegin", this.formElement);
  }

  private getFormElements() {
    this.titleInputElement = <HTMLInputElement>(
      this.formElement.querySelector("#title")
    );
    this.descriptionTextAreaElement = <HTMLTextAreaElement>(
      this.formElement.querySelector("#description")
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.formElement.querySelector("#people")
    );
    this.submitButtonElement = <HTMLButtonElement>(
      this.formElement.querySelector("button")
    );
  }

  @Autobind
  private submitHandler(e: SubmitEvent) {
    e.preventDefault();
    console.log(this.titleInputElement.value);
    console.log(this.descriptionTextAreaElement.value);
    console.log(this.peopleInputElement.value);
  }
}

new ProjectInput();
