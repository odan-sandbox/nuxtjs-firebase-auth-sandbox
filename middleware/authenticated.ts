import { Middleware } from '@nuxt/types'

const middleware: Middleware = ({ req, redirect, beforeNuxtRender }) => {
  if (process.client) {
    return
  }
  const user = (req as any).user

  if (!user) {
    redirect('/')
    return
  }
  beforeNuxtRender(({ nuxtState }) => {
    nuxtState.user = user
  })
}

export default middleware
