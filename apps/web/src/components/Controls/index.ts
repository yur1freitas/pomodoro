import StartButton from './StartButton'
import SkipButton from './SkipButton'
import ResumeButton from './ResumeButton'
import ResetButton from './ResetButton'
import PauseButton from './PauseButton'
import ControlsRoot from './ControlsRoot'

const Controls = {
    root: ControlsRoot,
    skip: SkipButton,
    pause: PauseButton,
    reset: ResetButton,
    start: StartButton,
    resume: ResumeButton
} as const

export default Controls
