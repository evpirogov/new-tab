import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './index.module.scss'

type TProps = {
  children: ReactNode
  isOpen: boolean
  setOpen: (arg0: boolean) => void
}

export const Modal = ({ children, isOpen, setOpen }: TProps) => {
  if (!isOpen) return null

  return createPortal(
    <div
      className={styles.modalBackdrop}
      onClick={() => {
        setOpen(false)
      }}
    >
      <div
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  )
}
