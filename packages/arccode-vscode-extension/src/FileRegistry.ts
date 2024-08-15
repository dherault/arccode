import { MAX_LINES } from './constants'

class FileRegistry {
  private data: Record<string, string>

  constructor() {
    this.data = {}
  }

  public registerFile(fileId: string, content: string) {
    const lines = content.split('\n')

    if (lines.length > MAX_LINES) return

    this.data[fileId] = content
  }

  public getLines(fileId: string) {
    return this.data[fileId]?.split('\n') ?? []
  }
}

export default FileRegistry
