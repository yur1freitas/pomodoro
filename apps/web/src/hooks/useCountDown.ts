import { useCallback, useState, useRef } from 'react'

export interface UseCountDownProps {
    duration?: number
    onComplete?: () => void
}

export interface UseCountDownData {
    time: number
    date: Date
    isActivated: boolean
    isNotActivated: boolean
    isPaused: boolean
    isNotPaused: boolean
    isRunning: boolean
    isNotRunning: boolean
}

export interface UseCountDownReturn {
    data: UseCountDownData
    start: () => void
    pause: () => void
    resume: () => void
    reset: (time?: number) => void
}

export default function useCountDown({ duration = 0, onComplete }: UseCountDownProps): Readonly<UseCountDownReturn> {
    const intervalId = useRef(0)

    const [time, setTime] = useState(duration)

    const [isActivated, setIsActivated] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const calcTime = useCallback((): void => {
        setTime((time) => {
            const currentTime = time - 1000

            if (currentTime <= 0) {
                onComplete?.()

                setIsActivated(false)
                setIsRunning(false)
                setIsPaused(false)

                return 0
            }

            return currentTime
        })
    }, [])

    // Start / Resume
    const start = useCallback(() => {
        if (isRunning) return

        intervalId.current = window.setInterval(calcTime, 1000)

        setIsActivated(true)
        setIsRunning(true)
        setIsPaused(false)
    }, [isRunning])

    const pause = useCallback(() => {
        if (isPaused) return

        window.clearInterval(intervalId.current)

        setIsActivated(true)
        setIsRunning(false)
        setIsPaused(true)
    }, [isPaused])

    const reset = useCallback((resetTime: number = duration) => {
        window.clearInterval(intervalId.current)

        setIsActivated(false)
        setIsRunning(false)
        setIsPaused(false)

        setTime(resetTime)
    }, [])

    return {
        start,
        pause,
        reset,
        resume: start,
        data: {
            time,
            date: new Date(time),
            isPaused,
            isRunning,
            isActivated,
            isNotPaused: !isPaused,
            isNotRunning: !isRunning,
            isNotActivated: !isActivated
        }
    }
}