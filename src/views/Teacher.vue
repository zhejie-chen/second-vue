<template>
  <div >
    <div v-for="(course) in teachers">
      <div style="background:#505458;width: 440px;height: 200px;float: left;margin-right: 20px;margin-top:20px;padding: 10px;border-radius: 10px;display:flex;justify-content:space-between">
        <el-image style="width: 200px; height: 200px;float: left;border-radius: 10px" :src=course.assessment></el-image>
        <div style="flex: 1;display: flex;flex-direction:column;justify-content:space-between;overflow:hidden;padding-left: 10px;">
          <a style="color: #eaeaea;font-family:Arial;font-size:24px;text-align: center">{{course.name}}</a>
          <div style="background: gray;height: 100px;font-family: Arial;word-wrap: break-word; word-break: normal; overflow: hidden;border-radius: 10px;padding: 5px;opacity: 80%">{{course.college}}</div>
          <el-button round>加入课程</el-button>
        </div>
      </div>
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
