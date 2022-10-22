<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <el-main>
          <h2>发布文章</h2>
          <el-row :gutter="3">
            <el-col :span="12">
              <el-input
                v-model="dataList.title"
                placeholder="请输入文章标题"
                clearable
              ></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-select
                class="m-2"
                v-model="dataList.options.id"
                placeholder="请选择文章分类"
                :filterable="true"
                style="width: 50%"
              >
                <el-option
                  v-for="item in dataList.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="3">
            <el-col :span="12">
              <el-input
                v-model="dataList.tags"
                placeholder="请输入文章标签 多个标签用分号分隔"
                clearable
              ></el-input>
            </el-col>
          </el-row> -->
          <el-row>
            <el-upload
              accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG,"
              class="upload-demo"
              action=""
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :before-upload="beforeUpload"
              :on-exceed="handleExceed"
              :on-change="onChange"
              :auto-upload="false"
              list-type="picture"
              :limit="1"
              style="width: 50%"
            >
              <el-button size="small" type="primary">上传文章封面图</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/jpeg/png文件，且不超过20M
              </div>
            </el-upload>
          </el-row>
          <!-- <el-row :gutter="3">
            <el-col :span="12">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入文章简介"
                v-model="dataList.textarea"
                :show-word-limit="true"
                :maxlength="100"
              ></el-input>
            </el-col>
          </el-row> -->
          <el-row :gutter="3">
            <el-col>
              <div id="main">
                <md-editor
                  v-model="dataList.content"
                  @onUploadImg="onUploadImg"
                />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="3">
            <el-col>
              <el-button type="success" @click="addArticleBtn"
                >文章发布</el-button
              >
              <el-button type="primary">保存草稿</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup lang="ts">
import { reactive, onMounted, inject } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useArticleCateStore } from '@/store/main/article/article'
import axios from 'axios'
import { BASE_URL } from '@/service/request/config'
import { useRouter } from 'vue-router'

const store = useArticleCateStore()
const message = inject('message') as any
const router = useRouter()

const dataList = reactive({
  content: '', // 文章内容
  title: '', // 文章标题
  // 文章分类
  options: [] as any,
  state: '已发布',
  fileList: [] as any
})

onMounted(() => {
  loadArticleCate()
})
//获取分类名称和id
const loadArticleCate = async () => {
  const result = await store.articleCateListAction('/my/article/cates')

  dataList.options = result.data.map((item: any) => {
    return {
      label: item.name,
      value: item.id
    }
  })
}
const onChange = (file: any, fileList: any) => {
  file.status = 'success'
  dataList.fileList = fileList
  console.log(file)
}
const beforeUpload = (file: any) => {
  let fileSize = file.size
  const FIVE_M = 20 * 1024 * 1024
  //大于5M，不允许上传
  if (fileSize > FIVE_M) {
    message({
      message: '最大上传20M',
      type: 'error'
    })
    return false
  }
  //判断文件类型，必须是xlsx格式
}
const handleExceed = () => {
  message({
    message: '最多支持一张封面',
    type: 'error'
  })
}
const handlePreview = (uploadFile: any) => {
  console.log(uploadFile)
}

const handleRemove = (file: any, uploadFiles: any) => {
  console.log(file, uploadFiles)
}

// 图片上传事件
const onUploadImg = async (files: any, callback: any) => {
  console.log('in')

  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise((rev, rej) => {
        // 传给后端一个FormData数据，添加键值对，这里我添加了这个文章的ID和file
        const form = new FormData()
        form.append('file', file)
        console.log(form.get('file'))

        axios
          // 这里是我的后端接口，请求地址和路径可以自己改
          .post(`${BASE_URL}/api/img/upload`, form)
          .then((res) => {
            rev(res)
          })
          .catch((error) => rej(error))
      })
    })
  )
  callback(
    res.map((item) => {
      console.log(item)

      return item.data.data.url
    })
  )
  return {
    content: dataList.content,
    onUploadImg
  }
}
const addArticleBtn = async () => {
  console.log(dataList.fileList[0])
  const formData = new FormData() // 创建form对象
  formData.append('cover_img', dataList.fileList[0].raw) // 通过append向form对象添加文件数据
  formData.append('title', dataList.title)
  formData.append('cate_id', dataList.options.id)
  formData.append('content', dataList.content)
  formData.append('state', dataList.state)

  const result = await store.articleAddAction('/my/article/add', formData)
  if (result.status == 0) {
    router.push('/main/article/list')
    message({
      message: '添加文章成功！',
      type: 'success'
    })
  } else {
    message({
      message: '添加文章失败！',
      type: 'error'
    })
  }
}
</script>

<style scoped lang="less">
.el-main {
  margin: auto;
  width: 100%;
  height: 100%;
}

.el-row {
  margin-bottom: 20px;
}
</style>
