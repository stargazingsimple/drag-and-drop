import { ProjectInput } from "./classes/ProjectInput/ProjectInput.js";
import { ProjectList } from "./classes/ProjectList/ProjectList.js";
import { ProjectStatus } from "./classes/Project/Project.js";

new ProjectInput();
new ProjectList(ProjectStatus.Active);
new ProjectList(ProjectStatus.Finished);
