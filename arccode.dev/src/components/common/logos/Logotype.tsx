import Logo from '~components/common/logos/Logo'

function Logotype() {
  return (
    <div className="flex items-center gap-2 text-blue">
      <Logo className="h-10" />
      <div className="font-semibold text-2xl select-none">
        Arccode
      </div>
    </div>
  )
}

export default Logotype
