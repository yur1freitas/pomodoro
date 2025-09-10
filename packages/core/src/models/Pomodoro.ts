import type { SessionProps } from './Session'

import Session from './Session'

const WORK_DURATION = 15e5
const SHORT_BREAK_DURATION = 3e5
const LONG_BREAK_DURATION = 9e5

export interface PomodoroProps {
    intervals: number
    count?: number
    session?: Session | null
}

export default class Pomodoro {
    readonly intervals: number

    readonly count: number
    readonly session: Session | null

    constructor(props: PomodoroProps) {
        const { intervals, count = 0, session = this._createSession() } = props

        this.intervals = intervals
        this.count = count
        this.session = session
    }

    get isStarted(): boolean {
        return this.session !== null && this.session.isStarted
    }

    get isNotStarted(): boolean {
        return !this.isStarted
    }

    get isFinished(): boolean {
        return (this.session === null || this.session.isFinished) && this.count === this.intervals
    }

    get isNotFinished(): boolean {
        return !this.isFinished
    }

    get props(): PomodoroProps {
        return {
            intervals: this.intervals,
            count: this.count,
            session: this.session?.clone() ?? null
        }
    }

    startSession(): Pomodoro {
        if (this.isStarted || this.isFinished) {
            return this
        }

        const count = this.count + 1
        const session = this.session?.start() ?? this._createSession().start()

        return this.clone({ count, session })
    }

    nextSession(): Pomodoro {
        if (this.session?.isNotFinished || this.isFinished) {
            return this
        }

        const session = this._createSession()

        return this.clone({ session })
    }

    skipSession(): Pomodoro {
        if (this.isNotStarted || this.isFinished) {
            return this
        }

        const session = this._createSession()

        return this.clone({ session })
    }

    resetSession(): Pomodoro {
        if (this.isNotStarted || this.isFinished) {
            return this
        }

        const session = this.session!.reset()

        return this.clone({ session })
    }

    private _createSession(): Session {
        if (this.session && this.session.type === 'work') {
            const props: SessionProps = this.count % 7 === 0 ? {
                type: 'long-break',
                duration: LONG_BREAK_DURATION
            } : {
                type: 'short-break',
                duration: SHORT_BREAK_DURATION
            }

            return new Session(props)
        }

        return new Session({ type: 'work', duration: WORK_DURATION })
    }

    clone(
        props: Partial<PomodoroProps> = {}
    ): Pomodoro {
        return new Pomodoro({ ...this.props, ...props })
    }

    static create(intervals: number): Pomodoro {
        return new Pomodoro({ intervals })
    }
}