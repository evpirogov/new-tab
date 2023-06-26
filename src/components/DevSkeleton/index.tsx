import styles from './index.module.scss'

type SkeletonProps = {
  name: string
  style?: object
}

const DevSkeleton = ({ name, style }: SkeletonProps) => {
  return (
    <div className={styles.container} style={style}>
      {name}
    </div>
  )
}

export default DevSkeleton
