import { faker } from '@faker-js/faker'

import type { PomodoroProps } from '~/models/Pomodoro'
import type Session from '~/models/Session'

import Pomodoro from '~/models/Pomodoro'

export default class PomodoroBuilder {
    private constructor(readonly props: PomodoroProps) {}

    static create(): PomodoroBuilder {
        return new PomodoroBuilder({
            intervals: faker.number.int({ min: 0, max: 100 })
        })
    }

    setIntervals(intervals: number): this {
        this.props.intervals = intervals
        return this
    }

    setCount(count: number): this {
        this.props.count = count
        return this
    }

    setSession(session: Session): this {
        this.props.session = session
        return this
    }

    withoutSession(): this {
        this.props.session = null
        return this
    }

    build(): Pomodoro {
        return new Pomodoro(this.props)
    }
}