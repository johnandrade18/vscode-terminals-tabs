import * as vscode from "vscode";
import { StatusBarTerminal } from "./statusBarTerminal";

const MAX_TERMINALS = 10;
let countTerminales = 0;
let terminales: StatusBarTerminal[] = [];

export function activate({ subscriptions }: vscode.ExtensionContext) {
  subscriptions.push(
    vscode.commands.registerCommand("terminalTabs.createTerminal", () => {
      if (terminales.length >= MAX_TERMINALS) {
        vscode.window.showErrorMessage(
          `Maximo de terminales soportados son ${MAX_TERMINALS}`
        );
        return;
      }
      terminales.push(new StatusBarTerminal(countTerminales++));
    })
  );

  subscriptions.push(
    vscode.commands.registerCommand("terminalTabs.createNameTerminal", () => {
      vscode.window
        .showInputBox({ placeHolder: "Ingrese el nombde del terminal" })
        .then((name) => {
          terminales.push(new StatusBarTerminal(countTerminales++, name));
        });
    })
  );

  for (let i = 1; i <= MAX_TERMINALS; i++) {
    subscriptions.push(
      vscode.commands.registerCommand(`terminalTabs.showTerminal${i}`, () =>
        terminales[i - 1].show()
      )
    );
  }

  subscriptions.push(vscode.window.onDidCloseTerminal(onDidCloseTerminal));
}

function onDidCloseTerminal(terminal: vscode.Terminal): void {
  let terminalIndex: number;
  terminales.forEach((StatusBarTerminal, index) => {
    if (StatusBarTerminal.hasTerminal(terminal)) terminalIndex = index;
  });
  terminales[terminalIndex].dispose();
  terminales.splice(terminalIndex, 1);
  terminales.forEach((StatusBarTerminal, index) => {
    StatusBarTerminal.setTerminalIndex(index);
  });
  countTerminales--;
}

export function deactivate() {}
