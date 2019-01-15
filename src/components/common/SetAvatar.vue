<template>
  <div id="app">
  	<!-- <img :src="imgUrl" alt="" style="width: 60%;border-radius: 10px;" @click="toggleShow"> -->
  	<my-upload field="img"
      @crop-success="uploadOss"
      v-model="show"
  		:width="100"
  		:height="100"
  		img-format="png"></my-upload>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
import axios from 'axios'
import getOss from '../../plugins/aliOss'

export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    imgUrl: {
      type: String
    }
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    },
    cropSuccess (imgDataUrl, field) {
      // 原本从后台上传到青云上，现在直接由前台上传到ali
      var formData = new FormData()
      formData.append('file', this.convertBase64UrlToBlob(imgDataUrl))
      axios({
        url: '/mscs/user/fileUpload',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        this.$emit('upload-success', res.data.data)
      }).catch((e) => {
        this.$message({
          showClose: true,
          message: '上传失败',
          type: 'error'
        })
      })
    },
    convertBase64UrlToBlob (urlData) {
      var bytes = window.atob(urlData.split(',')[1])        // 去掉url的头，并转换为byte

    // 处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      let blob = new Blob([ab], {type: 'image/png'})
      return new File([blob], 'avatar.png')
    },
    async uploadOss (imgDataUrl, field) {
      try {
        let client = await getOss()
        let fileNames = `mscs/${this.$formatYMD()}/${new Date().getTime()}${this.$uuid(6, 10)}.png`
        let ret = await client.put(fileNames, this.convertBase64UrlToBlob(imgDataUrl))
        if (ret.res.statusCode === 200) {
          ret.data = 'http://cdn.i-tudou.com/' + ret.name
          this.$emit('upload-success', ret.data)
        } else {
          this.$message({
            showClose: true,
            message: '上传失败',
            type: 'error'
          })
        }
      } catch (error) {
        this.$message({
          showClose: true,
          message: '上传失败',
          type: 'error'
        })
      }
    }
  },
  components: { 'my-upload': myUpload }
}
</script>
