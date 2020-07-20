<template>
  <div>
    <div>my page</div>
    <div>hello {{ $user.email }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: 'authenticated'
})
</script>
