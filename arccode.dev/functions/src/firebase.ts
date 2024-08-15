import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const app = initializeApp()

export const auth = getAuth(app)

export const firestore = getFirestore(app)

export default app
