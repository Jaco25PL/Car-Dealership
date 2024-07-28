import './App.css'
import { Cars_Display } from './components/Cars_Display';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';



function App() {


  return (

    <div className="min-h-screen p-4">
    {/* Navigation */}
      <Navigation/>

    {/* Header */}
      <Header/>

    {/* Car Display */}
      <Cars_Display/>

  </div>

  )
}

export default App
