import DevSkeleton from '../DevSkeleton'
import { Battery, Watch, Weather } from '../Widgets'
import styles from './index.module.scss'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <DevSkeleton
        name="≡"
        style={{ fontSize: '40px', paddingBottom: '18px' }}
      />
      <DevSkeleton name="Tab manager" style={{ minWidth: '200px' }} />
      <DevSkeleton
        name={'Notifier'}
        style={{ marginRight: 'auto', minWidth: '200px' }}
      />
      <DevSkeleton name="Player" style={{ minWidth: '120px' }} />
      <Weather />
      <Battery />
      <Watch />
    </div>
  )
}

export default Footer
