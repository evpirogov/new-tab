import { selectMode } from '../../../store/modeSlice'
import { useAppSelector } from '../../../hooks'
import styles from './index.module.scss'

export const TopLinks = () => {
  const { devMode } = useAppSelector(state => selectMode(state))

  const mockData = [
    {
      title: 'sheets.new',
      url: 'https://docs.google.com/spreadsheets/u/1/create?usp=dot_new',
      favIconUrl: 'https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico',
    },
    {
      title: 'YouTube',
      url: 'https://www.youtube.com/',
      favIconUrl:
        'https://www.youtube.com/s/desktop/d3b0c2c7/img/favicon_32x32.png',
    },
    {
      title: 'Все статьи подряд / Хабр',
      url: 'https://habr.com/ru/all/',
      favIconUrl:
        'https://assets.habr.com/habr-web/img/favicons/favicon-32.png',
    },
  ]

  return (
    devMode && (
      <div className={styles.toplinks}>
        {mockData.map(e => (
          <a key={e.url} href={e.url} className={styles.linkItem}>
            <img className={styles.linkItemIcon} src={e.favIconUrl} />
            <span className={styles.linkItemText}>{e.title}</span>
          </a>
        ))}
      </div>
    )
  )
}
