namespace App {
  export enum ProjectStatus {
    Active = "active",
    Finished = "finished",
  }

  export interface ProjectType {
    id: string;
    title: string;
    description: string;
    people: number;
    status: ProjectStatus;
  }

  export class Project {
    constructor(public project: ProjectType) {}
  }
}
