<template>
    <div class="loginframe">
        <div class="loginhead">
            <div style="margin-left:32px">
                登录
            </div>
        </div>
        <el-form ref="form" :model="form" label-width="80px" class="loginform" @submit.native.prevent>
            <el-form-item label="证件号码">
                <el-input v-model="form.idnumber" :maxlength="18"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="form.phone" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input v-model="form.vcode" :maxlength="6" style="width:160px;margin-right:8px;"></el-input>
				<Timerbtn ref="tb" type="primary" @run="sendvcode" style="width:150px">发送验证码</Timerbtn>
            </el-form-item>
        </el-form>
        <div style="text-align:center">
        <el-button type="primary" @click="dologin">登录</el-button>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import {restbase} from '../rest'
    import Timerbtn from '@/components/Timerbtn.vue'

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
        components: {
            Timerbtn
        },
		methods: {
			sendvcode() {
                this.$http.post(restbase() + "asp/SendVerifyInfo", {
                    SFZH: this.form.idnumber,
                    Phone: this.form.phone
                }).then((response) => {
                    console.log(response);
                    const r = JSON.parse(response.data.d);
                    if (r[0].code !== '0') {
                        this.$notify.error({
                            title: '错误',
                            message: r[0].description
                        });
                    } else {
                        this.$notify({
                            title: '成功',
                            message: '验证码已发送',
                            type: 'success'
                        });
                        this.$refs.tb.start();
                    }
                }, (response) => {
                    console.log(response);
                }).catch((response) => {
                    console.log(response);
                });
			},
            dologin() {
                this.$http.post(restbase() + "asp/GetLoginInfo", {
                    PaperValue: this.form.idnumber,
                    Mobile: this.form.phone,
                    PWD: this.form.vcode
                }).then((response) => {
                    const r = JSON.parse(response.data.d);
                    console.log(r);
                    if (r.code !== '0') {
                        this.$notify.error({
                            title: '错误',
                            message: r.description
                        });
                    } else {
                        this.$root.user = r;
    					this.$router.push('info');
                    }
                }, (response) => {
                    console.log(response);
                }).catch((response) => {
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