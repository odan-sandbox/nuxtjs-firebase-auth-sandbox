import express, { CookieOptions } from 'express'
import admin from 'firebase-admin'

const serviceAccount = require('../nuxt-firebase-auth-sandbox-firebase-adminsdk-2ulff-70db83095e.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const app = express()

app.use(express.json())

app.get('/hello', (req, res) => {
  console.log(req.cookies)
  res.send('hello')
})

app.post('/signup', (req, res) => {
  console.log(req.body)
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
