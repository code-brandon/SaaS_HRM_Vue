<template>
  <div class="detailBox">
    <div class="detailTop">
      <div>
        <img src="./../../assets/img.jpeg" width="100" height="100" alt />
      </div>
      <div>
        <b>{{sizeForm.username}}</b>
        <span :class="dutyStatus?'job-txt-green':'job-txt-red'">{{dutyStatusTxt}}</span>
        <br />
        <p>
          <span>最新工资基数 {{sizeForm.salaryBase}}  </span>
          &emsp;&emsp;
          <span>入职时间   {{sizeForm.timeOfEntry | dateformat('YYYY-MM-DD')}}</span>
          &emsp;&emsp;
          <span>联系电话 {{sizeForm.mobile}}</span>
        </p>
        <br />
        <p>
          本月不缴纳社保
          <el-switch v-model="isPaySocialInMonth" active-color="#13ce66" inactive-color="#ff4949"></el-switch>&emsp;&emsp;
          本月不缴纳公积金
          <el-switch
            v-model="isPayProvidentInMonth"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </p>
      </div>
    </div>
    <div class="detailContentBox">
      <el-form ref="sizeForm" :model="sizeForm" :rules="rules" label-width="100px" size="mini">
        <el-form-item label="参保城市" prop="participatingInTheCity">
          <el-select
            v-model="sizeForm.participatingInTheCity"
            value-key="id"
            placeholder="请选择参保城市"
            @change="socialSecurityCityChange"
          >
            <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社保类型" prop="socialSecurityType">
          <el-select v-model="sizeForm.socialSecurityType" placeholder="请选择社保类型">
            <el-option label="首次开户" :value="1"></el-option>
            <el-option label="非首次开户" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户籍类型" prop="householdRegistrationType">
          <el-select v-model="sizeForm.householdRegistrationType" placeholder="请选择户籍类型">
            <el-option label="本市城镇" :value="1"></el-option>
            <el-option label="本市农村" :value="2"></el-option>
            <el-option label="外阜城镇" :value="3"></el-option>
            <el-option label="外阜农村" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社保基数" prop="socialSecurityBase">
          <el-input v-model="sizeForm.socialSecurityBase" type="number" style="width:38%"></el-input>（基数范围是3387 ~ 25401）
        </el-form-item>
        <el-form-item label="工伤比例" prop="industrialInjuryRatio">
          <el-input v-model="sizeForm.industrialInjuryRatio" style="width:38%" type="number"></el-input>（比例范围是0.2％ ~ 3％，推荐0.2％）
        </el-form-item>
        <el-form-item label="社保缴纳">
          <el-form-item label="个人" label-width="74px" style="display:inline-block">
            <el-input
              v-model="personalPayment"
              style="width:100%"
              placeholder="个人"
              inline="true"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司" label-width="74px" style="display:inline-block">
            <el-input
              v-model="companyPayment"
              style="width:100%"
              placeholder="企业"
              size="small"
              inline="true"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-table :data="computePaymentItemList">
            <div v-if="computePaymentItemList != null">
              <el-table-column label="缴费项目" prop="name"></el-table-column>
              <el-table-column label="企业基数">
                <template slot-scope="paymentItem">
                  <span v-show="paymentItem.row.switchCompany">{{sizeForm.socialSecurityBase}}</span>
                </template>
              </el-table-column>
              <el-table-column label="企业比例">
                <template slot-scope="paymentItem">
                  <span v-show="paymentItem.row.switchCompany">{{ paymentItem.row.scaleCompany }}%</span>
                </template>
              </el-table-column>
              <el-table-column label="企业缴纳">
                <template slot-scope="paymentItem">
                  <el-input
                    v-show="paymentItem.row.switchCompany"
                    :disabled="true"
                    v-model="paymentItem.row.companyPay"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="个人基数">
                <template slot-scope="paymentItem">
                  <span v-show="paymentItem.row.switchPersonal">{{sizeForm.socialSecurityBase}}</span>
                </template>
              </el-table-column>
              <el-table-column label="个人比例">
                <template slot-scope="paymentItem">
                  <span v-show="paymentItem.row.switchPersonal">{{ paymentItem.row.scalePersonal }}%</span>
                </template>
              </el-table-column>
              <el-table-column label="个人缴纳">
                <template slot-scope="paymentItem">
                  <el-input
                    v-show="paymentItem.row.switchPersonal"
                    :disabled="true"
                    v-model="paymentItem.row.personalPay"
                  ></el-input>
                </template>
              </el-table-column>
            </div>
          </el-table>
        </el-form-item>
        <el-form-item label="社保备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="1-300字符"
            maxlength="300"
            v-model="sizeForm.socialSecurityNotes"
            style="width:38%"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="公积金城市" prop="providentFundCity">
          <el-select v-model="sizeForm.providentFundCity" placeholder="请选择公积金城市" value-key="id">
            <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公积金基数" prop="providentFundBase">
          <el-input v-model="sizeForm.providentFundBase" style="width:38%" type="number"></el-input>（基数范围是2273 ~ 25401）
        </el-form-item>
        <el-form-item label="企业比例" prop="enterpriseProportion">
          <el-input
            v-model="sizeForm.enterpriseProportion"
            style="width:38%"
            placeholder="12"
            type="number"
          ></el-input>（比例范围是5％ ~ 12％，推荐12％ ）
        </el-form-item>
        <el-form-item label="个人比例" prop="personalProportion">
          <el-input
            v-model="sizeForm.personalProportion"
            style="width:38%"
            placeholder="12"
            type="number"
          ></el-input>（比例范围是5％ ~ 12％，推荐12％ ）
        </el-form-item>
        <el-form-item label="公积金缴纳">
          <el-form-item
            label="个人"
            label-width="50px"
            style="display:inline-block"
            prop="personalProvidentFundPayment"
          >
            <el-input
              v-model="sizeForm.personalProvidentFundPayment"
              style="width:100%"
              placeholder="个人"
              inline="true"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="公司"
            label-width="50px"
            style="display:inline-block"
            prop="enterpriseProvidentFundPayment"
          >
            <el-input
              v-model="sizeForm.enterpriseProvidentFundPayment"
              style="width:100%"
              placeholder="企业"
              inline="true"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item style="display:inline-block">
            <span>（为自动测算结果，可手动调整）</span>
          </el-form-item>
        </el-form-item>
        <el-form-item label="公积金备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="1-300字符"
            v-model="sizeForm.providentFundNotes"
            style="width:38%"
            maxlength="300"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit()">保存更新</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { cityList as getCityList } from '@/api/base/baseApi'
