import type { SessionType } from '@pomodoro/core/models'

import { useMemo } from 'react'

import usePomodoro from '~/hooks/usePomodoro'

const getSessionTitle = (type?: SessionType): string => {
    switch (type) {
        case 'work':
            return '🚀 Hora do Show!'
        case 'short-break':
            return '☕ Pausa para o Café'
        case 'long-break':
            return '🍵 Hora de Descansar'
        default:
            return '👋 Acabamos por Hoje...'
    }
}

export default function SessionTitle(): React.JSX.Element {
    const { session } = usePomodoro()

    const title = useMemo(() => getSessionTitle(session?.data?.type), [session])

    return <p className='text-4xl text-center font-semibold'>{title}</p>
}