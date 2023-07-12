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

type TCardProps = {
  data: {
    id: string
    description: string
    epic: {
      label: string
      name: string
      colorScheme: {
        mainColor: string
        secondColor: string
      }
    } | null
  }
}

Board.Card = function Card({ data }: TCardProps) {
  const cardData = data || {
    id: 'hasd8f',
    description:
      'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',
    epic: {
      label: 'Some epic',
      name: 'epic',
      colorScheme: {
        mainColor: 'red',
        secondColor: 'pink',
      },
    },
  }

  return (
    <div className={styles.card}>
      <p className={styles.description}>{cardData.description}</p>
      {cardData.epic && (
        <div
          className={styles.epic}
          style={{
            color: cardData.epic.colorScheme.mainColor,
            boxShadow: `inset 0 0 0 1px ${cardData.epic.colorScheme.mainColor}`,
            backgroundColor: cardData.epic.colorScheme.secondColor,
          }}
        >
          {cardData.epic.label}
        </div>
      )}
    </div>
  )
}
