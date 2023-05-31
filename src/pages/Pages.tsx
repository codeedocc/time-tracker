import { Routes, Route } from 'react-router-dom'
import { Register, Dom } from '../components'

const Pages: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/time-tracker/" element={<Register />} />
        <Route path="/time-tracker/dom" element={<Dom />} />
      </Routes>
    </>
  )
}

export default Pages
