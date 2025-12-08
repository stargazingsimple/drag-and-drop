import { Project, ProjectStatus, ProjectType } from "../Project/Project.js";
import { State } from "../State/State.js";

class ProjectState extends State<ProjectType> {
  private projects: ProjectType[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(project: { title: string; description: string; people: number }) {
    const projectInstance = new Project({
      ...project,
      id: Math.random().toString(),
      status: ProjectStatus.Active,
    });

    this.projects.push(projectInstance.project);

    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const updatedProject = this.projects.find(
      (project) => project.id === projectId,
    );
    if (updatedProject && updatedProject.status !== newStatus) {
      updatedProject.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    const cloneProjects: ProjectType[] = this.projects.slice();

    for (const listener of this.listeners) {
      listener(cloneProjects);
    }
  }
}

export const store: ProjectState = ProjectState.getInstance();
