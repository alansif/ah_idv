<template>
    <div class="loginframe">
        <div class="loginhead">
            <div style="margin-left:32px">
                登录
            </div>
        </div>
        <el-form ref="form" :model="form" label-width="80px" class="loginform">
            <el-form-item label="证件号码">
                <el-input v-model="form.idnumber"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input v-model="form.vcode" style="width:200px;margin-right:8px;"></el-input>
				<el-button type="primary" @click="sendvcode">发送验证码</el-button>
            </el-form-item>
        </el-form>
        <div style="text-align:center">
        <el-button type="primary" @click="dologin">登录</el-button>
        </div>
    </div>
</template>

<script>
    import {restbase} from '../rest'
    export default {
        name: 'login',
        data() {
            return {
                form: {
                    idnumber: '',
                    phone: '',
                    vcode: ''
                }
            }
        },
		methods: {
			sendvcode() {
                this.$http.post(restbase() + "asp/SendVerifyInfo", {
                    SFZH: this.form.idnumber,
                    Phone: this.form.phone
                }).then((response) => {
                    // eslint-disable-next-line
                    console.log(response);
                }, (response) => {
                    // eslint-disable-next-line
                    console.log(response);
                }).catch((response) => {
                    // eslint-disable-next-line
                    console.log(response);
                });
			},
            dologin() {
                this.$http.post(restbase() + "asp/GetLoginInfo", {
                    PaperValue: this.form.idnumber,
                    Mobile: this.form.phone,
                    PWD: this.form.vcode
                }).then((response) => {
					const j = JSON.parse(response.data.d);
					const d = j;
					this.$root.user = d;
                    // eslint-disable-next-line
                    console.log(this.$root.user);
					this.$router.push('info');
                }, (response) => {
                    // eslint-disable-next-line
                    console.log(response);
                }).catch((response) => {
                    // eslint-disable-next-line
                    console.log(response);
                });
            }
		}
    }
</script>

<style>
    .loginframe {
        position: relative;
        height: 370px;
        width:500px;
        margin:0 auto;
        border-radius: 4px;
        border-left: 1px solid #ddd;
        box-shadow: 3px 3px 3px #aaa;
        background-color: white;
    }
    .loginhead {
        width:100%;
        height:48px;
        line-height:48px;
        padding:0;
        color:white;
        background-color:#80A0D0;
        border-radius:4px 4px 0 0;
    }
    .loginform {
        padding: 30px 70px 10px 30px;
    }
</style>