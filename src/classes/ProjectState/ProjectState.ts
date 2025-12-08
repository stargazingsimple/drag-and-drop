import { Project, ProjectType, ProjectStatus } from "../Project/Project.js";
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

    const cloneProjects: ProjectType[] = this.projects.slice();

    for (const listener of this.listeners) {
      listener(cloneProjects);
    }
  }
}

export const store: ProjectState = ProjectState.getInstance();
