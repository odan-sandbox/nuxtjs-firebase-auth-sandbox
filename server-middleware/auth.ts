import { ServerMiddleware } from '@nuxt/types'
import admin from 'firebase-admin'
import Cookies from 'universal-cookie'

const serviceAccount = require('../nuxt-firebase-auth-sandbox-firebase-adminsdk-2ulff-70db83095e.json')

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const serverMiddleware: ServerMiddleware = function (req, res, next) {
  const cookies = new Cookies(req.headers.cookie)
  const sessionCookie = cookies.get('session') || ''

  admin.auth().verifySessionCookie(
    sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      return admin.auth().getUser(decodedClaims.uid)
    })
    .then((user) => {
      // TODO: hydration
      return user
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      console.error(error)
    })
  next()
}

export default serverMiddleware