import { paymentItemList as getPaymentItemList, saveContent, getContent } from '@/api/hrm/socialSecuritys'

export default {
  name: 'detailSocial',
  data() {
    var validateSocialSecurityBase = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入社保基数'))
      } else if (value < 3387 || value > 25401) {
        callback(new Error('请不要超出范围，基数范围是3387 ~ 25401'))
      } else {
        callback()
      }
    }
    var validateIndustrialInjuryRatio = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入工伤比例'))
      } else if (value < 0.2 || value > 3) {
        callback(new Error('请不要超出范围，比例范围是0.2％ ~ 3％'))
      } else {
        callback()
      }
    }
    var validateProvidentFundBase = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入公积金基数'))
      } else if (value < 2273 || value > 25401) {
        callback(new Error('请不要超出范围，基数范围是2273 ~ 25401'))
      } else {
        callback()
      }
    }
    var validateEnterpriseProportion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入企业比例'))
      } else if (value < 5 || value > 12) {
        callback(new Error('请不要超出范围，比例范围是5％ ~ 12％'))
      } else {
        callback()
      }
    }
    var validatePersonalProportion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入个人比例'))
      } else if (value < 5 || value > 12) {
        callback(new Error('请不要超出范围，比例范围是5％ ~ 12％'))
      } else {
        callback()
      }
    }
    return {
      city: {},
      sizeForm: {},
      cityList: [],
      paymentItemList: [],
      personalPayment: 0.0,
      companyPayment: 0.0,
      isPaySocialInMonth: false,
      isPayProvidentInMonth: false,
      rules: {
        participatingInTheCity: [
          { required: true, message: '请选择参保城市', trigger: 'change' }
        ],
        socialSecurityType: [
          { required: true, message: '请选择社保类型', trigger: 'change' }
        ],
        householdRegistrationType: [
          { required: true, message: '请选择户籍类型', trigger: 'change' }
        ],
        socialSecurityBase: [
          {
            required: true,
            validator: validateSocialSecurityBase,
            trigger: 'blur'
          }
        ],
        industrialInjuryRatio: [
          {
            required: true,
            validator: validateIndustrialInjuryRatio,
            trigger: 'blur'
          }
        ],
        providentFundCity: [
          { required: true, message: '请选择公积金城市', trigger: 'change' }
        ],
        providentFundBase: [
          {
            required: true,
            validator: validateProvidentFundBase,
            trigger: 'blur'
          }
        ],
        enterpriseProportion: [
          {
            required: true,
            validator: validateEnterpriseProportion,
            trigger: 'blur'
          }
        ],
        personalProportion: [
          {
            required: true,
            validator: validatePersonalProportion,
            trigger: 'blur'
          }
        ],
        enterpriseProvidentFundPayment: [
          {
            required: true,
            message: '请输入公司公积金缴纳数额',
            trigger: 'change'
          }
        ],
        personalProvidentFundPayment: [
          {
            required: true,
            message: '请输入个人公积金缴纳数额',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    dutyStatusTxt() {
      return this.sizeForm.inServiceStatus == 1 ? '在职' : '离职'
    },
    dutyStatus() {
      return this.sizeForm.inServiceStatus == 1
    },
    computePaymentItemList() {
      let personalTotal = Number(0)
      let companyTotal = Number(0)
      if (this.paymentItemList == null) {
        return []
      }

      this.paymentItemList.forEach(item => {
        if (item.name == '工伤' && item.switchCompany) {
          item.scaleCompany = this.sizeForm.industrialInjuryRatio
        }
        if (item.switchCompany) {
          item.companyPay = parseFloat(
            (this.sizeForm.socialSecurityBase * item.scaleCompany) / 100
          ).toFixed(2)
          companyTotal = Number(companyTotal + Number(item.companyPay))
        }
        if (item.switchPersonal) {
          item.personalPay = parseFloat(
            (this.sizeForm.socialSecurityBase * item.scalePersonal) / 100
          ).toFixed(2)
          personalTotal = Number(personalTotal + Number(item.personalPay))
        }
      })
      this.personalPayment = parseFloat(personalTotal).toFixed(2)
      this.companyPayment = parseFloat(companyTotal).toFixed(2)
      return this.paymentItemList
    },
    computeEnterpriseProvidentFundPayment() {
      return parseFloat(
        (this.sizeForm.enterpriseProportion * this.sizeForm.providentFundBase) /
          100
      ).toFixed(2)
    },
    computePersonalProvidentFundPayment() {
      return parseFloat(
        (this.sizeForm.personalProportion * this.sizeForm.providentFundBase) /
          100
      ).toFixed(2)
    }
  },
  watch: {
    'sizeForm.providentFundBase': function() {
      this.changeProvidentFundPayment()
    },
    'sizeForm.enterpriseProportion': function() {
      this.changeProvidentFundPayment()
    },
    'sizeForm.personalProportion': function() {
      this.changeProvidentFundPayment()
    },
    'sizeForm.enterprisesPaySocialSecurityThisMonth': function() {
      this.isPaySocialInMonth = this.sizeForm.enterprisesPaySocialSecurityThisMonth == 1
    },
    'sizeForm.enterprisesPayTheProvidentFundThisMonth': function() {
      this.isPayProvidentInMonth = this.sizeForm.enterprisesPayTheProvidentFundThisMonth == 1
    }
  },
  methods: {
    onSubmit() {
      this.saveData()
    },
    socialSecurityCityChange(obj) {
      this.city = obj
      this.initPaymentItem(obj)
    },
    async saveData() {
      this.sizeForm.enterprisesPaySocialSecurityThisMonth = this.isPaySocialInMonth ? 1 : 0
      this.sizeForm.enterprisesPayTheProvidentFundThisMonth = this.isPayProvidentInMonth ? 1 : 0
      this.sizeForm.userId = this.sizeForm.userId
      var cCity = this.city
      var fCity = this.city
      this.sizeForm.participatingInTheCity = cCity.name
      this.sizeForm.participatingInTheCityId = cCity.id
      this.sizeForm.providentFundCity = fCity.name
      this.sizeForm.providentFundCityId = fCity.id
      console.log(this.sizeForm)
      const { data: saveRes } = await saveContent(this.sizeForm)
      this.$router.back(-1)
    },
    async init() {
      // 城市列表获取
      const { data: cityRes } = await getCityList({})
      this.cityList = cityRes.data.list
      // 详情
      const { data: dataRes } = await getContent(this.sizeForm)
      this.sizeForm = dataRes.data
      this.sizeForm.userId = this.$route.params.id
      const city = {}
      city.name = this.sizeForm.participatingInTheCity
      city.id = this.sizeForm.participatingInTheCityId
      if (city != null) {
        this.initPaymentItem(city)
      }
    },
    async initPaymentItem(city) {
      // 社保-城市与缴费项目
      const { data: paymentItemRes } = await getPaymentItemList(city)
      this.paymentItemList = paymentItemRes.data
    },
    changeProvidentFundPayment() {
      this.sizeForm.enterpriseProvidentFundPayment = parseFloat(
        (this.sizeForm.enterpriseProportion * this.sizeForm.providentFundBase) /
          100
      ).toFixed(2)
      this.sizeForm.personalProvidentFundPayment = parseFloat(
        (this.sizeForm.personalProportion * this.sizeForm.providentFundBase) /
          100
      ).toFixed(2)
    }
  },
  mounted() {},
  created: function() {
    this.sizeForm.userId = this.$route.params.id
    this.init()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detailBox {
  margin: 20px;
  .detailTop {
    background: #fff;
    padding: 15px;
    display: flex;
    img {
      border-radius: 50%;
      margin-right: 40px;
      box-shadow: 1px 2px 4px #cccccc;
    }
  }
  .detailContentBox {
    margin: 15px 0;
    padding: 15px;
    background: #fff;
  }
}
.job-txt-green,
.job-txt-red {
  display: inline-block;
  padding: 3px;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
}
.job-txt-green {
  background: #67c23a;
  //   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.job-txt-red {
  //   padding: 20px;
  background: #f56c6c;
  //   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
