import { QuickPickItem } from 'vscode';

interface ProjectQuickPickItem extends QuickPickItem {
  uid: string;
}

export default ProjectQuickPickItem;
