import { PomodoroProvider } from './context/PomodoroContext'
import Content from './components/Content'

export default function App(): React.JSX.Element {
    return <PomodoroProvider intervals={Infinity}>
        <Content />
    </PomodoroProvider>
}
