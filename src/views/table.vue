<!--
 * @Descripttion: 
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-08 19:12:47
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-16 16:45:25
-->
<template>
    <div class="table_info">
        <el-form :inline="true">
            <el-form-item label="姓名:">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="年份:">
                <el-date-picker v-model="year" type="year" placeholder="请选择" value-format="YYYY">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地址:">
                <el-cascader placeholder="请选择" v-model="address" :options="options" filterable clearable />
            </el-form-item>
            <el-form-item>
                <el-button @click="search" type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="exportData" type="primary">导出数据</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%"
            id="exportTable">
            <el-table-column type="selection" width="55" />
            <el-table-column label="序号" type="index" width="55" />
            <el-table-column label="姓名" property="name">
            </el-table-column>
            <el-table-column property="date" label="出生日期" width="120" sortable />
            <el-table-column property="address" label="地址" show-overflow-tooltip />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination align='center' background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[1, 5, 10, 20]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>

        <el-dialog v-model="dialogFormVisible" title="编辑用户信息">
            <el-form :model="editForm" label-position="right" label-width="120px">
                <el-form-item label="id" v-show="false">
                    <el-input v-model="editForm.ID" />
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input v-model="editForm.editName" />
                </el-form-item>
                <el-form-item label="出生日期：">
                    <el-date-picker v-model="editForm.editDate" type="date" value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item label="地址:">
                    <el-cascader placeholder="请选择" v-model="editForm.editAddress" :options="options" filterable clearable />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="editSure">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ElMessageBox, ElMessage } from "element-plus";
import { saveAs } from 'file-saver';
import { utils, write } from "xlsx";
export default {
    name: 'Table',

    data() {
        return {
            name: '',
            year: '',
            address: '',
            dialogFormVisible: false,
            options: [],
            tableData: [],
            currentPage: 1, //当前页码
            pageSize: 5, //每页的数据条数
            total: 20, //总条数
            editForm: {
                ID: '',
                editName: '',
                editDate: '',
                editAddress: []
            }
        };
    },

    mounted() {
        this.$http.get('/getZone').then(res => {
            console.log(res.data)
            this.options = res.data
        })
        this.getTables()
    },

    methods: {
        getTables(name, year, address) {
            this.$http.get('/getTable', {
                params: {
                    name,
                    year,
                    address
                }
            }).then(res => {
                console.log(res.data)
                this.tableData = res.data
            })
        },
        search() {
            let name = this.name
            let year = this.year
            let address = this.address
            address = address ? address[1] : address
            console.log(name, year, address)
            this.getTables(name, year, address)
        },
        exportData() {
            this.pageSize = this.tableData.length
            let that = this
            let size = this.pageSize
            this.currentPage = 1
            let tables = document.getElementById('exportTable')

            this.$nextTick(function () {
                let table_book = utils.table_to_book(tables)
                let table_write = write(table_book, {
                    bookType: 'xlsx',
                    bookSST: true,
                    type: 'array'
                })
                try {
                    saveAs(new Blob([table_write], { type: 'application/octet-stream' }), 'sheet.xlsx')
                } catch (e) {
                    if (typeof conosle !== undefined)
                        console.log(e, table_write)
                }
                return table_write
            })
            this.$nextTick(() => {
                this.pageSize = size
                this.currentPage = 1
            })

        },
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        handleEdit(index, row) {
            console.log(row)
            let addressArr = [row.addressCode.slice(0, 3), row.addressCode]
            this.dialogFormVisible = true
            this.editForm = {
                ID: row.id,
                editName: row.name,
                editDate: row.date,
                editAddress: addressArr
            }
        },
        handleDelete(index, row) {
            ElMessageBox.confirm(
                '确认删除吗？',
                '警告！', {
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }
            ).then(() => {
                this.$http.get('/deleteTableData', {
                    params: {
                        id: row.id
                    }
                }).then(() => {
                    this.getTables()
                    ElMessage({
                        message: '删除成功！',
                        type: 'success',
                    })
                })
            })
        },
        editSure() {
            this.$http.get('/editTableData', {
                params: {
                    id: this.editForm.ID,
                    name: this.editForm.editName,
                    date: this.editForm.editDate,
                    address: this.editForm.editAddress[1]
                }
            }).then(res => {
                ElMessageBox.confirm(
                    '确认修改吗？',
                    '警告！', {
                    type: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }
                ).then(() => {
                    this.dialogFormVisible = false
                    this.getTables()
                })

            })

        }
    },
};
</script>

<style scoped>
.table_info {
    display: flex;
    flex-direction: column;
    padding: 0 15px;
}

.el-form {
    margin: 10px 0;
}

.el-form-item {
    margin-right: 15px;
}

.el-table {
    margin-bottom: 10px;
}
</style>
