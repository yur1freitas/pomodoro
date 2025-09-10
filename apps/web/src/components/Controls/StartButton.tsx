import { Play } from 'lucide-react'
import { useCallback } from 'react'

import usePomodoro from '~/hooks/usePomodoro'

import ControlsButton from './ControlsButton'

export default function StartButton(): React.JSX.Element {
    const { alarm, countdown, session } = usePomodoro()

    const startAction = useCallback(() => {
        session.start()

        alarm.stop()
        countdown.start()
    }, [alarm, countdown, session])

    return <ControlsButton className='bg-emerald-600 hover:bg-emerald-600/80' action={startAction} label='Iniciar' icon={Play} />
}