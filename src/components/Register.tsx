import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db, storage } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import addAvatar from '../assets/images/addAvatar.png'
import { alerts } from '../assets/const'
import '../styles/register.scss'

function Register() {
  const [errorPassword, setErrorPassword] = useState('')
  const [errorPicture, setErrorPicture] = useState('')
  const [error, setError] = useState<Alert>({
    boolean: false,
    text: '',
  })
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const displayName = (form.elements[0] as HTMLInputElement).value
    const email = (form.elements[1] as HTMLInputElement).value
    const password = (form.elements[2] as HTMLInputElement).value
    const passwordAgain = (form.elements[3] as HTMLInputElement).value
    const file = (form.elements[4] as HTMLInputElement).files?.[0]

    setErrorPassword('')
    setErrorPicture('')
    setError({ boolean: false, text: '' })

    if (password !== passwordAgain) {
      setErrorPassword('Пароли не совпадают')
      return
    }

    if (file === undefined) {
      setErrorPicture('Пожалуйста, выберите аватарку')
      return
    }

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password)

      //Create a unique image name
      const storageRef = ref(storage, displayName)

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })

            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })

            //create empty user chats on firestore
            await setDoc(doc(db, 'usersInfo', res.user.uid), {})
            navigate('/time-tracker/dom')
          } catch (err: any) {
            setError({ boolean: true, text: err.code })
          }
        })
      })
    } catch (err: any) {
      setError({ boolean: true, text: err.code })
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Time Tracker</span>
        <span className="title">Регистрация</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Никнейм"></input>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Пароль"></input>
          <input type="password" placeholder="Повторите пароль"></input>
          <input style={{ display: 'none' }} type="file" id="file"></input>
          <label htmlFor="file">
            <img src={addAvatar} alt="img for register"></img>
            <span>Выбрать аватарку</span>
          </label>
          <button>Зарегистрироваться</button>
          <p>
            Уже есть аккаунт? <Link to="/time-tracker/">Войти</Link>
          </p>

          {alerts.map((el: any) => {
            if (el.error === error.text) {
              return (
                <p className="error-alert" key={el.text}>
                  {el.text}
                </p>
              )
            } else if (errorPassword === el.error) {
              return (
                <p className="error-alert" key={el.text}>
                  {el.text}
                </p>
              )
            } else if (errorPicture === el.error) {
              return (
                <p className="error-alert" key={el.text}>
                  {el.text}
                </p>
              )
            }
          })}
        </form>
      </div>
    </div>
  )
}

export default Register
