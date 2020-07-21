import { Middleware } from '@nuxt/types'

const middleware: Middleware = ({ req, redirect, beforeNuxtRender }) => {
  if (process.client) {
    // TODO: validate frontend
    return
  }
  const user = req.user

  if (!user) {
    redirect('/')
    return
  }
  beforeNuxtRender(({ nuxtState }) => {
    nuxtState.user = user
  })
}

export default middleware
