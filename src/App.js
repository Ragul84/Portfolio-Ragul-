import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import CryptoContext from './CryptoContext'
import { useContext } from 'react'


function App() {
 
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
