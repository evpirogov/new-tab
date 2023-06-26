import { ReactNode } from 'react'
import styles from './index.module.scss'

type TProps = {
  children: ReactNode
  isOpen: boolean
  setOpen: (arg0: boolean) => void
}

export const Modal = ({ children, isOpen, setOpen }: TProps) => {
  return (
    isOpen && (
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
      </div>
    )
  )
}
