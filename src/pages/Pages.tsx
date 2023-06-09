import { Register, Home, Login } from '../components'
import { Routes, Route } from 'react-router-dom'

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
