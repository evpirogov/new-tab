import { useCallback, useEffect, useState } from 'react'
import { useAudio } from '../../../hooks/useAudio'
import styles from './index.module.scss'
import forestAudio from '../../../assets/watch/european-forest-ambience.wav'
import { Screensaver } from './Screensaver'

export const Watch = () => {
  const { toggleAudio } = useAudio(forestAudio)

  const [time, setTime] = useState('')
  const [screensaverActive, setScreensaverActive] = useState(false)

  const openScreensaver = useCallback(() => {
    setScreensaverActive(true)
    document.documentElement.requestFullscreen()
  }, [])
  const closeScreensaver = useCallback(() => {
    setScreensaverActive(false)
    document.exitFullscreen()
  }, [])

  const formatTime = useCallback(
    (i: string) => (Number(i) < 10 ? `0${i}` : i),
    [],
  )

  const updateTime = useCallback(() => {
    const currentTime = new Date()

    const currentHour = formatTime(currentTime.getHours().toString())
    const currentMinute = formatTime(currentTime.getMinutes().toString())

    setTime(`${currentHour}:${currentMinute}`)
  }, [formatTime])

  useEffect(() => {
    updateTime()

    const interval = setInterval(() => {
      updateTime()
    }, 200)
    return () => clearInterval(interval)
  }, [updateTime])

  return (
    <>
      <button className={styles.watch} onClick={openScreensaver}>
        {time}
      </button>

      {screensaverActive && (
        <Screensaver
          toggleAudio={toggleAudio}
          closeScreensaver={closeScreensaver}
          time={time}
        />
      )}
    </>
  )
}
