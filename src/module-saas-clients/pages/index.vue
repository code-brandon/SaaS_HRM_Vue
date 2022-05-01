<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!--elementui的table组件
          data：数据模型
         -->
        <el-table :data="dataList" border style="width:100%">
            <!--el-table-column : 构造表格中的每一列
              prop： 数组中每个元素对象的属性名
            -->
          <el-table-column fixed type="index" label="序号" width="50">

          </el-table-column>
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            label="公司名称">
          </el-table-column>
          <el-table-column
            prop="managerId"
            header-align="center"
            align="center"
            label="企业登录账号ID">
          </el-table-column>
          <el-table-column
            prop="version"
            header-align="center"
            align="center"
            label="当前版本">
          </el-table-column>
          <el-table-column
            prop="renewalDate"
            header-align="center"
            align="center"
            label="续期时间">
          </el-table-column>
          <el-table-column
            prop="expirationDate"
            header-align="center"
            align="center"
            label="到期时间">
          </el-table-column>
          <el-table-column
            prop="companyArea"
            header-align="center"
            align="center"
            label="公司地区">
          </el-table-column>
          <el-table-column
            prop="companyAddress"
            header-align="center"
            align="center"
            label="公司地址">
          </el-table-column>
          <el-table-column
            prop="businessLicenseId"
            header-align="center"
            align="center"
            label="营业执照-图片ID">
          </el-table-column>
          <el-table-column
            prop="legalRepresentative"
            header-align="center"
            align="center"
            label="法人代表">
          </el-table-column>
          <el-table-column
            prop="companyPhone"
            header-align="center"
            align="center"
            label="公司电话">
          </el-table-column>
          <el-table-column
            prop="mailbox"
            header-align="center"
            align="center"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="companySize"
            header-align="center"
            align="center"
            label="公司规模">
          </el-table-column>
          <el-table-column
            prop="industry"
            header-align="center"
            align="center"
            label="所属行业">
          </el-table-column>
          <el-table-column
            prop="remarks"
            header-align="center"
            align="center"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="auditState"
            header-align="center"
            align="center"
            label="审核状态">
          </el-table-column>

          <el-table-column
            prop="balance"
            header-align="center"
            align="center"
            label="当前余额">
          </el-table-column>
          <el-table-column
            prop="createTime"
            header-align="center"
            align="center"
            label="创建时间">
          </el-table-column>
          <el-table-column fixed="right" prop="state" label="状态"  width="150">
            <!--scope:传递当前行的所有数据 -->
            <template slot-scope="scope">
            <!--开关组件
                active-value：激活的数据值
                active-color：激活的颜色
                inactive-value：未激活
                inactive-color：未激活的颜色
              -->
            <el-switch
                v-model="scope.row.state"
                inactive-value="0"
                active-value="1"
                disabled
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <router-link :to="'/saas-clients/details/'+scope.row.id">查看</router-link>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
     </div>
  </div>
</template>

<script>
import {list} from '@/api/base/saasClient'
export default {
  name: 'saas-clients-index',
  data () {
    return {
      query: {
        page: 1,
        limit: 10
      },
      dataList: []
    }
  },
  methods: {
    getList() {
      // 调用API发起请求
      // res=响应数据
      list(this.query).then(res => {
        this.dataList = res.data.data.page.list
      })
    }
  },
  // 创建完毕状态
  created() {
    this.getList()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
