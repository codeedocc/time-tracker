import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import '../styles/register.scss'
import { alerts } from '../assets/const'

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<Alert>({
    boolean: false,
    text: '',
  })

  const navigate = useNavigate()

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/time-tracker/dom')
      })
      .catch((err) => setError({ boolean: true, text: err.code }))
  }

  const register = () => {
    if (registerInfo.password !== registerInfo.confirmPassword) {
      setError({ boolean: true, text: 'Пароли не совпадают' })
      return
    }
    createUserWithEmailAndPassword(
      auth,
      registerInfo.email,
      registerInfo.password
    )
      .then(() => {
        navigate('/time-tracker/dom')
      })
      .catch((err) => setError({ boolean: true, text: err.code }))
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/time-tracker/dom')
      }
    })
  }, [])

  return (
    <div className="welcome">
      <h1>Time Tracker</h1>
      <div className="input-field">
        {isRegistering ? (
          <>
            <input
              type="email"
              placeholder="Введите email"
              value={registerInfo.email}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Введите пароль"
              value={registerInfo.password}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, password: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Подтвердите пароль"
              value={registerInfo.confirmPassword}
              onChange={(e) =>
                setRegisterInfo({
                  ...registerInfo,
                  confirmPassword: e.target.value,
                })
              }
            />

            {alerts.map((el) => {
              if (el.error === error.text) {
                return (
                  <p className="error-alert" key={el.text}>
                    {el.text}
                  </p>
                )
              }
            })}

            <h1 className="register-button" onClick={register}>
              Регистрация
            </h1>

            <button
              className="back-account-button"
              onClick={() => setIsRegistering(false)}
            >
              Вернуться
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              value={email}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              value={password}
              placeholder="Пароль"
            />

            <button className="sign-in" onClick={signIn}>
              Войти
            </button>
            <button
              className="create-account-button"
              onClick={() => setIsRegistering(true)}
            >
              Зарегистрироваться
            </button>

            {alerts.map((el) => {
              if (el.error === error.text) {
                return (
                  <p className="error-alert" key={el.text}>
                    {el.text}
                  </p>
                )
              }
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default Register
