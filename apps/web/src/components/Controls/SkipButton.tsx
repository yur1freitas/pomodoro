import { SkipForward } from 'lucide-react'
import { useCallback } from 'react'

import usePomodoro from '~/hooks/usePomodoro'

import ControlsButton from './ControlsButton'

export default function SkipButton(): React.JSX.Element {
    const { alarm, session, countdown } = usePomodoro()

    const skipAction = useCallback(() => {
        session.skip()

        alarm.stop()
        countdown.reset(session?.data?.duration)
    }, [alarm, session, countdown])

    return <ControlsButton className='bg-blue-600 hover:bg-blue-600/80' action={skipAction} icon={SkipForward} label='Pular' />
}