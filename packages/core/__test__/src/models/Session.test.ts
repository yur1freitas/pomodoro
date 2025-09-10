import { setTimeout as sleep } from 'node:timers/promises'
import SessionBuilder from '__test__/data/SessionBuilder'

describe('Testando a classe: Session', () => {
    it('deve iniciar uma sessão', () => {
        const session = SessionBuilder.create().build()

        expect(session.isStarted).toBeFalsy()
        expect(session.isNotStarted).toBeTruthy()

        const startedSession = session.start()

        expect(startedSession.isStarted).toBeTruthy()
        expect(startedSession.isNotStarted).toBeFalsy()
    })

    it('deve resetar uma sessão', () => {
        const startedSession = SessionBuilder.create().build().start()

        expect(startedSession.isStarted).toBeTruthy()
        expect(startedSession.isNotStarted).toBeFalsy()

        const resetedSession = startedSession.reset()

        expect(resetedSession.isStarted).toBeFalsy()
        expect(resetedSession.isNotStarted).toBeTruthy()
    })

    it('deve clonar uma sessão', () => {
        const session = SessionBuilder.create().build()
        const clonedSession = session.clone()

        expect(session !== clonedSession).toBeTruthy()
        expect(session.props).toEqual(clonedSession.props)
    })

    it('deve clonar uma sessão com propriedades diferentes', () => {
        const session = SessionBuilder.create().setDuration(2500).build()
        const clonedSession = session.clone({ duration: 1000 })

        expect(session.duration).toBe(2500)
        expect(clonedSession.duration).toBe(1000)

        expect(session !== clonedSession).toBeTruthy()
        expect(session.props).not.toEqual(clonedSession.props)
    })

    it('deve verificar se a sessão já foi finalizada', async () => {
        const session = SessionBuilder.create().setDuration(500).build().start()

        expect(session.isNotFinished).toBeTruthy()

        await sleep(session.duration)

        expect(session.isFinished).toBeTruthy()
    })

    it('não deve iniciar uma sessão caso já esteja inicializada', () => {
        const startedSession = SessionBuilder.create().build().start()

        expect(startedSession === startedSession.start()).toBeTruthy()
    })

    it('não deve resetar uma sessão caso não esteja inicializada', () => {
        const startedSession = SessionBuilder.create().build()

        expect(startedSession === startedSession.reset()).toBeTruthy()
    })

    it('deve calcular o tempo de finalização caso não seja fornecido', () => {
        const timestamp = Date.now()
        const session = SessionBuilder.create().setStartedTime(timestamp).build()

        expect(session.finishedTime).toBe(timestamp + session.duration)
    })

    it('deve retonar as propriedades da Sessão', () => {
        const timestamp = Date.now()
        const session = SessionBuilder
            .create()
            .setType('long-break')
            .setDuration(100)
            .setStartedTime(timestamp)
            .build()

        const props = session.props

        expect(props.duration).toBe(100)
        expect(props.type).toBe('long-break')
        expect(props.startedTime).toBe(timestamp)
        expect(props.finishedTime).toBe(timestamp + 100)
    })
})