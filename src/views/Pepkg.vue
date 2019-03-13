<template>
    <div class="pepkgframe">
        <div class="pepkghead">
            <div style="margin-left:32px">
                请选择检查套餐
            </div>
        </div>
        <div class="pepkgpanel">
        </div>
        <div style="text-align:center">
            <el-button type="primary">下一步</el-button>
        </div>
    </div>
</template>

<script>
    import {restbase} from '../rest'
    export default {
        name: 'pepkg',
        data() {
            return {
                pepkgdata: []
            }
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                if (!this.$root.tds || this.$root.tds.length === 0)
                    return;
                this.$http.get(restbase()+"pepkg", {params:{tds:this.$root.tds}})
                .then(response=>{
                    const d = response.data.data;
                    console.log(d);
                }, response=>{
                    console.error(response);
                })
                .catch(response=>{
                    console.error(response);
                })
            }
        }
    }
</script>

<style>
    .pepkgframe {
        margin:0 auto;
        width:100%;
        padding-bottom:26px;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 2px 2px 2px #888;
        background-color: white;
        margin-bottom: 40px;
    }
    .pepkghead {
        width:100%;
        height:48px;
        line-height:48px;
        padding:0;
        color:white;
        background-color:#80A0D0;
        border-radius:4px 4px 0 0;
    }
    .pepkgpanel {
        padding: 16px 20px 20px 20px;
    }
</style>
