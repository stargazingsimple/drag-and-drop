import { Component } from "../Component/Component.js";
import { ProjectType } from "../Project/Project.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  private project: ProjectType;

  get peopleText() {
    return this.project.people === 1
      ? "1 Person"
      : `${this.project.people} Persons`;
  }

  constructor(project: ProjectType, type: string) {
    super(`${type}-projects-list`, "single-project", true, project.id);
    this.project = project;
    this.configure();
  }

  configure() {
    const titleElement = <HTMLHeadingElement>(
      this.attachedElement.querySelector("h2")
    );
    titleElement.textContent = this.project.title;

    const peopleElement = <HTMLHeadingElement>(
      this.attachedElement.querySelector("h3")
    );
    peopleElement.textContent = `${this.peopleText} assigned`;

    const descriptionElement = <HTMLParagraphElement>(
      this.attachedElement.querySelector("p")
    );
    descriptionElement.textContent = this.project.description;
  }
}
