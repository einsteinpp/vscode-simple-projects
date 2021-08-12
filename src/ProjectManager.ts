import { readdir, readdirSync } from 'fs';
import Project from './Project';

class ProjectManager {
  private _projects: Array<Project>;

  private _sources: Array<string>;

  constructor(paths: Array<string>) {
    this._sources = paths;
    this._projects = [];
  }

  /**
   * Update the projects list
   *
   * Read the disk when vscode start and when
   * simple-project.refreshProjects is called
   */
  public refreshProjectsList(): void {
    this.discoverProjects();
  }

  /**
   * Discover all projects
   *
   * Will hydrate the _projects array with
   * all projects discovered inside _sources
   */
  protected discoverProjects(): void {
    this.dropStaleProjects();

    for (let path of this._sources) {
      this._projects = this._projects.concat(this.fetchProjects(path));
    }
  }

  /**
   * Remove stale projects
   */
  protected dropStaleProjects(): void {
    this._projects = [];
  }

  /**
   * Fetch the sources for projects
   *
   * @param path
   * @returns A list of projects find in path
   */
  protected fetchProjects(path: string): Array<Project> {
    return readdirSync(path, { withFileTypes: true })
      .filter((dir) => dir.isDirectory())
      .map((dir) => new Project(dir.name, path));
  }

  /**
   * Open a project
   *
   * @param project the project we want to open
   */
  public openProject(project: Project): void {
    console.log(project);
  }

  /**
   * Return all projects discovered
   */
  public getAllProjects(): Array<Project> {
    return this._projects;
  }

  /**
   * Return the project that match uid
   *
   * @throws Error
   * @param uid
   */
  public getProject(uid: string): Project {
    let project = this._projects.find((project) => project.uid === uid);

    if (project === undefined) {
      throw Error("Can't find a project with uid:" + uid);
    }

    return project;
  }
}

export default ProjectManager;
