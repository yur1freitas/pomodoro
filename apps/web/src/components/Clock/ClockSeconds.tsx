export interface ClockSecondsProps {
    withUnit?: boolean
    timeInSeconds: number
}

export default function ClockSeconds({ withUnit, timeInSeconds }: ClockSecondsProps): React.JSX.Element {
    const seconds = timeInSeconds.toString().padStart(2, '0')

    return <p><span className='text-6xl'>{seconds}</span>{withUnit && <span className='text-4xl'>s</span>}</p>
}