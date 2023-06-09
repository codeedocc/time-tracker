interface RegisterInfo {
  email: string
  password: string
  confirmPassword: string
}

interface Alert {
  boolean: boolean
  text: string
}

interface ErrorMessages {
  error: string
  text: string
}

interface IUser {
  currentUser: {
    uid?: number
    displayName?: string
    email?: string
    photoURL?: string
  }
}

interface IAuth {
  children: ReactNode
}
