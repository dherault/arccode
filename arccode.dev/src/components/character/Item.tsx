type Props = {
  itemId: string
}

function Item({ itemId }: Props) {
  return (
    <div className="w-full h-full">
      <img
        src={`/images/gears/${itemId}.png`}
        alt={itemId}
        draggable={false}
        className="w-full h-full"
      />
    </div>
  )
}

export default Item
