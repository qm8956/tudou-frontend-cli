<template>
  <div class="w-100 d-flex flex-column">
    <el-form :inline="true" class="demo-form-inline" size="mini">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData3"
      style="width: 100%"
      height="500">
      <el-table-column
        fixed
        label="序号"
        type=index
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        fixed
        prop="date"
        label="日期"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        align="center"
        width="120">
      </el-table-column>
    </el-table>
    <el-pagination
      class="text-center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "search-list",
  title: "查询列表",
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData3: [{
         date: '2016-05-03',
         name: '王小虎',
         province: '上海',
         city: '普陀区',
         address: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
       }, {
         date: '2016-05-02',
         name: '王小虎',
         province: '上海',
         city: '普陀区',
         address: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
       }, {
         date: '2016-05-04',
         name: '王小虎',
         province: '上海',
         city: '普陀区',
         address: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
       }],
      currentPage4: 4
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
