const formatWordRegex = /[^a-zA-Z0-9-_]/g

function extractKeywords(keywords: string[], line: string) {
  if (!keywords) return []

  return line
    .split(formatWordRegex)
    .filter(word => keywords.includes(word))
}

export default extractKeywords
