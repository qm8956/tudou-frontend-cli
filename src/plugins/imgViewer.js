import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)

let ImgInstance = Vue.extend({
  components: { Viewer },
  template: `
    <div>
      <viewer :images="[image]" @inited="inited" class="viewer" ref="viewer">
        <template slot-scope="scope">
          <span>{{scope.images}}</span>
          <img v-for="(src, index) in scope.images" :src="src" :key="index">
        </template>
      </viewer>
    </div>
  `,
  data () {
    return {
      image: null
    }
  },
  methods: {
    inited (viewer) {
      this.viewer = viewer
    },
    showImg (url) {
      this.image = url
      setTimeout(() => {
        this.viewer.show()
      }, 0)
    }
  }
})
const viwer = new ImgInstance({
  el: document.createElement('div')
})
Vue.prototype.$showImg = viwer.showImg // eslint-disable-line