import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import { setCurrentLocation } from './services/LocationService'

function App() {
  setCurrentLocation();
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
