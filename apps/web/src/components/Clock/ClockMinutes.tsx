export interface ClockMinutesProps {
    withUnit?: boolean
    timeInMinutes: number
}

export default function ClockMinutes({ withUnit, timeInMinutes }: ClockMinutesProps): React.JSX.Element {
    const minutes = timeInMinutes.toString().padStart(2, '0')

    return <p><span className='text-6xl'>{minutes}</span>{withUnit && <span className='text-4xl'>m</span>}</p>
}