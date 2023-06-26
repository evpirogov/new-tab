import React from 'react'
import styles from './index.module.scss'

type LayoutProp = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProp) => {
  return <div className={styles.layout}>{children}</div>
}

export default Layout
