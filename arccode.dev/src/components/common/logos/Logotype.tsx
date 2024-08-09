import Logo from '~components/common/logos/Logo'

function Logotype() {
  return (
    <div className="flex items-center gap-2 text-blue">
      <Logo className="h-12" />
      <div className="font-semibold select-none">
        Arccode
      </div>
    </div>
  )
}

export default Logotype
