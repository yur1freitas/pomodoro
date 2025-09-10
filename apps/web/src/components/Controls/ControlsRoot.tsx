import { twMerge } from 'tailwind-merge'

const baseClassNames = 'flex justify-center gap-x-2'

export default function ControlsRoot({ children, className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
    const classNames = twMerge(baseClassNames)

    return <div className={classNames} {...props}>{children}</div>
}