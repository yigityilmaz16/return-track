import {Routes, Route} from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
   
  )
}

export default App
