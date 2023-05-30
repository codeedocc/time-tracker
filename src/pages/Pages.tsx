import { Routes, Route } from 'react-router-dom'
import { Example } from '../components'

const Pages: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/time-tracker/register" element={<Example />} />
        <Route path="/time-tracker" element={<Example />} />
      </Routes>
    </>
  )
}

export default Pages
