 <template>
  <div class="">
    <el-upload
      :class="classObject"
      :drag="drag"
      :file-list.sync="fileTempList"
      ref="upload"
      :list-type="listType"
      :action="action"
      :headers="{authorization: authorization}"
      :on-preview="isDisplay ? handlePictureCardPreview : null"
      :limit="limit"
      :multiple="multiple"
      :accept="accept"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :before-upload="uploadBefore"
      :on-remove="handleRemove"
      :on-exceed="onExceed"
      :http-request="fnUploadRequest"
    >
      <slot></slot>
      <slot
        name="trigger"
        slot="trigger"
      ></slot>
      <slot
        name="tip"
        slot="tip"
      ></slot>
    </el-upload>

    <viewer
      :images="images"
      @inited="inited"
      class="viewer"
      ref="viewer"
      v-show="false"
      :options="{toolbar: toolbar}"
    >
      <template slot-scope="scope">
        <span>{{scope.images}}</span>
        <img
          v-for="(src, index) in scope.images"
          :src="src"
          :key="index"
        >
      </template>
    </viewer>
  </div>
</template>

<script>
import getOss from "../../plugins/aliOss";

export default {
  name: "fileuploadali",
  title: "ali文件上传",
  props: {
    value: {},
    fileList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    action: {
      type: String,
      default: "/mscs/user/fileUpload"
    },
    accept: {
      type: String,
      default:
        "image/*, .rar, .zip,.doc, .docx, .pdf, .jpg, .png, .jpeg, .xlsx,.txt,.xlm, .xls"
    },
    listType: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    },
    drag: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 8
    },
    isDisplay: {
      type: Boolean,
      default: false
    },
    initName: {
      type: String,
      default: "initimg.png"
    },
    className: {
      type: String
    },
    maxSize: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      images: [],
      files: null,
      fileTempList: [],
      isUp: true,
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 4,
        reset: 4,
        play: {
          show: 4,
          size: "large"
        },
        rotateLeft: 4,
        rotateRight: 4,
        flipHorizontal: 4,
        flipVertical: 4
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 如果有初始值，才初始化参数，否则什么也不做
      if (this.value && this.value.length > 0) {
        this.setInit();
      }
    });
  },
  methods: {
    handleRemove(file, fileList) {
      if (this.limit === 1) {
        this.files = "";
      } else {
        this.files = [];
        fileList.forEach((item, index) => {
          if (item.response) {
            this.files[index] = {
              name: item.name,
              url: item.response.data,
              id: index + 1
            };
          } else if (!item.size) {
            // 回传数据
            this.files[index] = { name: item.name, url: item.url, id: item.id };
          }
        });
      }
    },
    handlePictureCardPreview(file) {
      let img = file.response ? file.response.data : file.url;
      let index = this.images.findIndex(item => {
        return item === img;
      });
      this.showViwer(index);
    },
    uploadSuccess(res, file, fileList) {
      // if (res.code === 1) {
      if (this.limit === 1) {
        this.files = res.data;
        this.isUp = false;
      } else {
        this.files = [];
        fileList.forEach((item, index) => {
          if (item.response) {
            this.files[index] = {
              name: item.name,
              url: item.response.data,
              id: index + 1
            };
          } else if (!item.size) {
            // 回传数据
            this.files[index] = { name: item.name, url: item.url, id: item.id };
          }
        });
        if (this.files.length >= this.limit) {
          this.isUp = false;
        }
      }
      this.$message({
        message: "文件上传成功",
        type: "success"
      });
      // }
    },
    uploadError(err, file, fileList) {
      if (err.status === 401) {
        this.$openLogin();
      } else {
        this.$message({
          showClose: true,
          message: "文件上传失败",
          type: "error"
        });
      }
    },
    uploadBefore(file) {
      let type = file.name
        .split(".")
        [file.name.split(".").length - 1].toLowerCase();
      if (file.size / 1024 / 1024 > this.maxSize) {
        this.$message({
          showClose: true,
          message: `文件不能超过${this.maxSize}M，无法上传，可以使用压缩工具将将文件压缩后再上传`,
          type: "error"
        });
        return false;
      }
      if (this.accept.includes(type)) {
        return true;
      } else {
        this.$message({
          showClose: true,
          message: "文件类型不匹配",
          type: "error"
        });
        return false;
      }
    },
    onExceed(files, fileList) {
      this.$message({
        showClose: true,
        message: `文件数量不能超过${this.limit}个`,
        type: "error"
      });
    },
    // 覆盖element原有得文件上传方案，将文件上传到阿里云
    async fnUploadRequest(option) {
      try {
        let vm = this;
        vm.disabled = true;
        // 获取OSS临时配置信息
        let client = await getOss();

        let file = option.file;
        const point = file.name.lastIndexOf(".");
        let suffix = file.name.substr(point);
        let nativeName = file.name;
        let fileNames = `mscs/${this.$formatYMD()}/${new Date().getTime()}${vm.$uuid(
          6,
          10
        )}${suffix}`;
        // 分片上传文件
        let ret = await client.multipartUpload(fileNames, file, {
          progress: async function(p, checkpoint, res) {
            // 进度百分比(0-1之间小数), 断点记录点, 单次part成功返回的response
            let e = {};
            e.percent = p * 100;
            option.onProgress(e);
          }
        });
        if (ret.res.statusCode === 200) {
          ret.data = "http://cdn.i-tudou.com/" + ret.name
          ret.name = nativeName;
          option.onSuccess(ret);
          return ret;
        } else {
          vm.disabled = false;
          option.onError("数据异常，上传失败，请刷新页面重新登录后重新上传，给您带来不便经请谅解");
        }
      } catch (error) {
        this.disabled = false;
        option.onError("数据异常，上传失败，请刷新页面重新登录后重新上传，给您带来不便经请谅解");
        if (error.response.status === 403) {
          this.$message({
            showClose: true,
            message: `数据异常，上传失败，请刷新页面重新登录后重新上传，给您带来不便经请谅解`,
            type: "error"
          });
        } else {
          this.$catchError(error);  
        }
              
      }
    },
    setInit() {
      if (this.isDisplay) {
        this.files = this.value;
        if (this.files && this.files.length > 20) {
          this.fileTempList = [{ name: this.initName, url: this.files }];
        }
      } else {
        if (this.fileList.length > 0) {
          // 如果有传入的fileList将不在重新组织数据
          this.fileTempList = [...this.fileList];
          return;
        }
        if (typeof this.value === "string" && this.value.length > 20) {
          this.fileTempList = JSON.parse(this.value);
          if (typeof this.fileList === "string") {
            this.fileTempList = JSON.parse(this.fileTempList);
          }
        } else {
          this.fileTempList = [];
          this.files = [];
        }
      }
    },
    // 浏览图片
    inited(viewer) {
      this.$viewer = viewer;
    },
    showViwer(index) {
      this.$viewer.view(index);
      this.$viewer.show();
    },
    clearFiles() {
      this.isUp = true;
      this.$refs.upload.clearFiles();
    }
  },
  watch: {
    files: {
      handler() {
        if (this.isDisplay) {
          if (this.limit === 1) {
            this.isUp = this.files === "" ? true : false;
            if (!this.isUp) {
              this.images = [this.files];
            }
          } else {
            this.isUp = this.files.length >= this.limit ? false : true;
            this.images = [];
            this.files.forEach(item => {
              this.images.push(item.url);
            });
          }
        }
        this.$emit("input", this.files);
      },
      deep: true
    },
    value(val) {
      // 当value改变，和本组件files不相等时，都认为时外界手动修改了传入的值，通过setInit将value同步到files
      if (val && val.length > 0 && val !== this.files) {
        this.setInit();
      }
    }
  },
  computed: {
    authorization() {
      return this.$store.state.user.token;
    },
    classObject() {
      // this.value < this.limit
      return this.isUp ? this.className : `${this.listType ? 'no-up' : ''} ${this.className}`;
    }
  }
};
</script>
