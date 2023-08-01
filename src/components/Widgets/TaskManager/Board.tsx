import React, { HTMLAttributes, useCallback, useEffect } from 'react'
import { moveCard } from '../../../store/bordSlice'
import {
  completeDrag,
  setAvatar,
  setAvatarPosition,
} from '../../../store/dragSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import styles from './index.module.scss'
import BoardHeader from './BoardHeader'
import CardAvatar from './CardAvatar'

type TProps = {
  children: React.ReactNode
}

export const Board = ({ children }: TProps) => {
  const dispatch = useAppDispatch()
  const { avatar, dragCandidate } = useAppSelector(state => state.drag)

  const onMouseUpHandler = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const { dropType, dropId } = target.dataset

      if (dropType && dropId && dragCandidate) {
        dispatch(
          moveCard({
            targetType: dropType,
            targetId: dropId,
            cardId: dragCandidate.id,
          }),
        )
      }

      dispatch(completeDrag())
    },
    [dispatch, dragCandidate],
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
    <div>
      <BoardHeader />
      <div className={styles.columns}>
        {children}
        {avatar && dragCandidate && (
          <CardAvatar avatar={avatar} dragCandidate={dragCandidate} />
        )}
      </div>
    </div>
  )
}
