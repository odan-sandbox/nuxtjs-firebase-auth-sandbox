import express, { CookieOptions } from 'express'
import admin from 'firebase-admin'
import cookieParser from 'cookie-parser'

const serviceAccount = require('../nuxt-firebase-auth-sandbox-firebase-adminsdk-2ulff-70db83095e.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/hello', (_, res) => {
  res.send('hello')
})

app.get('/profile', (req, res) => {
  const { session } = req.cookies

  admin.auth().verifySessionCookie(session, true)
    .then((decodedClaims) => {
      return admin.auth().getUser(decodedClaims.uid)
    })
    .then((user) => {
      res.send({ email: user.email })
    }).catch(() => {
      res.sendStatus(401)
    })
})

app.post('/signup', (req, res) => {
  const idToken = req.body.idToken.toString()
  const expiresIn = 60 * 60 * 24 * 5 * 1000

  admin.auth().createSessionCookie(idToken, { expiresIn })
    .then((sessionCookie) => {
      // Set cookie policy for session cookie.
      const options: CookieOptions = { maxAge: expiresIn, httpOnly: true, secure: false }
      res.cookie('session', sessionCookie, options)
      res.end(JSON.stringify({ status: 'success' }))
    }, (error) => {
      console.error(error)
      res.status(401).send('UNAUTHORIZED REQUEST!')
    })
})

function main () {
  app.listen(3001, () => console.log('http://localhost:3001'))
}

main()
