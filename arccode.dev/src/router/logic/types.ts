export type Route = {
  lazy?: boolean
  name?: string
  path?: string
  importPath?: string
  lazyImportPath?: string
  loading?: boolean
  children?: Route[]
  layout?: boolean
  page?: boolean
  notFound?: boolean
}
