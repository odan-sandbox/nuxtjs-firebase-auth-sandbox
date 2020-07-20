import { Middleware } from '@nuxt/types'

const middleware: Middleware = ({ req, redirect, beforeNuxtRender }) => {
  if (process.client) {
    console.log('poyo')
    console.log((window as any).__NUXT__)
    return
  }
  console.log('middleware', new Date())
  const user = (req as any).user

  if (!user) {
    redirect('/')
    return
  }
  beforeNuxtRender(({ nuxtState }) => {
    nuxtState.user = user
  })
  console.log('poyo', (req as any).user)
}

export default middleware
