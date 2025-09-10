export interface SessionRootProps {
    children?: React.ReactNode
}

export default function SessionRoot({ children }: SessionRootProps): React.JSX.Element {
    return <section className='w-full min-h-screen flex justify-center items-center'>
        {children}
    </section>
}