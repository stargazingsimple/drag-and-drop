import { Autobind } from "./decorators/autobind.js";
import { Validate } from "./utils/validation.js";

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

  private getFormValues(): [string, string, number] | void {
    const titleValue = this.titleInputElement.value;
    const descriptionValue = this.descriptionTextAreaElement.value;
    const peopleValue = +this.peopleInputElement.value;

    const formFieldsConfigs = [
      {
        value: titleValue,
        required: true,
        minLength: 2,
        maxLength: 14,
      },
      {
        value: descriptionValue,
        required: true,
        minLength: 2,
        maxLength: 14,
      },
      {
        value: peopleValue,
        required: true,
        minValue: 2,
        maxValue: 14,
      },
    ];

    if (
      formFieldsConfigs.every((fieldConfig) =>
        new Validate(fieldConfig).isValid(),
      )
    ) {
      return [titleValue, descriptionValue, peopleValue];
    } else {
      alert("Invalid input value!");
    }
  }

  private resetForm() {
    this.titleInputElement.value = "";
    this.descriptionTextAreaElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(e: SubmitEvent) {
    e.preventDefault();
    const formValues = this.getFormValues();
    if (Array.isArray(formValues)) {
      const [titleInputValue, descriptionInputValue, peopleInputValue] =
        formValues;
      console.log({
        title: titleInputValue,
        description: descriptionInputValue,
        people: peopleInputValue,
      });
      this.resetForm();
    }
  }
}

new ProjectInput();
