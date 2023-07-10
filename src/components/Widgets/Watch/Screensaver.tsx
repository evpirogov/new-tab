import { useCallback, useEffect, useRef } from 'react'
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
  const layersContainerRef = useRef<HTMLDivElement>(null)
  const cameraParams = useRef({
    reqId: 0,
    timeoutId: 0,
    isActive: false,
    mouseX: window.innerHeight / 2,
    mouseY: window.innerWidth / 2,
    cameraX: window.innerHeight / 2,
    cameraY: window.innerWidth / 2,
  })

  const lerp = (start: number, end: number, t: number) =>
    start * (1 - t) + end * t

  const handleWatchClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    toggleAudio()
  }

  const cameraMove = useCallback(() => {
    if (!layersContainerRef.current) return

    const lerpCoef = 0.05

    cameraParams.current.cameraX = lerp(
      cameraParams.current.cameraX,
      cameraParams.current.mouseX,
      lerpCoef,
    )
    cameraParams.current.cameraY = lerp(
      cameraParams.current.cameraY,
      cameraParams.current.mouseY,
      lerpCoef,
    )

    layersContainerRef.current.style.transform = `rotateX(${
      -(cameraParams.current.cameraY - window.innerHeight / 2) / 150
    }deg) rotateY(${
      (cameraParams.current.cameraX - window.innerWidth / 2) / 150
    }deg)`

    if (cameraParams.current.isActive)
      cameraParams.current.reqId = requestAnimationFrame(cameraMove)
  }, [])

  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (!layersContainerRef.current) return
      if (!cameraParams.current.isActive) {
        cameraParams.current.isActive = true
        cameraMove()
      } else {
        cameraParams.current.mouseX = e.clientX
        cameraParams.current.mouseY = e.clientY
        clearTimeout(cameraParams.current.timeoutId)
        cameraParams.current.timeoutId = setTimeout(() => {
          cameraParams.current.isActive = false
        }, 1500)
      }
    },
    [cameraMove],
  )

  const getCurrentReqId = useCallback(() => cameraParams.current.reqId, [])

  useEffect(() => {
    cameraMove()

    window.addEventListener('mousemove', mouseMoveHandler)

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
      window.cancelAnimationFrame(getCurrentReqId())
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
