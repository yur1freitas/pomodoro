import { Pause } from 'lucide-react'

import usePomodoro from '~/hooks/usePomodoro'

import ControlsButton from './ControlsButton'

export default function PauseButton(): React.JSX.Element {
    const { countdown } = usePomodoro()

    const pauseAction = countdown.pause

    return <ControlsButton className='bg-yellow-600 hover:bg-yellow-600/80' action={pauseAction} label='Pausar' icon={Pause} />
}