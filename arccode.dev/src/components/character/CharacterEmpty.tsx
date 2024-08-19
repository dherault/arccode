import { InfoIcon } from 'lucide-react'

function CharacterEmpty() {
  return (
    <div className="p-4 bg-white border rounded w-fit">
      <div className="flex items-center gap-2">
        <InfoIcon className="h-4 w-4" />
        <div className="font-semibold">
          It is now time to resume coding!
        </div>
      </div>
      <div className="mt-2">
        Open VSCode and write some code to get started.
      </div>
      <div>
        Come back in 15 minutes to see your progress.
      </div>
    </div>
  )
}

export default CharacterEmpty
