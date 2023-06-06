import { Routes, Route } from 'react-router-dom'
import { Example, Home } from '../components'

const Pages: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/time-tracker/register" element={<Example />} />
        <Route path="/time-tracker" element={<Home />} />
      </Routes>
    </>
  )
}

export default Pages
