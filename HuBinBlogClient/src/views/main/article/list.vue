<template>
  <el-container>
    <el-main>
      <h2 style="color: rgb(51, 51, 51)">文章管理</h2>
      <!--搜索功能-->
      <el-row>
        <el-col :span="4" :xs="8">
          <el-input
            placeholder="根据文章标题或分类搜索"
            v-model="page.keyword"
            clearable
          ></el-input>
        </el-col>
        <el-button type="primary" icon="search" @click="loadData"></el-button>
        <el-button type="danger" icon="delete" @click="clearSearch"></el-button>
        <el-button type="primary" icon="plus" @click="addArticle"
          >新建文章</el-button
        >
      </el-row>
      <!--文章展示-->
      <el-row>
        <el-col>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            highlight-current-row
          >
            <!--多选框-->
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column
              fixed
              label="序号"
              type="index"
              width="80"
            ></el-table-column>
            <!--ID-->
            <el-table-column prop="id" label="id" width="80"></el-table-column>
            <!--文章标题-->
            <el-table-column
              prop="title"
              label="标题"
              width="170"
              show-overflow-tooltip
            ></el-table-column>
            <!--文章所属分类-->
            <el-table-column
              prop="cate_name"
              label="分类"
              width="100"
              show-overflow-tooltip
            ></el-table-column>
            <!--文章标签-->
            <!-- <el-table-column
              prop="tag_name"
              label="标签"
              width="200"
              show-overflow-tooltip
            >
              <template #default="scope">
                <span>{{ scope.row.tag_name }}</span>
              </template>
            </el-table-column> -->
            <!--文章封面-->
            <el-table-column label="文章封面" show-overflow-tooltip width="130">
              <template #default="scope">
                <div class="demo-image__preview">
                  <el-image
                    :preview-src-list="[BASE_URL + scope.row.cover_img]"
                    :preview-teleported="true"
                    :src="BASE_URL + scope.row.cover_img"
                    style="width: 120px; height: 80px"
                  ></el-image>
                </div>
              </template>
            </el-table-column>
            <!--文章添加时间-->
            <el-table-column prop="create_time" label="发布时间" width="200">
              <template #default="scope">
                <span>{{ formatNewDate(scope.row.pub_date) }}</span>
              </template>
            </el-table-column>
            <!--文章更新时间-->
            <!-- <el-table-column prop="update_time" label="更新时间" width="200">
              <template #default="scope">
                <span>{{ scope.row.update_time }}</span>
              </template>
            </el-table-column> -->
            <!--文章浏览量-->
            <!-- <el-table-column
              prop="views"
              label="浏览量"
              width="100"
            ></el-table-column> -->
            <!--文章评论数-->
            <!-- <el-table-column prop="comments_number" label="评论数" width="80"></el-table-column> -->
            <!--文章推荐分数-->
            <!-- <el-table-column label="推荐分数" show-overflow-tooltip width="170">
              <template #default="scope">
                <div class="block">
                  <el-rate v-model="scope.row.score" disabled show-score text-color="#ff9900"></el-rate>
                </div>
              </template>
            </el-table-column>-->
            <!--文章发布状态-->
            <el-table-column label="发布状态" show-overflow-tooltip width="80">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.state"
                  disabled
                  active-color="#13ce66"
                ></el-switch>
              </template>
            </el-table-column>

            <!--操作-->
            <el-table-column label="操作" show-overflow-tooltip width="180">
              <template #default="scope">
                <el-button
                  icon="edit"
                  size="small"
                  link
                  @click="handleEditBtn(scope)"
                  >编辑</el-button
                >
                <el-button
                  icon="delete"
                  size="small"
                  link
                  @click="handleDeleteCate(scope)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!--分页-->
      <el-row>
        <el-col>
          <div class="block">
            <el-pagination
              v-model:currentPage="page.currentPage"
              v-model:page-size="page.pageSize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="listCount"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
      <el-dialog v-model="dialogDelete" title="警告" width="30%" draggable>
        <span>是否要删除？</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogDelete = false">取消</el-button>
            <el-button type="primary" @click="confirmDeleteArticle"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, inject } from 'vue'
