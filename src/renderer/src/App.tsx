import RenderCanvas from './components/RenderCanvas'
import Sidebar from './components/Sidebar'
import WelcomeWizard from './components/WelcomeWizard'
import useAppStore from './store/store'

function App(): JSX.Element {
  const { introWatched } = useAppStore()

  return (
    <div className={'flex flex-col w-screen h-screen'}>
      {introWatched ? <></> : <WelcomeWizard />}
      <div className={'w-full h-full grid'}>
        <RenderCanvas />
        <Sidebar />
      </div>
    </div>
  )
}

export default App
