import { RotateCcw } from 'lucide-react'
import { useCallback } from 'react'

import usePomodoro from '~/hooks/usePomodoro'

import ControlsButton from './ControlsButton'

export default function ResetButton(): React.JSX.Element {
    const { alarm, session, countdown } = usePomodoro()

    const resetAction = useCallback(() => {
        session.reset()

        alarm.stop()
        countdown.reset(session?.data?.duration)
    }, [alarm, countdown, session])

    return <ControlsButton className='bg-red-600 hover:bg-red-600/80' action={resetAction} icon={RotateCcw} label='Resetar' />
}