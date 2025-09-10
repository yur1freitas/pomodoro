import { StepForward } from 'lucide-react'
import { useCallback } from 'react'

import usePomodoro from '~/hooks/usePomodoro'

import ControlsButton from './ControlsButton'

export default function ResumeButton(): React.JSX.Element {
    const { alarm, countdown, session } = usePomodoro()

    const resumeAction = useCallback(() => {
        session.start()

        alarm.stop()
        countdown.resume()
    }, [alarm, countdown, session])

    return <ControlsButton className='bg-emerald-600 hover:bg-emerald-600/80' action={resumeAction} icon={StepForward} label='Continuar' />
}