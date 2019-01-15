<template>
<div @click="lockScreen">
  <el-tooltip content="锁屏" placement="bottom">
    <i class="icon-lock"></i>
  </el-tooltip>
</div>
</template>

<script>
const setLockBackSize = () => {
  let x = document.body.clientWidth;
  let y = document.body.clientHeight;
  let r = Math.sqrt(x * x + y * y);
  return parseInt(r);
};
export default {
  // name: 'lockScreen',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    let lockScreenBack;
    if (!document.getElementById('lock_screen_back')) {
      let lockdiv = document.createElement('div');
      lockdiv.setAttribute('id', 'lock_screen_back');
      lockdiv.setAttribute('class', 'lock-screen-back');
      document.body.appendChild(lockdiv);
      lockScreenBack = document.getElementById('lock_screen_back');
      window.addEventListener('resize', () => {
        let size = setLockBackSize();
        this.lockScreenSize = size;
        lockScreenBack.style.transition = 'all 0s';
        lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
      });
    } else {
      lockScreenBack = document.getElementById('lock_screen_back');
    }
    let size = setLockBackSize();
    this.lockScreenSize = size;
    lockScreenBack.style.transition = 'all 3s';
    lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
  },
  methods: {
    lockScreen() {
      let lockScreenBack = document.getElementById('lock_screen_back');
      lockScreenBack.style.transition = 'all 3s';
      lockScreenBack.style.zIndex = 10000;
      lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset';
      this.showUnlock = true;
      // Cookies.set('last_page_name', this.$route.name); // 本地存储锁屏之前打开的页面以便解锁后打开
      localStorage.last_page_name = this.$route.name
      setTimeout(() => {
        lockScreenBack.style.transition = 'all 0s';
        this.$router.push({
          name: 'locking'
        });
      }, 800);
      // Cookies.set('locking', '1');
      localStorage.locking = 1
    }
  }
};
</script>
<style>
.lock-screen-back{
    border-radius: 50%;
    z-index: -1;
    box-shadow: 0 0 0 0 #667aa6 inset;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    transition: all 3s;
}
</style>
