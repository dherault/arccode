import Spinner from '~components/common/Spinner'

function SpinnerCentered() {
  return (
    <div
      role="status"
      className="grow h-full flex items-center justify-center"
    >
      <Spinner className="w-8 h-8" />
    </div>
  )
}

export default SpinnerCentered
