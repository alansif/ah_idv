<template>
    <div class="infoframe">
        <div class="infohead">
            <div style="margin-left:32px">
                基础信息
            </div>
        </div>
        <el-form ref="form" :model="form" label-width="80px" class="infoform">
            <el-form-item label="姓名">
                <el-input :readonly="true" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input :readonly="true" v-model="form.idnumber"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input :readonly="true" v-model="form.gender"></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-input :readonly="true" v-model="form.dateofbirth"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input :readonly="true" v-model="age"></el-input>
            </el-form-item>
        </el-form>
        <div style="text-align:center">
        <el-button type="primary" @click="nextstep">下一步</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'info',
        data() {
            return {
                form: {
                    name: '',
                    idnumber: '',
                    gender: '',
                    dateofbirth: ''
                },
				birth:new Date()
            }
        },
		mounted() {
			this.form.name = this.$root.user.UserName;
			this.form.idnumber = this.$root.user.PaperValue;
			this.form.gender = this.$root.user.Sex;
			this.form.dateofbirth = '1991-04-3';
			if (this.form.idnumber.length === 18) {
				const bd = this.form.idnumber.slice(6, 14);
				this.birth = moment(bd, "YYYYMMDD")
				this.form.dateofbirth = moment(this.birth).format('YYYY-MM-DD');
			}
		},
        computed: {
            age() {
                let age = 0;
                let birthDate = new Date(this.birth);
                if (birthDate) {
                    const today = new Date();
                    age = today.getFullYear() - birthDate.getFullYear();
                    let m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
                    {
                        age--;
                    }
                }
                return age;
            }
        },
		methods: {
            nextstep() {
                this.$root.gender = this.form.gender === '男' ? '01' : '10';
                this.$router.push('tds');
            }
		}
    }
</script>

<style>
    .infoframe {
        position: relative;
        height: 470px;
        width:800px;
        margin:0 auto;
        border-radius: 4px;
        border-left: 1px solid #ddd;
        box-shadow: 3px 3px 3px #aaa;
        background-color: white;
    }
    .infohead {
        width:100%;
        height:48px;
        line-height:48px;
        padding:0;
        color:white;
        background-color:#80A0D0;
        border-radius:4px 4px 0 0;
    }
    .infoform {
        padding: 30px 170px 10px 130px;
    }
</style>