import React from 'react'
import styles from './index.module.scss'

type TProps = {
  children: React.ReactNode
}

export const Board = ({ children }: TProps) => {
  return <div>{children}</div>
}

Board.Header = function Header() {
  const boardData = [
    {
      label: 'Idea',
      name: 'idea',
      color: '#ea4336',
    },
    {
      label: 'To do',
      name: 'todo',
      color: '#4285f4',
    },
    {
      label: 'In progress',
      name: 'in_progress',
      color: '#fabd05',
    },
    {
      label: 'Done',
      name: 'done',
      color: '#33a853',
    },
  ]

  return (
    <div className={styles.columnHeaders}>
      {boardData.map(e => (
        <div className={styles.columnHeader} key={e.name}>
          <div
            className={styles.icon}
            style={{
              backgroundColor: e.color,
            }}
          ></div>
          <span style={{ color: e.color }}>{e.label}</span>
        </div>
      ))}
    </div>
  )
}

Board.Card = function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.description}>Description</div>
      <div className={styles.epic}>- epic</div>
    </div>
  )
}
