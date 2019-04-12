<template>
    <div>
        <div class="orderframe">
            <div class="orderhead">
                <div style="margin-left:32px">
                您已选择的套餐
                </div>
            </div>
            <div style="padding:0 20px">
                <el-table :data="selectedpkgs">
                    <el-table-column label="目标疾病">
                        <template slot-scope="scope">
                            {{ getTds(scope.row.TSID).TSRemark }}
                        </template>
                    </el-table-column>
                    <el-table-column label="套餐" prop="PKID" :width="150">
                        <template slot-scope="scope">
                            {{ getPkgName(scope.row.PKLevel) }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="orderframe">
            <div class="orderhead">
                <div style="margin-left:32px">
                检查项目清单
                </div>
            </div>
            <div style="padding:0 20px">
                <el-table :data="itemlist" show-summary :summary-method="getSummaries">
                    <el-table-column label="检查项目" :width="200">
                        <template slot-scope="scope">
                            {{ getG(scope.row).GNAME }}
                        </template>
                    </el-table-column>
                    <el-table-column label="医学意义" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ getG(scope.row).GRemarks }}
                        </template>
                    </el-table-column>
                    <el-table-column label="价格" align="right" :width="100">
                        <template slot-scope="scope">
                            {{ getG(scope.row).GPrice + ".00"}}
                        </template>
                    </el-table-column>
                </el-table>
				<div v-if="unselecteditemlist.length > 0">
					<el-button type="text" @click="dialogTableVisible=true" style="padding-bottom:0">点击此处查看未选项目</el-button>
				</div>
            </div>
        </div>
		<el-dialog :visible.sync="dialogTableVisible" width="80%" title="更多检查项目">
                <el-table :data="unselecteditemlist">
                    <el-table-column label="检查项目" :width="200">
                        <template slot-scope="scope">
                            {{ getG(scope.row).GNAME }}
                        </template>
                    </el-table-column>
                    <el-table-column label="医学意义" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ getG(scope.row).GRemarks }}
                        </template>
                    </el-table-column>
                    <el-table-column label="价格" align="right" :width="100">
                        <template slot-scope="scope">
                            {{ getG(scope.row).GPrice + ".00"}}
                        </template>
                    </el-table-column>
                </el-table>
		</el-dialog>
        <div style="text-align:center;margin-bottom:60px;">
            <router-link to="/pepkg"><el-button type="primary" style="margin-right:20px">上一步</el-button></router-link>
            <el-button type="primary">确定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'order',
        data() {
            return {
                selectedpkgs: this.$root.selectedpkgs,
                itemlist: [],
				unselecteditemlist: [],
				dialogTableVisible: false
            }
        },
        mounted() {
            this.$root.selectedpkgs.forEach(pkg => {
                pkg.GIDs.forEach(g => {
                    if (this.itemlist.indexOf(g) === -1) {
                        this.itemlist.push(g)
                    }
                });
            });
			/*
			//列出当前目标疾病下的所有未选项目
            this.$root.pkgs.forEach(pkg => {
                pkg.GIDs.forEach(g => {
                    if (this.itemlist.indexOf(g) === -1 && this.unselecteditemlist.indexOf(g) === -1) {
                        this.unselecteditemlist.push(g)
                    }
                });
            });
			*/
			//列出基表2下的所有未选项目
			this.$root.ft2.forEach(item => {
				if (this.itemlist.indexOf(item.Gid) === -1 && this.unselecteditemlist.indexOf(item.Gid) === -1) {
					this.unselecteditemlist.push(item.Gid)
				}
			});
        },
        methods: {
            getTds(TSID) {
                return this.$root.alltds.find(v=>{
                    return v.TSID === TSID;
                });
            },
            getPkgName(level) {
                if (level === 1) {
                    return '基础套餐'
                } else {
                    return '升级套餐' + (level - 1)
                }
            },
            getG(GID) {
                return this.$root.ft2.find(v=>{
                    return v.Gid === GID;
                });
            },
            getSummaries(param) {
                const { columns, data } = param;
                columns;
                const s = data.reduce((prev, item) => this.getG(item).GPrice + prev, 0);
                const sums = [];
                sums[0] = '合计';
                sums[2] = s + '.00';
                return sums;
            }
        }
    }
</script>

<style>
    .orderframe {
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
    .orderhead {
        width:100%;
        height:48px;
        line-height:48px;
        padding:0;
        color:white;
        background-color:#80A0D0;
        border-radius:4px 4px 0 0;
    }
</style>
