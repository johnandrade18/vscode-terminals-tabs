import * as vscode from 'vscode';

export class StatusBarTerminal {
  private terminal: vscode.Terminal;

  private statusBarItem: vscode.StatusBarItem;

  constructor(terminalIndex: number, name?: string) {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      terminalIndex
    );
    this.setTerminalIndex(terminalIndex);
    this.statusBarItem.show();
    this.terminal = vscode.window.createTerminal({
      name,
    });
    this.terminal.show();
  }

  public show(): void {
    this.terminal.show();
  }

  public dispose(): void {
    this.statusBarItem.dispose();
    this.terminal.dispose();
  }

  public setTerminalIndex(terminalIndex: number): void {
    this.statusBarItem.text = `$(terminal) ${terminalIndex+1}`;
    this.statusBarItem.command = `terminalTabs.showTerminal${terminalIndex+1}`;
  }

  public hasTerminal(terminal: vscode.Terminal): boolean {
    return this.terminal === terminal;
  }
}
