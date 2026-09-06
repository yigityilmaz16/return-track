import {Routes, Route} from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
    </>
   
  )
}

export default App
