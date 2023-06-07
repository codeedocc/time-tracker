import { Routes, Route } from 'react-router-dom'
import { Register, Home } from '../components'
import Login from '../components/Login'

const Pages: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/time-tracker/" element={<Login />} />
        <Route path="/time-tracker/register" element={<Register />} />
        <Route path="/time-tracker/homepage" element={<Home />} />
      </Routes>
    </>
  )
}

export default Pages
