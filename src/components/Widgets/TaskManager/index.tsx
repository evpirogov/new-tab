import styles from './index.module.scss'
import { Board } from './Board'

export const TaskManager = () => {
  return (
    <div className={styles.container}>
      <p className={styles.widgetHeader}>Task manager / Kanban board</p>
      <Board.Header />
      <div className={styles.columns}>
        <div className={styles.column}>
          <Board.Card />
          <Board.Card />
          <Board.Card />
        </div>
        <div className={styles.column}>
          <Board.Card />
        </div>
        <div className={styles.column}>
          <Board.Card />
          <Board.Card />
        </div>
        <div className={styles.column}>
          <Board.Card />
        </div>
      </div>
    </div>
  )
}
