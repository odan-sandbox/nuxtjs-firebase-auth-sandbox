import express from 'express'

const app = express()

app.get('/hello', (_, res) => {
  res.send('hello')
})

function main () {
  app.listen(3001, () => console.log('http://localhost:3001'))
}

main()
