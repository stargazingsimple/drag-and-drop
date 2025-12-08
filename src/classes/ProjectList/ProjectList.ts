import { ProjectStatus, ProjectType } from "../Project/Project.js";
import { Component } from "../Component/Component.js";
import { ProjectItem } from "../ProjectItem/ProjectItem.js";
import { DragTarget } from "../../utils/interfaces.js";
import { Autobind } from "../../decorators/autobind.js";
import { store } from "../ProjectState/ProjectState.js";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: ProjectType[] = [];
  listElement!: HTMLUListElement;

  constructor(public type: ProjectStatus) {
    super("app", "project-list", false, `${type}-projects`);
    this.configure();
  }

  configure() {
    this.listElement = <HTMLUListElement>(
      this.attachedElement.querySelector("ul")
    );
    this.listElement.id = `${this.type}-projects-list`;

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

      this.listElement.innerHTML = "";
      for (const project of this.assignedProjects) {
        new ProjectItem(project, this.type);
      }
    });

    this.attachedElement.addEventListener("dragover", this.dragOverHandler);
    this.attachedElement.addEventListener("drop", this.dropHandler);
    this.attachedElement.addEventListener("dragleave", this.dragLeaveHandler);
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      this.listElement.classList.add("droppable");
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    if (event.dataTransfer) {
      const projectId = event.dataTransfer.getData("text/plain");
      store.moveProject(
        projectId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished,
      );
    }
  }

  @Autobind
  dragLeaveHandler(_: DragEvent) {
    this.listElement.classList.remove("droppable");
  }
}
