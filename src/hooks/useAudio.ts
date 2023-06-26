import { useEffect, useState } from 'react'

export const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url))
  const [playingAudio, setPlayingAudio] = useState(false)

  const toggleAudio = () => setPlayingAudio(!playingAudio)

  useEffect(() => {
    playingAudio ? audio.play() : audio.pause()
  }, [playingAudio, audio])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlayingAudio(false))
    audio.loop = true
    return () => {
      audio.removeEventListener('ended', () => setPlayingAudio(false))
    }
  }, [audio])

  return { playingAudio, toggleAudio }
}
