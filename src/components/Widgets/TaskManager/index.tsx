import { useAppSelector } from '../../../hooks'
import styles from './index.module.scss'
import { Board } from './Board'
import BoardColumn from './BoardColumn'

export const TaskManager = () => {
  const { statuses } = useAppSelector(state => state.board)
  return (
    <div className={styles.container}>
      <p className={styles.widgetHeader}>Task manager / Kanban board</p>
      <Board>
        {statuses.map(e => {
          return <BoardColumn status={e.value} key={e.value} />
        })}
      </Board>
    </div>
  )
}
