<template>
  <div class="link_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>链接管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-button type="primary" v-on:click="add" class="add_btn" size="mini">新增<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="网址名称">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="网址简介"
        width="300">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row.link_id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.link_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页指示器-->
    <div class="pagination">
      <el-pagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        :page-count="total_page"
        :page-size="page_size"
        :total="count"
        @current-change="change_page">
      </el-pagination>
    </div>
    <div class="filter"></div>
  </div>
</template>

<script>
export default {
  name: 'LinkList',
  data () {
    return {
      page: 1,
      page_size: 10,
      total_page: 0,
      count: 0,
      tableData: []
    }
  },
  created: function () {
    this.getList()
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push({
        name: 'LinkEdit',
        query: {
          link_id: row
        }
      })
    },
    handleDelete (index, row) {
      let _this = this
      this.$axios({
        method: 'delete',
        url: '/ao/link/delete/' + row
      }).then(response => {
        if (response.data.code === 200) {
          _this.$message.success('操作成功！')
          _this.getList()
        }
      })
    },
    getList () {
      let _this = this
      this.$axios({
        method: 'get',
        url: '/oo/link/list',
        params: {
          page: this.$data.page,
          page_size: this.$data.page_size
        }
      }).then(response => {
        if (response.data.code === 200) {
          _this.$data.tableData = response.data.data.list
          _this.$data.count = response.data.data.count
          _this.$data.total_page = Math.ceil(response.data.data.count / _this.$data.page_size)
        } else {
          _this.$message.error(response.data.message)
        }
      })
    },
    change_page: function (page) {
      this.$data.page = page
      this.getList()
    },
    add: function () {
      this.$router.push('/link_edit')
    }
  }
}
</script>

<style>
.link_content {
  width: 50%;
  padding: 1.25rem 1.875rem 1.25rem 0.625rem;
  margin: 1.25rem auto;
  padding-left: 2.375rem;
  background-color: #FFFFFF;
}
.top {
  width: 50%;
  margin: auto;
}
.code_div {
  margin-bottom: 0.625rem;
  width: 8.75rem;
  height: 2.5rem;
}
.pagination {
  float: left;
  margin-top: 1.25rem;
}
.filter {
  height: 3.125rem;
}
.add_btn {
  float: right;
  margin-right: 2.625rem;
}
</style>
