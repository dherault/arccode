import type { FileData } from './types'
import { MAX_LINES } from './constants'

class FileRegistry {
  private data: FileData

  constructor() {
    this.data = {}
  }

  public registerFile(fileId: string, content: string) {
    const lines = content.split('\n')

    if (lines.length > MAX_LINES) return

    this.data[fileId] = this.mergeData(this.data[fileId] ?? [], lines.map(line => [line]))
  }

  public getAllLines(fileId: string) {
    return this.data[fileId] ?? []
  }

  public getLatestLines(fileId: string) {
    return this.data[fileId]?.map(x => x[x.length - 1]) ?? []
  }

  private mergeData(dataA: string[][], dataB: string[][]) {
    const mergedData = dataA.map(lineData => [...lineData])

    dataB.forEach((lineData, index) => {
      if (!mergedData[index]) mergedData[index] = []
      if (mergedData[index].some(line => lineData.includes(line))) return

      lineData.forEach(line => {
        mergedData[index].push(line)
      })
    })

    return mergedData
  }
}

export default FileRegistry
