import { ServerMiddleware } from '@nuxt/types'
import admin from 'firebase-admin'
import Cookies from 'universal-cookie'
import axios from 'axios'

const serviceAccount = require('../nuxt-firebase-auth-sandbox-firebase-adminsdk-2ulff-70db83095e.json')

declare module 'connect' {
  export interface IncomingMessage {
     user?: {
       email: string;
     }
  }
}

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const serverMiddleware: ServerMiddleware = function (req, _, next) {
  axios.get('http://localhost:3001/profile', { headers: { cookie: req.headers.cookie } }).then(({ data }) => {
    console.log({ data })
    req.user = data
    next()
  })
    .catch((error) => {
    // Session cookie is unavailable or invalid. Force user to login.
      console.error(error)
      next()
    })
  /*
  const cookies = new Cookies(req.headers.cookie)
  const sessionCookie = cookies.get('session') || ''

  admin.auth().verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
      return admin.auth().getUser(decodedClaims.uid)
    })
    .then((user) => {
      (req as any).user = user
      next()
    })
    */
}

export default serverMiddleware
