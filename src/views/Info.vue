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
            <el-form-item label="性别">
                <el-input :readonly="true" v-model="form.gender"></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-input :readonly="true" v-model="form.dateofbirth"></el-input>
            </el-form-item>
        </el-form>
        <div style="text-align:center">
        <router-link to="/about"><el-button type="primary">下一步</el-button></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'info',
        data() {
            return {
                form: {
                    name: '孙悟饭',
                    gender: '男',
                    dateofbirth: '1991-02-16'
                }
            }
        }
    }
</script>

<style>
    .infoframe {
        position: relative;
        height: 350px;
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
        padding: 30px 70px 10px 30px;
    }
</style>