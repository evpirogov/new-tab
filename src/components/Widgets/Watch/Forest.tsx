import { useEffect, useState } from 'react'
import { useAudio } from '../../../hooks/useAudio'
import styles from './index.module.scss'
import forestAudio from '../../../assets/european-forest-ambience.wav'
import imgLayer1 from '../../../assets/weather/layer-1.jpg'
import imgLayer2 from '../../../assets/weather/layer-2.png'
import imgLayer5 from '../../../assets/weather/layer-5.png'
import imgLayer6 from '../../../assets/weather/layer-6.png'

type TProps = {
  time: string
}

export const Forest = ({ time }: TProps) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
  const { toggleAudio } = useAudio(forestAudio)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      setCoordinates({
        x: e.clientX - window.innerWidth / 2,
        y: -(e.clientY - window.innerHeight / 2),
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  })

  return (
    <div
      className={styles.layersContainer}
      style={
        {
          '--move-x': `${coordinates.y / 150}deg`,
          '--move-y': `${coordinates.x / 150}deg`,
        } as React.CSSProperties
      }
    >
      <div
        className={`${styles.layersItem} ${styles.layer1}`}
        style={{ backgroundImage: `url(${imgLayer1})` }}
      ></div>
      <div
        className={`${styles.layersItem} ${styles.layer2}`}
        style={{ backgroundImage: `url(${imgLayer2})` }}
      ></div>
      <div className={`${styles.layersItem} ${styles.layer3}`}>
        <div
          className={styles.heroContent}
          onClick={e => {
            e.stopPropagation()
            toggleAudio()
          }}
        >
          {time}
        </div>
      </div>
      <div className={`${styles.layersItem} ${styles.layer4}`}>
        <canvas className="rain"></canvas>
      </div>
      <div
        className={`${styles.layersItem} ${styles.layer5}`}
        style={{ backgroundImage: `url(${imgLayer5})` }}
      ></div>
      <div
        className={`${styles.layersItem} ${styles.layer6}`}
        style={{ backgroundImage: `url(${imgLayer6})` }}
      ></div>
    </div>
  )
}
