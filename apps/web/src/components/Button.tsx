import { twMerge } from 'tailwind-merge'
import React from 'react'

const baseClassNames = 'cursor-pointer font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-800/80 rounded-md px-3 py-2'

export type ButtonProps = React.ComponentProps<'button'>

export default function Button({ className, children, ...props }: ButtonProps): React.JSX.Element {
    const classNames = twMerge(baseClassNames, className)

    return <button className={classNames} type='button' {...props}>{children}</button>
}