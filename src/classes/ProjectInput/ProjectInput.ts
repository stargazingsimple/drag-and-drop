import { Autobind } from "../../decorators/autobind.js";
import { Validate } from "../../utils/validation.js";
import { Component } from "../Component/Component.js";
import { store } from "../ProjectState/ProjectState.js";

export class ProjectInput extends Component<HTMLFormElement> {
  titleInputElement!: HTMLInputElement;
  descriptionTextAreaElement!: HTMLTextAreaElement;
  peopleInputElement!: HTMLInputElement;
  submitButtonElement!: HTMLButtonElement;

  constructor() {
    super("project-input", "user-input", true);
    this.getFormElements();
    this.configure();
  }

  configure() {
    this.attachedElement.addEventListener("submit", this.submitHandler);
  }

  private getFormElements() {
    this.titleInputElement = <HTMLInputElement>(
      this.attachedElement.querySelector("#title")
    );
    this.descriptionTextAreaElement = <HTMLTextAreaElement>(
      this.attachedElement.querySelector("#description")
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.attachedElement.querySelector("#people")
    );
    this.submitButtonElement = <HTMLButtonElement>(
      this.attachedElement.querySelector("button")
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
      store.addProject({
        title: titleInputValue,
        description: descriptionInputValue,
        people: peopleInputValue,
      });
      this.resetForm();
    }
  }
}
