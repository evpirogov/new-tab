import { useCallback, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Forest } from './Forest'

export const Watch = () => {
  const [time, setTime] = useState('')
  const [screensaverActive, setScreensaverActive] = useState(false)

  const checkTime = (i: string) => (Number(i) < 10 ? `0${i}` : i)

  const updateTime = () => {
    const currentTime = new Date()

    const currentHour = checkTime(currentTime.getHours().toString())
    const currentMinute = checkTime(currentTime.getMinutes().toString())

    setTime(`${currentHour}:${currentMinute}`)
  }

  const memoizedUpdateTime = useCallback(updateTime, [])

  useEffect(() => {
    memoizedUpdateTime()

    const interval = setInterval(() => {
      memoizedUpdateTime()
    }, 200)
    return () => clearInterval(interval)
  }, [memoizedUpdateTime])

  return (
    <>
      <button
        className={styles.watch}
        onClick={() => {
          setScreensaverActive(true)
          document.documentElement.requestFullscreen()
        }}
      >
        {time}
      </button>

      {screensaverActive && (
        <div
          className={styles.screensaver}
          onClick={() => {
            setScreensaverActive(false)
            document.exitFullscreen()
          }}
        >
          <Forest time={time} />
        </div>
      )}
    </>
  )
}
