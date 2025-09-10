import type { LucideIcon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import Button from '../Button'

export interface ControlsButtonProps {
    label: string
    icon: LucideIcon
    action: () => void
    className?: string
}

const baseClassNames = 'flex items-center gap-x-2'

export default function ControlsButton({
    icon: Icon,
    label,
    action,
    className
}: ControlsButtonProps): React.JSX.Element {
    const classNames = twMerge(baseClassNames, className)

    return <Button className={classNames} onClick={action}>
        <Icon size={16} />
        <p>{label}</p>
    </Button>
}