<template>
  <div class="flex-row">
    <el-select v-model="pCode" ref="province" @change="changeProvince" placeholder="省" class="flex-all" style="width: 32%;" v-validate="'required'" name="companyNature">
      <el-option
        v-for="item in province"
        :filterable="true"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
    <el-select v-model="cCode" placeholder="市" @change="changeCity" ref="city" class="flex-all" style="width: 32%;" v-validate="'required'" name="companyNature">
      <el-option
        v-for="item in city"
        :filterable="true"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
    <el-select v-model="aCode" placeholder="区/县" ref="area" @change="changeArea" class="flex-all" style="width: 32%;" v-validate="'required'" name="companyNature">
      <el-option
        v-for="item in area"
        :filterable="true"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import pca from '@/libs/pca-code'
export default {
  name: "city-cascader",
  title: "城市级联",
  props: {
    provinceCode: {},
    cityCode: {},
    areaCode: {},
    value: {}
  },
  data () {
    return {
      str: '',
      pCode: '',
      cCode: '',
      aCode: ''
    }
  },
  mounted () {
    this.str = this.value
    this.pCode = this.provinceCode
    this.cCode = this.cityCode
    this.aCode = this.areaCode

  },
  computed: {
    province () {
      return pca
    },
    city () {
      return this.province && this.pCode.length > 0 ? this.province.find(item => item.code === this.pCode).children : []
    },
    area () {
      return this.city && this.cCode.length > 0 ? this.city.find(item => item.code === this.cCode).children : []
    },
  },
  methods: {
    changeProvince(val) {
      // 省重新选择将市，县都清空
      this.cCode = ''
      this.aCode = ''
      this.$emit('update:provinceCode', val)
      this.$emit('update:cityCode', '')
      this.$emit('update:areaCode', '')

      this.$nextTick(() => {
        this.str = `${this.$refs.province.selectedLabel} `
        this.$emit('input', this.str)
      })
    },
    changeCity (val) {
      // 市重新选择将县清空
      this.aCode = ''
      this.$emit('update:cityCode', val)
    
      this.$nextTick(() => {
        this.str = `${this.$refs.province.selectedLabel} ${this.$refs.city.selectedLabel} `
        this.$emit('input', this.str)
      })
      
    },
    changeArea (val) {
      this.$emit('update:areaCode', val)
      
      this.$nextTick(() => {
        this.str = `${this.$refs.province.selectedLabel} ${this.$refs.city.selectedLabel} ${this.$refs.area.selectedLabel}`
        this.$emit('input', this.str)
      })
    },
    clearAll () {
      this.pCode = ''
      this.cCode = ''
      this.aCode = ''
    }
  },
  watch: {
    'provinceCode' (val) {
      this.pCode = val
    },
    'cityCode' (val) {
      this.cCode = val
    },
    'areaCode' (val) {
      this.aCode = val
    }
  }
}
</script>
