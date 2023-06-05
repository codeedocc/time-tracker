import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

function Login() {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/time-tracker/dom')
    } catch (err) {
      setErr(true)
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">TALK</span>
        <span className="title">Авторизация</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Пароль"></input>
          <button>Войти</button>
          {err && <span>Вы ввели неверные данные...</span>}
          <p>
            Нет аккаунта?{' '}
            <Link to="/time-tracker/register">Зарегистрироваться</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
