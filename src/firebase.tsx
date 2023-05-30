import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_SECRET_KEY,
  authDomain: 'time-tracker-940e9.firebaseapp.com',
  projectId: 'time-tracker-940e9',
  storageBucket: 'time-tracker-940e9.appspot.com',
  messagingSenderId: '988383459128',
  appId: '1:988383459128:web:fb071932db117eb0e633cd',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
