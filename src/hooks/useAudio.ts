import { useEffect, useState } from 'react'

export const useAudio = (source: string, loop = true) => {
  const [audio] = useState(new Audio(source))
  const [playingAudio, setPlayingAudio] = useState(false)

  const toggleAudio = () => setPlayingAudio(!playingAudio)

  useEffect(() => {
    playingAudio ? audio.play() : audio.pause()
  }, [playingAudio, audio])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlayingAudio(false))
    audio.loop = loop
    return () => {
      audio.removeEventListener('ended', () => setPlayingAudio(false))
    }
  }, [audio, loop])

  return { playingAudio, toggleAudio }
}
