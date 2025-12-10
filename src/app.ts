import { ProjectInput } from "./classes/ProjectInput/ProjectInput";
import { ProjectList } from "./classes/ProjectList/ProjectList";
import { ProjectStatus } from "./classes/Project/Project";

new ProjectInput();
new ProjectList(ProjectStatus.Active);
new ProjectList(ProjectStatus.Finished);
