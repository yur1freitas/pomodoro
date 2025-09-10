import usePomodoro from '~/hooks/usePomodoro'

import Controls from './Controls'
import Session from './Session'
import Clock from './Clock'

export default function Content(): React.JSX.Element {
    const { countdown } = usePomodoro()
    const { date } = countdown.data

    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return (
        <Session.root>
            <div className='flex flex-col gap-y-8'>
                <Session.title />
                <div className='flex flex-col gap-y-8'>
                    <Clock.root>
                        <Clock.minutes timeInMinutes={minutes} withUnit />
                        <Clock.seconds timeInSeconds={seconds} withUnit />
                    </Clock.root>
                    <Controls.root>
                        {countdown.data.isNotActivated && <Controls.start />}
                        {countdown.data.isActivated && countdown.data.isPaused && <Controls.resume />}
                        {countdown.data.isActivated && countdown.data.isNotPaused && <Controls.pause />}
                        <Controls.skip />
                        <Controls.reset />
                    </Controls.root>
                </div>
            </div>
        </Session.root>
    )
}