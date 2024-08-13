import type { KeywordRegistry } from '~types'

type Props = {
  keywords: KeywordRegistry
}

function LevelUpCard({ keywords }: Props) {
  if (false) console.log(keywords)

  return (
    <div className="p-4 flex items-center justify-center bg-white border border-blue rounded text-blue cursor-pointer">
      <div className="animate-bounce">
        Level up!
      </div>
    </div>
  )
}

export default LevelUpCard
