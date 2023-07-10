import { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import imgLayer1 from '../../../assets/watch/layer-1.jpg'
import imgLayer2 from '../../../assets/watch/layer-2.png'
import imgLayer5 from '../../../assets/watch/layer-5.png'
import imgLayer6 from '../../../assets/watch/layer-6.png'

type TProps = {
  time: string
  toggleAudio: () => void
  closeScreensaver: () => void
}

export const Screensaver = ({
  time,
  toggleAudio,
  closeScreensaver,
}: TProps) => {
  const coords = useRef({
    mouseX: window.innerHeight / 2,
    mouseY: window.innerWidth / 2,
    cameraX: window.innerHeight / 2,
    cameraY: window.innerWidth / 2,
  })

  const reqId = useRef(0)

  const layersContainerRef = useRef<HTMLDivElement>(null)

  const handleWatchClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    toggleAudio()
  }
  const lerp = (start: number, end: number, t: number) =>
    start * (1 - t) + end * t

  const cameraMove = () => {
    if (!layersContainerRef.current) return

    const lerpCoef = 0.05

    coords.current.cameraX = lerp(
      coords.current.cameraX,
      coords.current.mouseX,
      lerpCoef,
    )
    coords.current.cameraY = lerp(
      coords.current.cameraY,
      coords.current.mouseY,
      lerpCoef,
    )

    layersContainerRef.current.style.transform = `rotateX(${
      -(coords.current.cameraY - window.innerHeight / 2) / 150
    }deg) rotateY(${(coords.current.cameraX - window.innerWidth / 2) / 150}deg)`

    reqId.current = requestAnimationFrame(cameraMove)
  }

  useEffect(() => {
    cameraMove()

    const onMouseMove = (e: MouseEvent) => {
      if (!layersContainerRef.current) return
      coords.current.mouseX = e.clientX
      coords.current.mouseY = e.clientY
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.cancelAnimationFrame(reqId.current)
    }
  })

  return (
    <div className={styles.screensaver} onClick={closeScreensaver}>
      <div className={styles.layersContainer} ref={layersContainerRef}>
        <div
          className={`${styles.layersItem} ${styles.layer1}`}
          style={{ backgroundImage: `url(${imgLayer1})` }}
        ></div>
        <div
          className={`${styles.layersItem} ${styles.layer2}`}
          style={{ backgroundImage: `url(${imgLayer2})` }}
        ></div>
        <div className={`${styles.layersItem} ${styles.layer3}`}>
          <div className={styles.heroContent} onClick={handleWatchClick}>
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
    </div>
  )
}
