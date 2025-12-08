import { ProjectStatus, ProjectType } from "../Project/Project.js";
import { Component } from "../Component/Component.js";
import { ProjectItem } from "../ProjectItem/ProjectItem.js";
import { store } from "../ProjectState/ProjectState.js";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: ProjectType[] = [];

  constructor(public type: ProjectStatus) {
    super("app", "project-list", false, `${type}-projects`);
    this.configure();
  }

  configure() {
    const listElement = <HTMLUListElement>(
      this.attachedElement.querySelector("ul")
    );
    listElement.id = `${this.type}-projects-list`;

    const listTitleElement = <HTMLHeadingElement>(
      this.attachedElement.querySelector("h2")
    );
    listTitleElement.textContent = `${this.type.toUpperCase()} PROJECTS`;

    store.addListener((projects: ProjectType[]) => {
      this.assignedProjects = projects.filter(({ status }) => {
        if (this.type === ProjectStatus.Active) {
          return status === ProjectStatus.Active;
        } else {
          return status === ProjectStatus.Finished;
        }
      });

      listElement.innerHTML = "";
      for (const project of this.assignedProjects) {
        new ProjectItem(project, this.type);
      }
    });
  }
}
