export type SessionType = 'short-break' | 'long-break' | 'work'

export interface SessionProps {
    type: SessionType,
    duration: number
    startedTime?: number | null
    finishedTime?: number | null
}

export default class Session {
    readonly type: SessionType
    readonly duration: number
    readonly startedTime: number | null
    readonly finishedTime: number | null

    constructor(props: SessionProps) {
        const { type, duration, startedTime = null, finishedTime = null } = props

        this.type = type
        this.duration = duration
        this.startedTime = startedTime
        this.finishedTime = finishedTime ?? (startedTime && startedTime + duration)
    }

    get isStarted(): boolean {
        return this.startedTime !== null
    }

    get isNotStarted(): boolean {
        return !this.isStarted
    }

    get isFinished(): boolean {
        return this.finishedTime !== null && Date.now() >= this.finishedTime
    }

    get isNotFinished(): boolean {
        return !this.isFinished
    }

    get props(): SessionProps {
        return {
            type: this.type,
            duration: this.duration,
            startedTime: this.startedTime,
            finishedTime: this.finishedTime
        }
    }

    start(): Session {
        if (this.isStarted) return this

        const startedTime = Date.now()
        const finishedTime = startedTime + this.duration

        return this.clone({ startedTime, finishedTime })
    }

    reset(): Session {
        if (this.isNotStarted) return this

        const startedTime = null
        const finishedTime = null

        return this.clone({ startedTime, finishedTime })
    }

    clone(props: Partial<SessionProps> = {}): Session {
        return new Session({ ...this.props, ...props })
    }
}