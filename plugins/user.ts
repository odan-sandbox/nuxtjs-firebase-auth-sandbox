import Vue from 'vue'
import { Plugin, Context } from '@nuxt/types'

export type State = {
  email?: string
}

const state = Vue.observable<State>({ email: undefined })

function updateState (newState: State) {
  state.email = newState.email
}

function updateStateFromContext (context: Context) {
  if (process.client) {
    const user = (window as any)?.__NUXT__?.user
    // updateState({ email: 'aaa' })
    updateState({ email: user?.email })
    return
  }
  const user = (context.req as any).user
  updateState({ email: user?.email })
}

const plugin: Plugin = (context, inject) => {
  updateStateFromContext(context)
  inject('user', state)
}

declare module 'vue/types/vue' {
  interface Vue {
    $user: State
  }
}

export default plugin
