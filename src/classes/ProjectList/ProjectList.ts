import { ProjectStatus, ProjectType } from "../Project/Project.js";
import { store } from "../ProjectState/ProjectState.js";

export class ProjectList {
  assignedProjects: ProjectType[] = [];

  constructor(public type: ProjectStatus) {
    this.render();
  }

  render() {
    const rootElement = <HTMLDivElement>document.getElementById("app");
    const templateElement = <HTMLTemplateElement>(
      document.getElementById("project-list")
    );

    const importedNode = document.importNode(templateElement.content, true);

    const listSectionElement = <HTMLElement>importedNode.firstElementChild;
    listSectionElement.id = `${this.type}-projects`;

    const listElement = <HTMLUListElement>(
      listSectionElement.querySelector("ul")
    );
    listElement.id = `${this.type}-projects-list`;

    const listTitleElement = <HTMLHeadingElement>(
      listSectionElement.querySelector("h2")
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
        const listItem = document.createElement("li");
        listItem.textContent = project.title;
        listElement.appendChild(listItem);
      }
    });

    rootElement.insertAdjacentElement("beforeend", listSectionElement);
  }
}
