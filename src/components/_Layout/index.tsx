import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toggleDevMode, toggleEditMode } from '../../store/modeSlice'
import { useAppDispatch } from '../../hooks'
import styles from './index.module.scss'

type LayoutProp = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProp) => {
  const dispatch = useAppDispatch()

  useHotkeys('alt+e', () => {
    dispatch(toggleEditMode())
    console.log('editMode')
  })

  useHotkeys('alt+d', () => {
    dispatch(toggleDevMode())
    console.log('devMode')
  })

  return <div className={styles.layout}>{children}</div>
}

export default Layout
