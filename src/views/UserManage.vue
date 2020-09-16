<template>
  <div>
    <div style="margin-top:50px;">
      <el-input v-model="teacherName" placeholder="请输入教师姓名" style="width:80%" clearable></el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="searchTeacherByName">搜索</el-button>
      <el-button type="primary" style="margin-left:10px;margin-bottom: 20px;" @click="showDialog">新增教师</el-button>
    </div>
    <div>
      <el-table
          @selection-change="handleSelectionChange"
          :data="teachers"
          border>
        <el-table-column
            fixed
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            fixed
            prop="uid"
            label="课程编号"
            width="80" >
        </el-table-column>
        <el-table-column fixed
                         prop="name"
                         label="课程名称"
                         width="80">
        </el-table-column>
<!--        <el-table-column-->
<!--            prop="sex"-->
<!--            label="性别"-->
<!--            width="40">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="age"-->
<!--            label="年龄"-->
<!--            width="40">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="school"-->
<!--            label="学校"-->
<!--            width="120">-->
<!--        </el-table-column>-->
        <el-table-column
            prop="college"
            label="学院"
            width="340">
        </el-table-column>
        <el-table-column
            prop="post"
            label="任课老师"
            width="80">
        </el-table-column>
        <el-table-column
            prop="address"
            label="任课地点"
            width="180">
        </el-table-column>
        <el-table-column
            prop="telnum"
            label="选课人数"
            width="80">
        </el-table-column>
        <el-table-column
            prop="wechat"
            label="剩余人数"
            width="80">
        </el-table-column>
