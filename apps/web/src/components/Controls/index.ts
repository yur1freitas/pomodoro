import ResumeButton from './ResumeButton'
import ControlsRoot from './ControlsRoot'
import PauseButton from './PauseButton'
import ResetButton from './ResetButton'
import StartButton from './StartButton'
import SkipButton from './SkipButton'

const Controls = {
    root: ControlsRoot,
    skip: SkipButton,
    pause: PauseButton,
    reset: ResetButton,
    start: StartButton,
    resume: ResumeButton
} as const

export default Controls