import { useArticleCateStore } from '@/store/main/article/article'
import { BASE_URL } from '@/service/request/config'
import { useRouter } from 'vue-router'
import { formatNewDate } from '@/utils/date-format'

const message = inject('message') as any

const listCount = ref(100)
const page = reactive({
  currentPage: 1,
  pageSize: 10,
  keyword: ''
})
const store = useArticleCateStore()
const router = useRouter()
const tableData = ref([]) as any

const dialogDelete = ref(false)

onMounted(() => {
  loadData()
})

const loadData = async () => {
  const result = await store.searchArticleAction(
    `/my/article/search?keyword=${page.keyword}&page=${page.currentPage}&pageSize=${page.pageSize}`
  )
  console.log(result)
  listCount.value = result.data.count
  tableData.value = result.data.results.filter(
    (item: any) => item.is_delete == 0
  )
  console.log(tableData.value)
}

const addArticle = () => {
  router.push('/main/article/publish')
}
const clearSearch = () => {
  page.keyword = ''
}
const handleCurrentChange = (currentPage: any) => {
  page.currentPage = currentPage
  loadData()
}
const handleSizeChange = (pageSize: any) => {
  page.pageSize = pageSize
}

const handleEditBtn = (scope: any) => {
  router.push({
    name: 'update',
    query: { currentData: JSON.stringify(scope.row) }
  })
}

let currentRow = reactive({}) as any
const handleDeleteCate = (scope: any) => {
  currentRow = scope
  dialogDelete.value = true
}

const confirmDeleteArticle = async () => {
  dialogDelete.value = false
  const result = await store.deleteArticleByIdAction(
    `/my/article/delete/${currentRow.row.id}`
  )
  if (result.status == 0) {
    loadData()
    message({
      message: '删除文章成功！',
      type: 'success'
    })
  } else {
    dialogDelete.value = false
    message({
      message: '删除文章失败！',
      type: 'error'
    })
  }
}
</script>

<style lang="less">
// .el-input__wrapper {
//   background-color: rgba(43, 44, 40, 0.6) !important; //修改默认的背景色
// }
.el-table__inner-wrapper::before {
  height: 0px;
}

.el-table__border-left-patch::after {
  width: 0;
}

.el-scrollbar__bar {
  display: none;
}

.el-table--border .el-table__inner-wrapper::after {
  background-color: none;
}

.el-table--border::after {
  width: 0;
}

.el-table--border::before {
  width: 0;
}

.el-table__border-left-patch {
  width: 0;
}
.el-pagination {
  justify-content: center; //居中
  //float: left;居左
  //float: right;居右
  .btn-prev,
  .number,
  .more,
  .btn-next {
    background-color: transparent !important; //修改默认的背景色
  }
  .el-pager .is-active {
    background-color: transparent !important; //修改默认的背景色
  }
  .el-input__wrapper {
    border: none;
    background-color: transparent !important; //修改默认的背景色
  }
  .el-pagination__jump {
    cursor: pointer;
  }
}
// .el-popper.is-light {
//   background-color: transparent !important; //修改默认的背景色
// }
// .el-select-dropdown__item {
//   background-color: transparent !important; //修改默认的背景色
// }
</style>
<style scoped lang="less">
.el-main {
  background-color: rgba(242, 242, 242, 0.6);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

/*最外层透明*/
:deep(.el-table),
:deep(.el-table__expanded-cell) {
  background-color: transparent !important;
}

/* 表格内背景颜色 */
:deep(.el-table) th,
:deep(.el-table) tr,
:deep(.el-table) td {
  background-color: transparent !important;
  border: 0; //去除表格
}

/*去除底边框*/
:deep(.el-table) td.el-table__cell {
  border: 0;
  text-align: center;
}

:deep(.el-table) th.el-table__cell.is-leaf {
  text-align: center;
  border: 0;
}

:deep(.el-table) .el-table__inner-wrapper::after {
  height: 0;
  width: 0;
  background-color: none;
  border: none;
}
</style>
