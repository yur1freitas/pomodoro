import { useCallback, useRef } from 'react'

export interface UseAudioData {
    isPlaying: boolean
    isPaused: boolean
}

export interface UseAudioReturn {
    data: UseAudioData
    play: (duration?: number) => void
    stop: () => void
    pause: () => void
}

export default function useAudio(src: string): Readonly<UseAudioReturn> {
    const audioRef = useRef(new Audio(src))

    const audio = audioRef.current

    const isPaused = audio.paused
    const isPlaying = !isPaused

    const pause = useCallback(() => audio.pause(), [audioRef])

    const stop = useCallback(() => {
        audio.pause()
        audio.currentTime = 0
    }, [audioRef])

    const play = useCallback((duration?: number) => {
        if (duration && duration < audio.duration * 1e3) {
            window.setTimeout(stop, duration)
        }

        audio.play()
    }, [audioRef])

    return {
        play,
        stop,
        pause,
        data: { isPlaying, isPaused }
    }
}