/// <reference path="./classes/ProjectInput/ProjectInput.ts" />
/// <reference path="./classes/ProjectList/ProjectList.ts" />
/// <reference path="./classes/Project/Project.ts" />

namespace App {
  new ProjectInput();
  new ProjectList(ProjectStatus.Active);
  new ProjectList(ProjectStatus.Finished);
}
