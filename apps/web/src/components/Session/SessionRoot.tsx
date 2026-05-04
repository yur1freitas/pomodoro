export interface SessionRootProps {
    children?: React.ReactNode
}

export default function SessionRoot({
    children
}: SessionRootProps): React.JSX.Element {
    return (
        <section className='flex min-h-screen w-full items-center justify-center'>
            {children}
        </section>
    )
}
