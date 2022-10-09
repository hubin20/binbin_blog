<template>
  <div class="art-category">
    <div class="cate-head">
      <h2 style="color: rgb(51, 51, 51)">文章分类</h2>
      <el-button class="addcate" type="primary" @click="addCate"
        >新建分类</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button icon="edit" size="small" link @click="updateCate(scope)"
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
    <div class="page-model">
      <el-dialog
        v-model="dialogVisible"
        title="添加分类"
        width="30%"
        center
        destroy-on-close
      >
        <el-form
          ref="ruleFormRef"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="文章分类名称" prop="pass">
            <el-input
              v-model="addCategory.name"
              type="text"
              autocomplete="off"
              placeholder="请输入分类名称"
            />
          </el-form-item>
        </el-form>
        <slot></slot>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirmClick"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
    <el-dialog v-model="dialogDelete" title="警告" width="30%" draggable>
      <span>是否要删除？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDelete = false">取消</el-button>
          <el-button type="primary" @click="confirmDeleteCate">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="updateVisible"
      title="修改分类"
      width="30%"
      center
      destroy-on-close
    >
      <el-form
        ref="ruleFormRef"
        status-icon
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章分类名称" prop="pass">
          <el-input
            v-model="addCategory.name"
            type="text"
            autocomplete="off"
            placeholder="请输入分类名称"
          />
        </el-form-item>
      </el-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateVisible = false">取消</el-button>
          <el-button type="primary" @click="updateConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, inject } from 'vue'
import { useArticleCateStore } from '@/store/main/article/article'

const dialogVisible = ref(false)
const updateVisible = ref(false)
const store = useArticleCateStore()
const tableData = ref([]) as any
const message = inject('message') as any
const dialogDelete = ref(false)

const addCategory = reactive({
  name: ''
})

let currentRow = reactive({}) as any

onMounted(() => {
  loadData()
})
const loadData = async () => {
  const result = await store.articleCateListAction('/my/article/cates')
  tableData.value = result.data
}

const addCate = () => {
  dialogVisible.value = true
  addCategory.name = ''
}

const updateCate = (scope: any) => {
  currentRow = scope

  updateVisible.value = true
  addCategory.name = currentRow.row.name
}

const updateConfirmClick = async () => {
  updateVisible.value = false
  const result = await store.updateCateAction('/my/article/updatecate', {
    name: addCategory.name,
    id: currentRow.row.id
  })
  if (result.status == 0) {
    loadData()
    message({
      message: '修改分类成功！',
      type: 'success'
    })
  } else {
    updateVisible.value = false
    message({
      message: '修改分类失败！',
      type: 'error'
    })
  }
}
const handleConfirmClick = async () => {
  dialogVisible.value = false
  const result = await store.addCateAction('/my/article/addcates', {
    name: addCategory.name
  })

  if (result.status == 0) {
    loadData()
    message({
      message: '添加分类成功！',
      type: 'success'
    })
  } else {
    dialogVisible.value = false
    message({
      message: '添加分类失败！',
      type: 'error'
    })
  }
}

const handleDeleteCate = (scope: any) => {
  currentRow = scope
  dialogDelete.value = true
}
const confirmDeleteCate = async () => {
  dialogDelete.value = false

  const result = await store.deleteCateAction(
    `my/article/deletecate/${currentRow.row.id}`
  )
  if (result.status == 0) {
    loadData()
    message({
      message: '删除分类成功！',
      type: 'success'
    })
  } else {
    dialogVisible.value = false
    message({
      message: '删除分类失败！',
      type: 'error'
    })
  }
}
</script>

<style>
.el-table__inner-wrapper::before {
  height: 0px;
}
</style>
<style scoped lang="less">
.art-category {
  background-color: rgba(242, 242, 242, 0.6);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .cate-head {
    position: relative;
    display: flex;
    justify-content: space-between;
    .addcate {
      position: absolute;
      top: 18px;
      left: 415px;
    }
  }
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
</style>