<!--        <el-table-column-->
<!--            prop="qq"-->
<!--            label="qq"-->
<!--            width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="email"-->
<!--            label="电子邮箱"-->
<!--            width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="background"-->
<!--            label="学历"-->
<!--            width="80">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="entry"-->
<!--            label="入职日期"-->
<!--            width="120">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="relation"-->
<!--            label="婚姻状况"-->
<!--            width="100">-->
<!--          <template slot-scope="scope">-->
<!--            <template v-if="scope.row.relation=='1'">单身</template>-->
<!--            <template v-else-if="scope.row.relation=='2'">已婚</template>-->
<!--            <template v-else-if="scope.row.relation=='3'">离异</template>-->
<!--            <template v-else-if="scope.row.relation=='4'">丧偶</template>-->
<!--            <template v-else>无</template>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="children"-->
<!--            label="有无子女"-->
<!--            width="100">-->
<!--          <template slot-scope="scope">-->
<!--            <template v-if="scope.row.children=='true'">有</template>-->
<!--            <template v-else>无</template>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="linkman"-->
<!--            label="联系人电话"-->
<!--            width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="birthday"-->
<!--            label="出生日期"-->
<!--            width="120">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="favorite"-->
<!--            label="爱好"-->
<!--            width="180">-->
<!--        </el-table-column>-->
        <el-table-column
            prop="assessment"
            label="图片地址"
            width="180">
        </el-table-column>
        <el-table-column
            label="操作"
            align="left"
            width="180">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="mini" style="margin-top: 12px" :disabled="multipleSelection.length === 0" @click="deleteTeachers">批量删除</el-button>
    </div>
    <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogFormVisible" center>
      <el-form :model="form" :rules="rules" ref="teacher">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-slider v-model.number="form.age" show-input></el-slider>
        </el-form-item>
        <el-form-item label="学校" :label-width="formLabelWidth" prop="school">
          <el-select v-model="form.school" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in school"
                :key="item.value"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院" :label-width="formLabelWidth" prop="college">
          <el-select v-model="form.college" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in college"
                :key="item.value"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称" :label-width="formLabelWidth" prop="post">
          <el-select v-model="form.post" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in post"
                :key="item.value"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家庭地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model.number="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" prop="telnum">
          <el-input v-model.number="form.telnum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信" :label-width="formLabelWidth" prop="wechat">
          <el-input v-model.number="form.wechat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ" :label-width="formLabelWidth" prop="qq">
          <el-input v-model.number="form.qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" :label-width="formLabelWidth" prop="email">
          <el-input v-model.number="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学历" :label-width="formLabelWidth" prop="background">
          <el-select v-model="form.background" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in background"
                :key="item.value"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职日期" :label-width="formLabelWidth" prop="entry">
          <el-date-picker
              v-model="form.entry"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="婚姻状况" :label-width="formLabelWidth" prop="relation">
          <template>
            <el-radio-group v-model="form.relation">
              <el-radio :label="1">单身</el-radio>
              <el-radio :label="2">已婚</el-radio>
              <el-radio :label="3">离异</el-radio>
              <el-radio :label="4">丧偶</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="有无子女" :label-width="formLabelWidth" prop="children">
          <el-switch
              v-model="form.children"
              active-color="#409eff"
              inactive-color="#dcdfe6"
              active-text="有"
              inactive-text="无">
          </el-switch>
        </el-form-item>
        <el-form-item label="联系人电话" :label-width="formLabelWidth" prop="linkman">
          <el-input v-model.number="form.linkman" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthday">
          <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="爱好" :label-width="formLabelWidth" prop="favorite">
          <el-checkbox-group v-model="form.favorite">
            <el-checkbox label="运动"></el-checkbox>
            <el-checkbox label="音乐"></el-checkbox>
            <el-checkbox label="舞蹈"></el-checkbox>
            <el-checkbox label="游戏"></el-checkbox>
            <el-checkbox label="看书"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="自我评价" :label-width="formLabelWidth" prop="assessment">
          <el-input type="textarea" v-model.number="form.assessment" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTeacher">确 定</el-button>
      </div>
    </el-dialog>
    <el-upload
        style="margin-top:20px;"
        action="/upload"
        multiple
        :on-success="handleSuccess"
        :limit="3"
        :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-image
        style="width: 100px; height: 100px"
        :src="url"
        :fit="fill"></el-image>
    <div v-for="(course) in teachers1">
      <el-image
          style="width: 100px; height: 100px"
          :src=course.assessment></el-image>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      fileList: [],
      teacherName: '',
      multipleSelection:[],
      dialogTitle: {
        addTeacher: "新增教师",
        editTeacher: "编辑教师"
      },
      dialogStatus: "",
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'blur'},
          { type: 'number', message: '年龄必须为数字值'}
        ],
        school: [
          { required: true, message: '请输入所在学校', trigger: 'blur' }
        ],
        college: [
          { required: true, message: '请输入所在学院', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请输入职称', trigger: 'blur' }
        ],
        telnum: [
          { required: true, message: '请输入正确的电话号码',trigger: 'blur'},
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("手机号格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        linkman: [
          { required: true, message: '至少填一个联系人电话号码',trigger: 'blur'},
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("手机号格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        entry: [
          { required: true, message: '需要填写入职日期',trigger: 'blur'},
        ],
        birthday: [
          { required: true, message: '需要填写生日',trigger: 'blur'},
        ],
        background: [
          { required: true, message: '需要填写学历',trigger: 'blur'},
        ],
        qq:[
          {validator: function(rule, value, callback){
              if (!value) {return callback(new Error('请输入账号'))

              }if (! /^[1-9][0-9]{4,9}$/gim.test(value)) {
                callback(new Error('QQ账号必须为6-10位数字组合'))
              }else{
                callback()
              }
            },
            trigger: "blur"
          }
        ],
        email: [
          {
            validator: function(rule, value, callback) {
              if (
                  /^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(
                      value
                  ) == false
              ) {
                callback(new Error("邮箱格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }],
      background: [{
        value: '1',
        label: '本科'
      }, {
        value: '2',
        label: '硕士'
      }, {
        value: '3',
        label: '博士'
      }],
      post: [{
        value: '1',
        label: '助教'
      }, {
        value: '2',
        label: '讲师'
      }, {
        value: '3',
        label: '副教授'
      }, {
        value: '4',
        label: '教授'
      }],
      college: [{
        value: '1',
        label: '数学科学学院'
      }, {
        value: '2',
        label: '音乐学院'
      }, {
        value: '3',
        label: '计算机与信息科学学院'
      },{
        value: '4',
        label: '化学学院'
      },{
        value: '5',
        label: '美术学院'
      },{
        value: '6',
        label: '经济与管理学院'
      },{
        value: '7',
        label: '马克思主义学院'
      }
      ],
      school: [{
        value: '1',
        label: '重庆大学'
      }, {
        value: '2',
        label: '重庆师范大学'
      }, {
        value: '3',
        label: '重庆邮电大学'
      },{
        value: '4',
        label: '西南大学'
      },{
        value: '5',
        label: '西南政法大学'
      },{
        value: '6',
        label: '重庆医科大学'
      },{
        value: '7',
        label: '四川美术学院'
      },{
        value: '8',
        label: '四川外国语学院'
      }
      ],
      msg: '',
      teachers:[],
      search: '',
      dialogFormVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        school:'',
        college:'',
        post:'',
        address:'',
        telnum:'',
        wechat:'',
        qq: '',
        email:'',
        background:'',
        entry:'',
        relation:'',
        children:'',
        linkman:'',
        birthday:'',
        favorite:[],
        assessment:''
      },
      formLabelWidth: '120px',
    }
  },
  created() {
    this.findAllTeachers();
  },
  watch:{
    teacherName () {
      this.findAllTeachers();
    }
  },
  methods: {
    // deleteFile (file) {
    //   console.log(file)
    // },
    handleSuccess (file) {
      const filename = file.name;
      this.$message({
        message: '文件上传成功！',
        type: 'success'
      });
    },
    searchTeacherByName () {
      if (this.teacherName !== '') {
        this.$axios.get("/teacher/findTeacherByName?name="+this.teacherName).then( (resp)=> {
          this.teachers = resp.data;
        }).catch( (error)=>{
          this.$message({
            type: 'error',
            message: "查询失败，原因是"+error.data.message
          });
        })
      }
    },
    deleteTeachers () {
      this.$confirm('此操作将永久删除教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach( (item)=>{
          ids += 'ids='+item.uid+'&'
        });
        this.$axios.post("/teacher/deleteTeachersByIds"+ids).then( (resp)=> {
          if (resp) {
            this.findAllTeachers();
            this.$message.success("删除成功！");
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    submitTeacher () {
      if (this.dialogStatus === 'addTeacher'){
        this.addTeacher();
      } else if(this.dialogStatus === "editTeacher") {
        this.editTeacher();
      }
    },
    findAllTeachers () {
      this.$axios.get("/teacher/findAllTeachers")
          .then((res) => {
            this.teachers = res.data
          })
          .catch(error => {
            this.$message({
              type: 'error',
              message: "查询失败，原因是"+error.data.message
            });
          });
    },
    handleEdit (row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "editTeacher";
      this.form.uid = row.uid;
      this.form.name = row.name;
      this.form.age = row.age;
      this.form.sex = row.sex;
      this.form.school = row.school;
      this.form.college = row.college;
      this.form.address = row.address;
      this.form.post = row.post;
      this.form.telnum = row.telnum;
      this.form.wechat = row.wechat;
      this.form.qq = row.qq;
      this.form.email = row.email;
      this.form.background = row.background;
      this.form.entry = row.entry;
      this.form.relation = row.relation;
      this.form.children = row.children;
      this.form.linkman = row.linkman;
      this.form.birthday = row.birthday;
      this.form.favorite = row.favorite.split(",");
      this.form.assessment = row.assessment;
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/teacher/deleteTeacher?uid="+row.uid).then ((resp)=>{
          this.$message.success("删除成功!")
          this.findAllTeachers();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    showDialog () {
      this.form.uid = '';
      this.form.name = '';
      this.form.age = '';
      this.form.sex = '';
      this.form.school = '';
      this.form.college = '';
      this.form.post = '';
      this.form.address = '';
      this.form.telnum = '';
      this.form.wechat = '';
      this.form.qq = '';
      this.form.email = '';
      this.form.background = '';
      this.form.entry = '';
      this.form.relation = '';
      this.form.children = '';
      this.form.linkman = '';
      this.form.birthday = '';
      this.form.favorite = [];
      this.form.assessment = '';
      this.dialogFormVisible = true;
      this.dialogStatus = "addTeacher";
    },
    // addTeacher () {
    //   this.$refs.teacher.validate((valid) => {
    //     if (valid) {
    //       this.form.favorite = this.form.favorite.join(",");
    //       this.$axios.post("/teacher/addTeacher",this.form).then( (resp)=>{
    //         if (resp) {
    //           this.dialogFormVisible = false;
    //           this.$message.success("添加成功！");
    //           this.findAllTeachers();
    //         }
    //       }).catch((error)=>{
    //         this.$message({
    //           message: '添加数据失败，原因是'+error.data.message,
    //           type: 'error'
    //         })
    //       })
    //     } else {
    //       this.$message({
    //         message: '请输入所有字段',
    //         type: 'error'
    //       })
    //       return false;
    //     }
    //   });
    // },
    addTeacher () {
      this.$refs.teacher.validate((valid) => {
        if (valid) {
          this.form.college = this.form.college.join('/')
          this.$axios.post("/teacher/addTeacher",this.form).then( (resp)=>{
            if (resp.data=="") {
              this.dialogFormVisible = false;
              this.$message.success("添加成功！");
              this.findAllTeachers();
            }else{
              let data="";
              for(let i=0; i<resp.data.length;i++){
                data+=i+1+"、    :"+resp.data[i].defaultMessage+"<br>"
              }
              this.$message({
                dangerouslyUseHTMLString:true,
                message:'添加失败，原因是: '+"<br>"+data,
                type: 'error'
              });
            }
          })
        }
      })
    },
    // editTeacher () {
    //   this.form.favorite = this.form.favorite.join(",");
    //   this.$axios.post("/teacher/updateTeacher",this.form).then( (resp)=>{
    //     this.dialogFormVisible = false;
    //     this.$message.success("修改成功!");
    //     this.findAllTeachers();
    //   }).catch( (error)=> {
    //     this.$message({
    //       message: '数据更新失败，原因是'+error.data.message,
    //       type: 'error'
    //     })
    //   })
    // }
    editTeacher () {
      this.form.college = this.form.college.join('/')
      this.$axios.post("/teacher/updateTeacher",this.form).then( (resp)=>{
        if(resp.data==""){
          this.dialogFormVisible = false;
          this.$message.success("修改成功!");
          this.findAllTeachers();
        }else{
          let data="";
          for(let i=0;i<resp.data.length;i++){
            data+=i+1+"、   :"+resp.data[i].defaultMessage+"<br>"
          }
          this.$message({
            dangerouslyUseHTMLString:true,
            message: '数据更新失败，原因是'+error.data.message,
            type: 'error'
          });
        }
      })
    }
  }
}
</script>
<style scoped>
.table {
  margin: 0 auto;
  clear: both;
}
</style>
