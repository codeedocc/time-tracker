import { createContext, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext<IUser>({
  currentUser: {
    uid: 0,
    displayName: '',
    email: '',
    photoURL: '',
  },
})

export const AuthContextProvider: React.FC<IAuth> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user)
    })

    return () => {
      unsub()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
