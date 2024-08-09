const camelRegex = /-([a-z])/g

function camelify(string: string) {
  return string.replace(camelRegex, (_, s) => s.toUpperCase())
}

export default camelify
