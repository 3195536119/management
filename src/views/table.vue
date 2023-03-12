<!--
 * @Descripttion: 系统中的表格数据
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-08 19:12:47
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-12 16:59:00
-->
<template>
    <div class="table_info">
        <el-form :inline="true">
            <el-form-item label="姓名:">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="年份:">
                <el-date-picker v-model="year" type="year" placeholder="请选择">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地址:">
                <el-cascader placeholder="请选择" v-model="address" :options="options" filterable />
            </el-form-item>
            <el-form-item>
                <el-button @click="search" type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="exportData" type="primary">导出数据</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
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

    </div>
</template>

<script>
export default {
    name: 'Table',

    data() {
        return {
            name: '',
            year: '',
            address: '',
            options: [],
            tableData: [],
            currentPage: 1,//当前页码
            pageSize: 5,//每页的数据条数
            total: 20//总条数
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
        getTables() {
            this.$http.get('/api/getTable').then(res => {
                console.log(res.data)
                this.tableData = res.data
            })
        },
        search() {
            let name = this.name
            let year = this.year
            let address = this.address

        },
        exportData() {

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
            console.log(index, row)
        },
        handleDelete(index, row) {

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
