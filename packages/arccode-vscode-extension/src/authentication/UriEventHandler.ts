import * as vscode from 'vscode'

class UriEventHandler extends vscode.EventEmitter<vscode.Uri> implements vscode.UriHandler {
  public handleUri(uri: vscode.Uri) {
    this.fire(uri)
  }
}

export default UriEventHandler
