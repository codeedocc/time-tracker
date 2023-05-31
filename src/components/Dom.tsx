import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Dom = () => {
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (!user) {
        navigate('/time-tracker/')
      }
    })
  }, [])

  const exit = () => {
    signOut(auth).then(() => navigate('/time-tracker/'))
  }

  return <h1 onClick={exit}>Выйти</h1>
}

export default Dom
