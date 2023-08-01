import { useState } from 'react'
import { selectColumnCards } from '../../../store/bordSlice'
import { useAppSelector } from '../../../hooks'
import styles from './index.module.scss'
import { Modal } from '../../Modal'
import BoardCard from './BoardCard'
import { BoardForm } from './BoardForm'

type TBoardColumnProps = {
  status: string
}

const BoardColumn = ({ status }: TBoardColumnProps) => {
  const { dragInProgress } = useAppSelector(state => state.drag)
  const cards = useAppSelector(state => selectColumnCards(state, status))
  const [modalOpen, setModalOpen] = useState(false)

  const addTaskButtonStyles = {
    display: cards.length ? '' : 'block',
  }

  const newTaskHandler = () => {
    setModalOpen(true)
  }

  return (
    <>
      <div
        className={styles.column}
        data-drop-type={'column'}
        data-drop-id={status}
        style={{ paddingBottom: dragInProgress ? '38px' : '' }}
      >
        {cards
          .filter(e => e.status === status)
          .map(e => (
            <BoardCard data={e} key={e.id} />
          ))}
        {!dragInProgress && (
          <button
            className={styles.addNewCardButton}
            style={addTaskButtonStyles}
            onClick={newTaskHandler}
          >
            + new task
          </button>
        )}
      </div>

      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <BoardForm
          formType="create"
          initialStatus={status}
          closeModal={() => {
            setModalOpen(false)
          }}
        />
      </Modal>
    </>
  )
}

export default BoardColumn
