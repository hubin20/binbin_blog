<template>
  <div class="home-detail">
    <div class="detail-main">
      <el-container>
        <el-main>
          <h1>{{ articleDetailData.title }}</h1>
          <div class="detail-content">
            <md-editor
              previewOnly
              v-model="articleDetailData.content"
              @onUploadImg="onUploadImg"
            />
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { formatNewDate } from '@/utils/date-format'
import { useArticleCateStore } from '@/store/main/article/article'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import 'md-editor-v3/lib/style.css'
import MdEditor from 'md-editor-v3'
import axios from 'axios'
import { BASE_URL } from '@/service/request/config'

const store = useArticleCateStore()
const router = useRouter()
const route = useRoute()

const articleDetailData = ref([]) as any

onMounted(() => {
  getArticleDetail()
})
const getArticleDetail = async () => {
  if (typeof route.query.id === 'string') {
    let id = parseInt(route.query.id)
    const result = await store.getArticleByIdAction(`/my/article/${id}`)
    articleDetailData.value = result.data
    console.log(articleDetailData.value)
  }
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
    content: articleDetailData.content,
    onUploadImg
  }
}
</script>

<style lang="less"></style>
<style scoped lang="less">
.home-detail {
  min-height: 622px;
  padding-top: 52px;
  .detail-main {
    width: 1000px;
    margin: 20px auto;
    padding: 0.8px 0.8px;
    border-radius: 0.8px;
    h1 {
      text-align: center;
    }
  }
}
.md {
  background-color: transparent !important;
}
</style>
