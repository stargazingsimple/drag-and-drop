export enum ProjectStatus {
  Active,
  Finished,
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
