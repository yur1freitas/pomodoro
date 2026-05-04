import ClockSeparator from './ClockSeparator'
import ClockSeconds from './ClockSeconds'
import ClockRoot from './ClockRoot'
import ClockMinutes from './ClockMinutes'

const Clock = {
    root: ClockRoot,
    minutes: ClockMinutes,
    seconds: ClockSeconds,
    separator: ClockSeparator
} as const

export default Clock
