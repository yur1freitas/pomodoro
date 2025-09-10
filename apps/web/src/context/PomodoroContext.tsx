import type { Session } from '@pomodoro/core/models'

import { createContext, useCallback, useEffect, useState, useMemo } from 'react'
import { Pomodoro } from '@pomodoro/core/models'

import type { UseCountDownReturn } from '~/hooks/useCountDown'
import type { UseAudioReturn } from '~/hooks/useAudio'

import useCountDown from '~/hooks/useCountDown'
import useAudio from '~/hooks/useAudio'

export interface PomodoroContextValue {
    alarm: UseAudioReturn
    countdown: UseCountDownReturn
    data: {
        isStarted: boolean
        isFinished: boolean
    }
    session: {
        data: Session | null
        start: () => void
        next: () => void
        skip: () => void
        reset: () => void
    }
}

export const PomodoroContext = createContext<PomodoroContextValue | null>(null)

export interface PomodoroProviderProps {
    intervals: number
    children?: React.ReactNode
}

export function PomodoroProvider({ intervals, children }: PomodoroProviderProps): React.JSX.Element {
    const alarm = useAudio('/pomodoro/alarm.mp3')

    const [pomodoro, setPomodoro] = useState(Pomodoro.create(intervals))

    const session = pomodoro.session
    const isStarted = pomodoro.isStarted
    const isFinished = pomodoro.isFinished

    const start = useCallback(() => setPomodoro((pomodoro) => pomodoro.startSession()), [])
    const next = useCallback(() => setPomodoro((pomodoro) => pomodoro.nextSession()), [])
    const skip = useCallback(() => setPomodoro((pomodoro) => pomodoro.skipSession()), [])
    const reset = useCallback(() => setPomodoro((pomodoro) => pomodoro.resetSession()), [])

    const onComplete = useCallback(() => {
        next()
        alarm.play(3000)
    }, [])

    const countdown = useCountDown({ duration: session?.duration, onComplete })

    useEffect(() => {
        if (countdown.data.isNotRunning && session) countdown.reset(session.duration)
    }, [session])

    const value = useMemo<PomodoroContextValue>(() => ({
        alarm,
        countdown,
        data: {
            isStarted,
            isFinished
        },
        session: {
            start,
            next,
            skip,
            reset,
            data: session
        }
    }), [pomodoro, countdown, next, start])

    return <PomodoroContext value={value}>
        {children}
    </PomodoroContext>
}