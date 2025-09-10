import PomodoroBuilder from '__test__/data/PomodoroBuilder'
import { setTimeout as sleep } from 'node:timers/promises'
import SessionBuilder from '__test__/data/SessionBuilder'

import { Pomodoro } from '~/models'

describe('Testando a classe: Pomodoro', () => {
    it('deve criar um pomodoro', () => {
        const pomodoro = Pomodoro.create(12)

        expect(pomodoro.intervals).toBe(12)
    })

    it('deve iniciar uma sessão do pomodoro', () => {
        const pomodoro = PomodoroBuilder.create().build()

        expect(pomodoro.isNotStarted).toBeTruthy()

        const startedPomodoro = pomodoro.startSession()

        expect(startedPomodoro.isStarted).toBeTruthy()
    })

    it('deve resetar uma sessão do pomodoro', () => {
        const startedPomodoro = PomodoroBuilder.create().build().startSession()

        expect(startedPomodoro.isStarted).toBeTruthy()

        const resetedPomodoro = startedPomodoro.resetSession()

        expect(resetedPomodoro.isStarted).toBeFalsy()
    })

    it('deve pular uma sessão no pomodoro', () => {
        const startedPomodoro = PomodoroBuilder.create().build().startSession()

        expect(startedPomodoro.isStarted).toBeTruthy()

        const skipedPomodoro = startedPomodoro.skipSession()

        expect(skipedPomodoro.isStarted).toBeFalsy()
        expect(startedPomodoro.session !== skipedPomodoro.session).toBeTruthy()
    })

    it('deve clonar um pomodoro', () => {
        const pomodoro = PomodoroBuilder.create().build()
        const clonedPomodoro = pomodoro.clone()

        expect(pomodoro !== clonedPomodoro).toBeTruthy()
        expect(pomodoro.props).toEqual(clonedPomodoro.props)
    })

    it('deve clonar uma sessão com propriedades diferentes', () => {
        const pomodoro = PomodoroBuilder.create().setIntervals(5).build()
        const clonedPomodoro = pomodoro.clone({ intervals: 10 })

        expect(pomodoro.intervals).toBe(5)
        expect(clonedPomodoro.intervals).toBe(10)

        expect(pomodoro !== clonedPomodoro).toBeTruthy()
        expect(pomodoro.props).not.toEqual(clonedPomodoro.props)
    })

    it('deve verificar se o pomodoro já foi finalizada', async () => {
        const session = SessionBuilder.create().setDuration(100).build()
        const pomodoro = PomodoroBuilder.create().setIntervals(2).setSession(session).build().startSession()

        expect(pomodoro.isNotFinished).toBeTruthy()

        await sleep(pomodoro.session!.duration)

        expect(pomodoro.count).toBe(1)
        expect(pomodoro.isNotFinished).toBeTruthy()

        const nextSession = session.clone()
        const nextPomodoro = pomodoro.nextSession().clone({ session: nextSession }).startSession()

        await sleep(nextPomodoro.session!.duration)

        expect(nextPomodoro.count).toBe(2)
        expect(nextPomodoro.isFinished).toBeTruthy()
    })

    it('não deve iniciar uma sessão do pomodoro caso já esteja inicializado', () => {
        const startedPomodoro = PomodoroBuilder.create().build().startSession()

        expect(startedPomodoro.isStarted).toBeTruthy()

        const startedPomodoro2 = startedPomodoro.startSession()

        expect(startedPomodoro === startedPomodoro2).toBeTruthy()
    })

    it('não deve iniciar uma sessão do pomodoro caso já esteja finalizado', async () => {
        const session = SessionBuilder.create().setDuration(100).build()
        const startedPomodoro = PomodoroBuilder
            .create()
            .setIntervals(1)
            .setSession(session)
            .build()
            .startSession()

        expect(startedPomodoro.isStarted).toBeTruthy()
        expect(startedPomodoro.isNotFinished).toBeTruthy()

        await sleep(startedPomodoro.session!.duration)

        expect(startedPomodoro.isFinished).toBeTruthy()

        const startedPomodoro2 = startedPomodoro.nextSession().startSession()
        expect(startedPomodoro === startedPomodoro2).toBeTruthy()
    })

    it('não deve resetar uma sessão do pomodoro caso o não esteja inicializada', () => {
        const pomodoro = PomodoroBuilder.create().build()

        const resetedPomodoro = pomodoro.resetSession()

        expect(pomodoro === resetedPomodoro).toBeTruthy()
        expect(pomodoro.session === resetedPomodoro.session).toBeTruthy()
    })

    it('não deve resetar uma sessão do pomodoro caso já esteja finalizado', async () => {
        const session = SessionBuilder.create().setDuration(100).build()
        const startedPomodoro = PomodoroBuilder.create().setIntervals(1).setSession(session).build().startSession()

        expect(startedPomodoro.isStarted).toBeTruthy()
        expect(startedPomodoro.isNotFinished).toBeTruthy()

        await sleep(startedPomodoro.session!.duration)

        expect(startedPomodoro.isStarted).toBeTruthy()
        expect(startedPomodoro.isFinished).toBeTruthy()

        const resetedPomodoro = startedPomodoro.resetSession()

        expect(startedPomodoro === resetedPomodoro).toBeTruthy()
        expect(startedPomodoro.session === resetedPomodoro.session).toBeTruthy()
    })

    it('não deve pular uma sessão do pomodoro caso o não esteja inicializada', () => {
        const pomodoro = PomodoroBuilder.create().build()

        const skipedPomodoro = pomodoro.skipSession()

        expect(pomodoro === skipedPomodoro).toBeTruthy()
        expect(pomodoro.session === skipedPomodoro.session).toBeTruthy()
    })

    it('não deve pular uma sessão do pomodoro caso já esteja finalizado', async () => {
        const session = SessionBuilder.create().setDuration(100).build()
        const startedPomodoro = PomodoroBuilder.create().setIntervals(1).setSession(session).build().startSession()

        expect(startedPomodoro.isStarted).toBeTruthy()
        expect(startedPomodoro.isNotFinished).toBeTruthy()

        await sleep(startedPomodoro.session!.duration)

        expect(startedPomodoro.isStarted).toBeTruthy()
        expect(startedPomodoro.isFinished).toBeTruthy()

        const skipedPomodoro = startedPomodoro.skipSession()

        expect(startedPomodoro === skipedPomodoro).toBeTruthy()
        expect(startedPomodoro.session === skipedPomodoro.session).toBeTruthy()
    })

    it('deve criar uma sessão de trabalho e pausa curta de forma alternada', () => {
        const pomodoro = PomodoroBuilder.create().build().startSession()
        expect(pomodoro.session!.type).toBe('work')

        const pomodoro2 = pomodoro.skipSession().startSession()
        expect(pomodoro2.session!.type).toBe('short-break')

        const pomodoro3 = pomodoro2.skipSession().startSession()
        expect(pomodoro3.session!.type).toBe('work')
    })

    it('deve criar uma sessão de pausa longa após a sétima sessão de trabalho', () => {
        const pomodoro = Array(7).fill(null).reduce((current) => {
            return current.skipSession().startSession()
        }, PomodoroBuilder.create().build().startSession())

        expect(pomodoro.session.type).toBe('long-break')
    })

    it('deve criar uma nova sessão caso ao inicializar não exista uma', () => {
        const pomodoro = PomodoroBuilder.create().withoutSession().build()

        expect(pomodoro.session).toBeNull()
        expect(pomodoro.startSession().session).not.toBeNull()
    })

    it('deve retornar as propriedades do pomodoro', () => {
        const session = SessionBuilder.create().setDuration(100).build()
        const pomodoro = PomodoroBuilder.create().setIntervals(1).setCount(2).setSession(session).build()

        const props = pomodoro.props

        expect(props.count).toBe(2)
        expect(props.intervals).toBe(1)
        expect(props.session!.props).toEqual(session.props)

        // Sessão clonada
        expect(props.session !== session).toBeTruthy()
    })
})