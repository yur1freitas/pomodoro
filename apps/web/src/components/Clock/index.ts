import ClockSeparator from './ClockSeparator'
import ClockMinutes from './ClockMinutes'
import ClockSeconds from './ClockSeconds'
import ClockRoot from './ClockRoot'

const Clock = {
    root: ClockRoot,
    minutes: ClockMinutes,
    seconds: ClockSeconds,
    separator: ClockSeparator
} as const

export default Clock