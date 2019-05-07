<template>
    <div class="tdsframe">
        <div class="tdshead">
            <div style="margin-left:32px">
                请选择您关注的目标疾病
            </div>
        </div>
        <div class="tdstree">
            <el-tree :data="tdsdata" show-checkbox node-key="id" ref="tree" :default-checked-keys="checkedkeys">
            </el-tree>
        </div>
        <div style="text-align:center">
            <el-button type="primary" :disabled="!hasselected()" @click="nextstep">下一步</el-button>
        </div>
    </div>
</template>

<script>
    import {restbase} from '../rest'
    export default {
        name: 'tds',
        data() {
            return {
                tdsdata: [],
                checkedkeys:[]
            }
        },
        mounted() {
            this.fetchData();
            if (this.$root.tds !== undefined) {
                this.checkedkeys = this.$root.tds;
            }
        },
        methods: {
            fetchData() {
                this.$http.get(restbase()+"tds", {params:{gender:this.$root.gender}})
                .then(response=>{
                    const d = response.data.data;
                    this.$root.alltds = d;
                    this.tdsdata = [];
                    d.forEach(e => {
                        let i = this.tdsdata.find(v=>{
                            return e.TSCategory === v.label
                        });
                        if (i === undefined) {
                            this.tdsdata.push({label:e.TSCategory, children:[{label:e.TSRemark, id:e.TSID, value:e}]});
                        } else {
                            i.children.push({label:e.TSRemark, id:e.TSID, value:e});
                        }
                    });
                }, response=>{
                    // eslint-disable-next-line
                    console.error(response);
                })
                .catch(response=>{
                    // eslint-disable-next-line
                    console.error(response);
                })
            },
            nextstep() {
                this.$root.tds = this.$refs.tree.getCheckedKeys(true);
                this.$http.post(restbase() + "asp/SetTargetSisease", {
                    SFZH: this.$root.user.PaperValue,
                    TSIDs: this.$root.tds
                }).then((response) => {
                    console.log(response);
                }, (response) => {
                    console.log(response);
                }).catch((response) => {
                    console.log(response);
                });
                this.$router.push('pepkg');
            },
            hasselected() {
                return (this.$refs.tree !== undefined) && this.$refs.tree.getCheckedKeys(true).length > 0;
            }
        }
    }
</script>

<style>
    .tdsframe {
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
    .tdshead {
        width:100%;
        height:48px;
        line-height:48px;
        padding:0;
        color:white;
        background-color:#80A0D0;
        border-radius:4px 4px 0 0;
    }
    .tdstree {
        padding: 16px 20px 20px 20px;
    }
</style>
