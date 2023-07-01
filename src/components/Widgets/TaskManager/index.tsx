import styles from './index.module.scss'
import DevSkeleton from '../../DevSkeleton'

export const TaskManager = () => {
  return (
    <div className={styles.container}>
      <p className={styles.header}>Task manager / Kanban board</p>
      <div className={styles.columns}>
        <DevSkeleton name="Idea" style={{ minHeight: '400px', flex: 1 }} />
        <DevSkeleton name="Todo" style={{ minHeight: '400px', flex: 1 }} />
        <DevSkeleton
          name="In progress"
          style={{ minHeight: '400px', flex: 1 }}
        />
        <DevSkeleton name="Done" style={{ minHeight: '400px', flex: 1 }} />
      </div>
    </div>
  )
}
