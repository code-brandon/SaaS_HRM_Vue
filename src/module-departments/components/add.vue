<template>
    <el-dialog :title="showOrSave ? '添加部门' : '编辑部门'" :visible.sync="dialogFormVisible">
      <!-- model : 数据模型 -->
      <el-form ref="form" :model="dept" label-width="120px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="dept.name" autocomplete="off"></el-input>
        </el-form-item>
                <el-form-item label="部门编码" prop="code">
          <el-input v-model="dept.code" autocomplete="off"></el-input>
        </el-form-item>
                <el-form-item label="部门负责人" prop="manager">
          <el-input v-model="dept.manager" autocomplete="off"></el-input>
        </el-form-item>
                <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="dept.introduce" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDept">取 消</el-button>
        <el-button v-if="showOrSave" type="primary" @click="saveDept">确 定</el-button>
        <el-button v-else type="primary" @click="saveDept">修 改</el-button>
      </div>
    </el-dialog>
</template>

<script>
import {list,saveOrupdate,find,deleteById} from "@/api/base/dept"
export default {
 data () {
     return {
      //添加部门的模型
      dialogFormVisible:false,
      dept:{},
      showOrSave:false
     }
 },
  methods: {
    saveDept() {
      saveOrupdate(this.dept).then(res => {
        this.$message({
          message: res.data.message,
          type: res.data.data?'success':'error'
        });
        //保存成功
        if(res.data.data) {
          //如果成功
          location.reload();
        }
      })
    },
    cancelDept(){
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style>

</style>
