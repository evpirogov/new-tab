import { useAppSelector } from '../../../hooks'
import styles from './index.module.scss'

const BoardHeader = () => {
  const boardData = useAppSelector(state => state.board.statuses)

  return (
    <div className={styles.columnHeaders}>
      {boardData.map(e => (
        <div className={styles.columnHeader} key={e.value}>
          <div
            className={styles.icon}
            style={{
              backgroundColor: e.color,
            }}
          />
          <span style={{ color: e.color }}>{e.label}</span>
        </div>
      ))}
    </div>
  )
}

export default BoardHeader
