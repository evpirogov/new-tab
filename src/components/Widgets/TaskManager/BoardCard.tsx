import { useState } from 'react'
import {
  TBoardCard,
  selectEpic,
  selectPriority,
} from '../../../store/bordSlice'
import { setDragCandidate } from '../../../store/dragSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import styles from './index.module.scss'
import { Modal } from '../../Modal'
import { BoardForm } from './BoardForm'

type TBoardCardProps = {
  data: TBoardCard
}

const BoardCard = ({ data }: TBoardCardProps) => {
  const dispatch = useAppDispatch()

  const [modalOpen, setModalOpen] = useState(false)

  const { dragInProgress } = useAppSelector(state => state.drag)

  const priority = useAppSelector(state => selectPriority(state, data.priority))
  const epic = useAppSelector(state => selectEpic(state, data.epic))

  const onMouseDownHandler = (e: React.MouseEvent) => {
    const currentTarget = e.currentTarget as HTMLDivElement
    const offsets = currentTarget.getBoundingClientRect()

    const localeDragCandidate = {
      type: 'boardCard',
      id: data.id,
      position: {
        x: offsets.left + window.scrollX,
        y: offsets.top + window.scrollY,
      },
      clickCoords: {
        x: e.clientX,
        y: e.clientY,
      },
      size: {
        width: offsets.width,
        height: offsets.height,
      },
    }

    dispatch(setDragCandidate(localeDragCandidate))
  }

  const editCardHandler = () => {
    if (dragInProgress) return
    setModalOpen(true)
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <div
          className={styles.card}
          onMouseDown={onMouseDownHandler}
          onClick={editCardHandler}
        >
          <p className={styles.description}>{data.description}</p>
          {epic && (
            <div
              className={styles.epic}
              style={{
                color: epic.colorScheme.mainColor,
                backgroundColor: epic.colorScheme.secondColor,
              }}
            >
              {epic.label}
            </div>
          )}
          {priority && (
            <div
              className={styles.priorityRibbon}
              style={{
                backgroundColor: priority?.color,
              }}
            />
          )}
        </div>

        {dragInProgress && (
          <div className={styles.dropArea}>
            <div
              className={styles.before}
              data-drop-type={'cardBefore'}
              data-drop-id={data.id}
            />
            <div
              className={styles.after}
              data-drop-type={'cardAfter'}
              data-drop-id={data.id}
            />
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <BoardForm
          formType="edit"
          card={data}
          closeModal={() => {
            setModalOpen(false)
          }}
        />
      </Modal>
    </>
  )
}

export default BoardCard
