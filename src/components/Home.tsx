import { useEffect, useContext } from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import {
  icon_work,
  icon_play,
  icon_study,
  icon_exercise,
  icon_social,
  icon_self_care,
} from '../assets/images'
import '../styles/home.scss'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const exit = () => {
    signOut(auth).then(() => navigate('/time-tracker/'))
  }

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (!user) {
        navigate('/time-tracker/')
      }
    })
  }, [])

  return (
    <div className="wrapper">
      <div className="panel">
        <div className="menu">
          <div className="user-info">
            <img src={currentUser.photoURL} alt="" />
            <div className="text">
              <p>Сведения про</p>
              <span>
                <h1>{currentUser.displayName}</h1>
                <h1 onClick={exit}>Выйти</h1>
              </span>
            </div>
          </div>

          <div className="menu-list">
            <div className="daily-weekly-monthly">
              <p>В день</p>
              <p>В неделю</p>
              <p>В месяц</p>
            </div>
          </div>
        </div>

        <div className="statistics">
          <div className="card">
            <div className="card-image work">
              <img src={icon_work} alt="" />
            </div>

            <div className="card-info">
              <div className="info-title">
                <p>Работа</p>
                <FiMoreHorizontal className="dots" />
              </div>
              <div className="hours-result">
                <h1>32 ч.</h1>
                <p>В последнюю неделю - 36 ч.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-image play">
              <img src={icon_play} alt="" />
            </div>

            <div className="card-info">
              <div className="info-title">
                <p>Игры</p>
                <FiMoreHorizontal className="dots" />
              </div>
              <div className="hours-result">
                <h1>10 ч.</h1>
                <p>В последнюю неделю - 8 ч.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-image study">
              <img src={icon_study} alt="" />
            </div>

            <div className="card-info">
              <div className="info-title">
                <p>Учёба</p>
                <FiMoreHorizontal className="dots" />
              </div>
              <div className="hours-result">
                <h1>4 ч.</h1>
                <p>В последнюю неделю - 7 ч.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-image exercise">
              <img src={icon_exercise} alt="" />
            </div>

            <div className="card-info">
              <div className="info-title">
                <p>Тренировки</p>
                <FiMoreHorizontal className="dots" />
              </div>
              <div className="hours-result">
                <h1>4 ч.</h1>
                <p>В последнюю неделю - 5 ч.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-image social">
              <img src={icon_social} alt="" />
            </div>

            <div className="card-info">
              <div className="info-title">
                <p>Социальные сети</p>
                <FiMoreHorizontal className="dots" />
              </div>
              <div className="hours-result">
                <h1> 5 ч.</h1>
                <p>В последнюю неделю - 10 ч.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-image self-care">
              <img src={icon_self_care} alt="" />
            </div>

            <div className="card-info">
              <div className="info-title">
                <p>Здоровье</p>
                <FiMoreHorizontal className="dots" />
              </div>
              <div className="hours-result">
                <h1>2 ч.</h1>
                <p>В последнюю неделю - 2 ч.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
