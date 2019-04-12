<template>
    <div class="pepkgframe">
        <div class="pepkghead">
            <div style="margin-left:32px">
                请选择检查套餐
            </div>
        </div>
        <div class="pepkgpanel">
            <el-collapse accordion>
                <el-collapse-item v-for="v in pepkgdata" :key="v.TSID" :title="getTds(v.TSID).TSRemark" :name="v.TSID">
                    <el-table stripe style="font-size:12px" :data="v.GIDs">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <span>{{getG(scope.row.GID).GRemarks}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="检查项目" prop="GID">
                            <template slot-scope="scope">
                                {{ getG(scope.row.GID).GNAME }}
                            </template>
                        </el-table-column>
                        <el-table-column v-if="v.pkgs.length > 0" align="center">
                            <template slot-scope="scope">
                                <i v-if="scope.row.L1" class="el-icon-check checkflag"></i>
                            </template>
                            <template slot="header">
                                <span style="padding-right:6px">基础套餐</span>
                                <el-checkbox v-model="selectedpkgs[v.pkgs[0].PKID]"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="v.pkgs.length > 1" align="center">
                            <template slot-scope="scope">
                                <i v-if="scope.row.L2" class="el-icon-check checkflag"></i>
                            </template>
                            <template slot="header">
                                <span style="padding-right:6px">升级套餐1</span>
                                <el-checkbox v-model="selectedpkgs[v.pkgs[1].PKID]"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="v.pkgs.length > 2" align="center">
                            <template slot-scope="scope">
                                <i v-if="scope.row.L3" class="el-icon-check checkflag"></i>
                            </template>
                            <template slot="header">
                                <span style="padding-right:6px">升级套餐2</span>
                                <el-checkbox v-model="selectedpkgs[v.pkgs[2].PKID]"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="v.pkgs.length > 3" align="center">
                            <template slot-scope="scope">
                                <i v-if="scope.row.L4" class="el-icon-check checkflag"></i>
                            </template>
                            <template slot="header">
                                <span style="padding-right:6px">升级套餐3</span>
                                <el-checkbox v-model="selectedpkgs[v.pkgs[3].PKID]"></el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div style="text-align:center">
            <router-link to="/tds"><el-button type="primary" style="margin-right:20px">上一步</el-button></router-link>
            <el-button type="primary" :disabled="!hasselected()" @click="nextstep">下一步</el-button>
        </div>
    </div>
</template>

<script>
    import {restbase} from '../rest'
    export default {
        name: 'pepkg',
        data() {
            return {
                pepkgdata: [],
                selectedpkgs: {}
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
                    this.$root.pkgs = d;
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
                    data1.forEach(td => {
                        td.GIDs = [];
                        td.pkgs.forEach(pkg => {
                            pkg.GIDs.forEach(GID => {
                                let g = td.GIDs.find(e=>{
                                    return e.GID === GID
                                });
                                if (g === undefined) {
                                    let a = {GID:GID};
                                    for (let j = 1; j <= td.pkgs.length; ++j) {
                                        a['L' + j] = false;
                                    }
                                    a['L'+pkg.PKLevel] = true;
                                    td.GIDs.push(a);
                                } else {
                                    g['L'+pkg.PKLevel] = true;
                                }
                            });
                        });
                    });
                    this.pepkgdata = data1;
                }, response=>{
                    // eslint-disable-next-line
                    console.error(response);
                })
                .catch(response=>{
                    // eslint-disable-next-line
                    console.error(response);
                })
            },
            getTds(TSID) {
                return this.$root.alltds.find(v=>{
                    return v.TSID === TSID;
                });
            },
            fetchFt2() {
                //读取基表2
                this.$http.get(restbase()+"ft2", {params:{gender:this.$root.gender}})
                .then(response=>{
                    this.$root.ft2 = response.data.data;
                }, response=>{
                    // eslint-disable-next-line
                    console.error(response);
                })
                .catch(response=>{
                    // eslint-disable-next-line
                    console.error(response);
                })
            },
            getG(GID) {
                return this.$root.ft2.find(v=>{
                    return v.Gid === GID;
                });
            },
			getselectedpkgs() {
                //对象转数组并过滤出已点选的key
                const ar = Object.keys(this.selectedpkgs).filter(key=>this.selectedpkgs[key]);
                return ar.map(v=>
                    this.$root.pkgs.find(p=>
                        String(p.PKID) === v
                    )
                );
			},
            nextstep() {
				this.$root.selectedpkgs = this.getselectedpkgs();
                this.$router.push('order');
            },
            hasselected() {
				//const tsids = this.getselectedpkgs().map(v => v.TSID).filter((v, i, a) => a.indexOf(v) === i);	//求唯一化的TSID数组
				//return this.$root.tds.length === tsids.length;	//要求每个目标疾病都至少选择一个套餐
				return Object.keys(this.selectedpkgs).filter(key=>this.selectedpkgs[key]).length > 0;	//要求全局至少选择一个套餐
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
    .checkflag {
        color:#0C8;
        font-size:18px;
        font-weight:bold;
    }
</style>
