import firebase from 'firebase'
import 'firebase/auth'
import { Plugin } from '@nuxt/types'

const firebaseConfig = {
  apiKey: 'AIzaSyD70nSkuDJ7sybsHZzyUSTldv0QeKGF2HI',
  authDomain: 'nuxt-firebase-auth-sandbox.firebaseapp.com',
  databaseURL: 'https://nuxt-firebase-auth-sandbox.firebaseio.com',
  projectId: 'nuxt-firebase-auth-sandbox',
  storageBucket: 'nuxt-firebase-auth-sandbox.appspot.com',
  messagingSenderId: '873132061796',
  appId: '1:873132061796:web:ea39d27f4295b58e1d5b71'
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
}

const plugin: Plugin = (_, inject) => {
  inject('firebase', firebase)
}

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: typeof firebase
  }
}

export default plugin
