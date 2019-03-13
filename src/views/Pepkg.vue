<template>
    <div class="pepkgframe">
        <div class="pepkghead">
            <div style="margin-left:32px">
                请选择检查套餐
            </div>
        </div>
        <div class="pepkgpanel">
            <el-collapse style="font-size:18px">
                <el-collapse-item v-for="v in pepkgdata" :key="v.TSID" :title="getTds(v.TSID).TSName" :name="v.TSID">
                    <el-table style="font-size:12px" :data="v.children">
                        <el-table-column label="基础套餐">
                        </el-table-column>
                        <el-table-column label="升级套餐1">
                        </el-table-column>
                        <el-table-column label="升级套餐2">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
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
            this.fetchFt2();
            this.fetchData();
        },
        methods: {
            fetchData() {
                if (!this.$root.tds || this.$root.tds.length === 0)
                    return;
                this.$http.get(restbase()+"pepkg", {params:{tds:this.$root.tds}})
                .then(response=>{
                    const d = response.data.data;
                    let data1 = [];
                    d.forEach(e => {
                        let i = data1.find(v=>{
                            return e.TSID === v.TSID
                        });
                        if (i === undefined) {
                            data1.push({TSID:e.TSID, pkgs:[e]});
                        } else {
                            i.pkgs.push(e);
                        }
                    });
                    console.log(data1);
                    data1.forEach(td => {
                        td.GIDs = [];
                        td.forEach(pkg => {
                            pkg.GIDs.forEach(GID => {
                                if (td.GIDs.indexOf(GID) === -1) {
                                    td.GIDs.push(GID);
                                }
                            });
                        });
                    });
                }, response=>{
                    console.error(response);
                })
                .catch(response=>{
                    console.error(response);
                })
            },
            getTds(TSID) {
                return this.$root.alltds.find(v=>{
                    return v.TSID === TSID;
                });
            },
            fetchFt2() {
                this.$http.get(restbase()+"ft2")
                .then(response=>{
                    this.$root.ft2 = response.data.data;
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
        padding: 16px 36px 20px 36px;
    }
</style>
