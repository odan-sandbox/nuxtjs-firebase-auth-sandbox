<template>
  <div class="container">
    <button @click="signup">
      signup
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    async signup () {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      const { user } = await this.$firebase.auth().signInWithPopup(provider)
      if (!user) { return }

      const idToken = await user.getIdToken()

      await this.$axios.post('/api/signup', { idToken })

      await this.$firebase.auth().signOut()

      await this.$axios.get('/api/hello')
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
