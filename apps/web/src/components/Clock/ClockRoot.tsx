import { twMerge } from 'tailwind-merge'

const baseClassNames = 'flex gap-x-2 items-center justify-center'

export type ClockRootProps = React.ComponentProps<'div'>

export default function ClockRoot({ children, className, ...props }: ClockRootProps): React.JSX.Element {
    const classNames = twMerge(baseClassNames, className)

    return <div className={classNames} {...props}>{children}</div>
}