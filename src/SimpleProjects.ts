import { commands, ExtensionContext, Uri, window, workspace } from 'vscode';
import ProjectManager from './ProjectManager';
import ProjectQuickPickItem from './ProjectQuickPickItem';

class SimpleProjects {
  private _context: ExtensionContext;
  private _projectManager: ProjectManager;
  private _inNewWindow: boolean;

  constructor(context: ExtensionContext) {
    let sources = workspace
      .getConfiguration('simple-projects')
      .get('sources', []);

    this._inNewWindow = workspace
      .getConfiguration('simple-projects')
      .get('newWindow', false);

    this._projectManager = new ProjectManager(sources);
    this._context = context;

    this.registerCommands();

    // Manually refresh the projects list on start
    this._projectManager.refreshProjectsList();
  }

  registerCommands(): void {
    this._context.subscriptions.push(
      commands.registerCommand('simple-projects.refreshProject', () =>
        this.refreshCommand()
      )
    );

    this._context.subscriptions.push(
      commands.registerCommand('simple-projects.openProject', () =>
        this.openCommand()
      )
    );
  }

  refreshCommand(): void {
    //TODO: Refresh the sources list
    //* we need to add a way to update the sources
    //* in the project manager
    this._projectManager.refreshProjectsList();
  }

  openCommand(): void {
    let projects: ProjectQuickPickItem[] = this._projectManager
      .getAllProjects()
      .map((project) => {
        return {
          uid: project.uid,
          label: project.name,
        };
      });

    window.showQuickPick(projects).then((selected) => {
      if (selected !== undefined) {
        let project = this._projectManager.getProject(selected.uid);

        //? can we handle this better ?
        try {
          this._projectManager.openProject(project);
        } catch (error) {
          window.showErrorMessage(error);
          return;
        }

        commands.executeCommand(
          'vscode.openFolder',
          Uri.file(`${project.path}\\${project.name}`),
          this._inNewWindow
        );
      }
    });
  }
}

export default SimpleProjects;
