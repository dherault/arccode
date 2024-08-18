import GitHubButton from 'react-github-btn'

function GithubButton() {
  return (
    <GitHubButton
      href="https://github.com/dherault/arccode"
      data-color-scheme="no-preference: light; light: light; dark: dark;"
      data-icon="octicon-star"
      data-size="large"
      data-show-count="true"
      aria-label="Star dherault/arccode on GitHub"
    >
      Star
    </GitHubButton>
  )
}

export default GithubButton
