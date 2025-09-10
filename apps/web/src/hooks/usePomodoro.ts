import { use } from 'react'

import type { PomodoroContextValue } from '~/context/PomodoroContext'

import { PomodoroContext } from '~/context/PomodoroContext'

export default function usePomodoro(): PomodoroContextValue {
    const ctx = use(PomodoroContext)

    if (ctx === null) {
        throw new Error('usePomodoro deve ser usado com PomodoroProvider')
    }

    return ctx
}