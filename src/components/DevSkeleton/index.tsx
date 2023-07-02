import { selectMode } from '../../store/modeSlice'
import { useAppSelector } from '../../hooks'
import styles from './index.module.scss'

type SkeletonProps = {
  name: string
  style?: object
}

const DevSkeleton = ({ name, style }: SkeletonProps) => {
  const { devMode } = useAppSelector(state => selectMode(state))

  return (
    devMode && (
      <div className={styles.container} style={style}>
        {name}
      </div>
    )
  )
}

export default DevSkeleton
