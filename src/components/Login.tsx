import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import time from '../assets/images/time.gif'
import '../styles/login.scss'

function Login() {
  const [err, setErr] = useState(false)

  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString()
  )

  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/time-tracker/homepage')
    } catch (err) {
      setErr(true)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/time-tracker/')
      } else if (user) {
        navigate('/time-tracker/homepage')
      }
    })
  }, [])

  return (
    <div className="formContainer">
      <div className="timer">
        <div className="timer-info">
          <img src={time} alt="Время" />
          <h1>{currentTime}</h1>
        </div>
        <div className="formWrapper">
          <p className="logo">Time Tracker</p>
          <p className="title">Авторизация</p>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Пароль"></input>
            <button>Войти</button>
            {err && <span>Вы ввели неверные данные.</span>}
            <p>
              <Link to="/time-tracker/register">Зарегистрироваться</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
