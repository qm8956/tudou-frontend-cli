<template>
  <div style="width: 100%;height: 100%;background: #667aa6">
    <div class="d-flex align-items-center justify-content-center h-100">
      <unlock @on-unlock="handleUnlock"></unlock>
    </div>
  </div>
</template>

<script>
import Unlock from './Unlock.vue' 

export default {
  components: {
    Unlock
  },
  name: "locking",
  title: "锁屏",
  data() {
    return {}
  },
  methods: {
    handleUnlock() {
      let lockScreenBack = document.getElementById('lock_screen_back')
      lockScreenBack.style.zIndex = -1
      lockScreenBack.style.boxShadow = '0 0 0 0 #667aa6 inset'
      this.$router.push({
        name: localStorage.last_page_name
      })
    }
  },
  mounted() {
    if (!document.getElementById('lock_screen_back')) {
      let lockdiv = document.createElement('div')
      lockdiv.setAttribute('id', 'lock_screen_back')
      lockdiv.setAttribute('class', 'lock-screen-back')
      document.body.appendChild(lockdiv)
    }
    let lockScreenBack = document.getElementById('lock_screen_back')
    lockScreenBack.style.zIndex = -1
  }
}
</script>
