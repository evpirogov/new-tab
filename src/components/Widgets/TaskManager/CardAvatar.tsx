import { createPortal } from 'react-dom'
import { selectCardById } from '../../../store/bordSlice'
import { TAvatar, TDragCandidate } from '../../../store/dragSlice'
import { useAppSelector } from '../../../hooks'
import BoardCard from './BoardCard'

type TCardAvatar = {
  avatar: TAvatar
  dragCandidate: TDragCandidate
}

const CardAvatar = ({ avatar, dragCandidate }: TCardAvatar) => {
  const avatarCard = useAppSelector(state =>
    selectCardById(state, dragCandidate.id),
  )

  if (!avatar || !dragCandidate || !avatarCard) return

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top:
          avatar.position.y -
          dragCandidate.clickCoords.y +
          dragCandidate.position.y,
        left:
          avatar.position.x -
          dragCandidate.clickCoords.x +
          dragCandidate.position.x,
        width: dragCandidate.size.width,
        height: dragCandidate.size.height,
        opacity: '0.7',
      }}
    >
      <BoardCard data={avatarCard} />
    </div>,
    document.getElementById('drag-root') as HTMLElement,
  )
}

export default CardAvatar
