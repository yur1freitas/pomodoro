import { faker } from '@faker-js/faker'

import type { SessionProps, SessionType } from '~/models/Session'

import Session from '~/models/Session'

export default class SessionBuilder {
    private constructor(readonly props: SessionProps) {}

    static create(): SessionBuilder {
        return new SessionBuilder({
            type: faker.helpers.arrayElement<SessionType>(['work', 'short-break', 'long-break']),
            duration: faker.number.int({ min: 0, max: 1000 })
        })
    }

    setType(type: SessionType): this {
        this.props.type = type
        return this
    }

    setDuration(duration: number): this {
        this.props.duration = duration
        return this
    }

    setStartedTime(time: number): this {
        this.props.startedTime = time
        return this
    }

    setFinishedTime(time: number): this {
        this.props.finishedTime = time
        return this
    }

    removeStartedTime(): this {
        this.props.startedTime = null
        return this
    }

    removeFinishedTime(): this {
        this.props.finishedTime = null
        return this
    }

    build(): Session {
        return new Session(this.props)
    }
}