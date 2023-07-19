import React, { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  completeDrag,
  setAvatar,
  setAvatarPosition,
  setDragCandidate,
} from '../../../store/dragSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import styles from './index.module.scss'

type TProps = {
  children: React.ReactNode
}

type TCardProps = {
  data: {
    id: string
    status: string
    priority: 'normal' | 'major' | 'critical'
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

export const Board = ({ children }: TProps) => {
  const dispatch = useAppDispatch()
  const { avatar, dragInProgress, dragCandidate } = useAppSelector(
    state => state.drag,
  )

  const onMouseUpHandler = useCallback(
    (e: MouseEvent) => {
      dispatch(completeDrag())

      console.log(e.target)
    },
    [dispatch],
  )

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragCandidate) return

      if (
        Math.abs(e.clientX - dragCandidate.clickCoords.x) < 5 &&
        Math.abs(e.clientY - dragCandidate.clickCoords.y) < 5
      ) {
        return
      }

      if (!avatar) {
        dispatch(
          setAvatar({
            position: {
              x: e.clientX,
              y: e.clientY,
            },
          }),
        )
      } else {
        dispatch(
          setAvatarPosition({
            x: e.clientX,
            y: e.clientY,
          }),
        )
      }

      e.preventDefault()
    },
    [dragCandidate],
  )

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUpHandler)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mouseup', onMouseUpHandler)
      window.removeEventListener('mousemove', onMouseMove)
    }
  })
  return (
    <>
      <Board.Header />
      <div className={styles.columns}>
        {children}
        {avatar &&
          dragCandidate &&
          createPortal(
            <Board.CardAvatar />,
            document.getElementById('drag-root') as HTMLElement,
          )}
      </div>
    </>
  )
}

Board.Header = function Header() {
  const boardData = useAppSelector(state => state.board.columns)

  return (
    <div className={styles.columnHeaders}>
      {boardData.map(e => (
        <div className={styles.columnHeader} key={e.name}>
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

type TColumnProps = {
  children: React.ReactNode
  status: string
}

Board.Column = function Column({ children, status }: TColumnProps) {
  const { cards } = useAppSelector(state => state.board)

  return <div className={styles.column}>{children}</div>
}

Board.Card = function Card({ data }: TCardProps) {
  const dispatch = useAppDispatch()

  const mapPriorityToColor = {
    normal: '#4285f4',
    major: '#fabd05',
    critical: '#ea4336',
  }

  const onMouseDownHandler = (e: React.MouseEvent) => {
    const currentTarget = e.currentTarget as HTMLDivElement
    const offsets = currentTarget.getBoundingClientRect()
    console.log(e)

    const dragCandidate = {
      type: 'boardCard',
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

    dispatch(setDragCandidate(dragCandidate))
  }

  return (
    <div className={styles.card} onMouseDown={onMouseDownHandler}>
      <p className={styles.description}>{data.description}</p>
      {/* {data.epic && (
        <div
          className={styles.epic}
          style={{
            color: data.epic.colorScheme.mainColor,
            backgroundColor: data.epic.colorScheme.secondColor,
          }}
        >
          {data.epic.label}
        </div>
      )} */}
      <div
        className={styles.priorityRibbon}
        style={{
          backgroundColor: mapPriorityToColor[data.priority],
        }}
      />
    </div>
  )
}

Board.CardAvatar = (() => {
  const { cards } = useAppSelector(state => state.board)
  const { avatar, dragCandidate } = useAppSelector(state => state.drag)

  if (!avatar || !dragCandidate) return

  return (
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
        cursor: 'grab',
        opacity: '0.7',
      }}
    >
      <Board.Card data={cards[0]} />
    </div>
  )
}) as React.FC
