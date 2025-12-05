import { Project, ProjectType, ProjectStatus } from "../Project/Project.js";

type ListenerType = (projects: ProjectType[]) => void;

class ProjectState {
  private listeners: ListenerType[] = [];
  private projects: ProjectType[] = [];
  private static instance: ProjectState;

  private constructor() {}

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

    const cloneProjects: ProjectType[] = this.projects.slice();

    for (const listener of this.listeners) {
      listener(cloneProjects);
    }
  }

  addListener(listener: ListenerType) {
    this.listeners.push(listener);
  }
}

export const store: ProjectState = ProjectState.getInstance();
