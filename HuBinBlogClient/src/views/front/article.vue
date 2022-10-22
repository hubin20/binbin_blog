<template>
  <div class="home-article">
    <p class="title">博客</p>
    <p class="slogan">博客文章分享</p>
    <div class="label">
      <p
        class="lable-list"
        :class="{ lbselected: currentLabel == -1 }"
        @click="selectNode(-1)"
      >
        全部
      </p>
      <p
        class="lable-list"
        :class="{ lbselected: currentLabel == index }"
        v-for="(item, index) in articleCatesList"
        :key="item"
        @click="selectNode(index)"
      >
        {{ item.name }}
      </p>
    </div>
    <div class="article-main">
      <el-container>
        <el-main>
          <h2 style="color: rgb(51, 51, 51)">最新博客</h2>
          <el-row class="searchInput">
            <el-col :span="4" :xs="8">
              <el-input
                v-model="page.keyword"
                placeholder="根据文章标题或分类搜索"
                clearable
              ></el-input>
            </el-col>
            <el-button
              type="primary"
              icon="search"
              @click="searchArticles"
            ></el-button>
            <el-button
              type="danger"
              icon="delete"
              @click="clearSearch"
            ></el-button>
          </el-row>
          <li
            class="article_item"
            v-for="(articleItem, index) in searchList"
            :key="index"
          >
            <el-row class="articleImg">
              <!-- <img :src="articleItem.img" alt="" /> -->
              <template #default="scope">
                <div class="demo-image__preview">
                  <el-image
                    :preview-src-list="[BASE_URL + articleItem.cover_img]"
                    :preview-teleported="true"
                    :src="BASE_URL + articleItem.cover_img"
                    style="width: 100%; height: 100%"
                    fit="cover"
                  ></el-image>
                </div>
              </template>
            </el-row>
            <div class="articleCon">
              <div class="articleTitle">
                <a @click="toArticleDetail(articleItem.id)">{{
                  articleItem.title
                }}</a>
                <i class="iconfont icon-wenzhang1"></i>
              </div>
              <div class="article">
                <p>
                  {{
                    articleItem.content.length > 50
                      ? articleItem.content.substring(0, 100) + '...'
                      : articleItem.content
                  }}
                </p>
              </div>
              <div class="article_contenter_tag">
                <p class="article_contenter_tag_left clearfix">
                  <!-- 文章标签 -->
                  <!-- <span class="article_contenter_label">
                            <i class="iconfont icon-biaoqian1"></i>
                            <span
                              @click="
                                router.replace(
                                  `/creepreBlog/article/articleDetail/${articleItem.article_id}/users`
                                )
                              "
                              class=""
                              >{{ articleItem.label }}</span
                            >
                          </span> -->
                  <!-- 文章的发表时间 -->
                  <span class="article_contenter_time">
                    <i class="iconfont icon-shijian1"></i>
                    <span>{{ formatNewDate(articleItem.pub_date) }}</span>
                  </span>
                </p>
              </div>
            </div>
          </li>
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
import { BASE_URL } from '@/service/request/config'

const nWidth = ref(0)
const addBottom = ref(30) //添加按钮底部定位数字
const currentLabel = ref(-1)
const store = useArticleCateStore()
const listCount = ref(100)
const router = useRouter()

const page = reactive({
  currentPage: 1,
  pageSize: 10,
  keyword: ''
})
const articleCatesList = ref([]) as any
const searchList = ref([]) as any
onMounted(() => {
  loadCates()
  searchArticles()
})

const searchArticles = async () => {
  const result = await store.searchArticleAction(
    `/my/article/search?keyword=${page.keyword}&page=${page.currentPage}&pageSize=${page.pageSize}`
  )

  searchList.value = result.data.results.filter(
    (item: any) => item.is_delete == 0
  )
  listCount.value = searchList.value.length
  console.log(searchList.value)
}

const handleCurrentChange = (currentPage: any) => {
  page.currentPage = currentPage
  searchArticles()
}
const handleSizeChange = (pageSize: any) => {
  page.pageSize = pageSize
}

const loadCates = async () => {
  const result = await store.articleCateListAction('/my/article/cates')
  articleCatesList.value = result.data
}

const clearSearch = () => {
  page.keyword = ''
}
const toArticleDetail = (id: any) => {
  router.push({ name: 'detail', query: { id: id } })
}

const selectNode = (index: any) => {
  currentLabel.value = index
}

const noteWith = () => {
  let wWidth = document.body.clientWidth
  nWidth.value = Math.floor((wWidth - 120) / 300) * 300
}

const scrollBottom = () => {
  //距离顶部高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  //屏幕高度
  let clientHeight = document.documentElement.clientHeight
  //内容高度
  let scrollHeight = document.documentElement.scrollHeight
  if (scrollTop >= scrollHeight - clientHeight - 230) {
    addBottom.value = scrollTop + clientHeight + 230 - scrollHeight
  } else {
    addBottom.value = 30
  }
}
onMounted(() => {
  noteWith()
  window.addEventListener('resize', noteWith)
  //监听滚动高度变化
  window.addEventListener('scroll', scrollBottom)
})
</script>

<style lang="less">
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
</style>
<style scoped lang="less">
.home-article {
  min-height: 622px;
  padding-top: 52px;
  .article-main {
    width: 1000px;
    margin: 20px auto;
    padding: 0.8px 0.8px;
    border-radius: 0.8px;
    .searchInput {
      text-align: right;
    }
    .article_item {
      border-bottom: 0.32px solid #333333;
      background: rgba(242, 242, 242, 0.6);
      border: 1px solid rgba(204, 204, 204, 0.1);
      height: 112px;
      padding: 0.8px 0.8px;
      box-shadow: inset 0 0 0.8px 0.8px rgba(204, 204, 204, 0.2);
      border-radius: 4.8px;
      user-select: none;
      margin: 16px 0;
      .articleImg {
        float: left;
        width: 128px;
        height: 100%;
        overflow: hidden;
        border-radius: 0.8px;
        margin-right: 1.6px;
      }
      img {
        width: 100%;
      }
      .articleCon {
        height: 128px;
        border-radius: 0.8px;
        overflow: hidden;
        padding: 0.8px 0.8px;
        .articleTitle {
          display: inline-block;
          width: 100%;
          height: 3.68px;
          a {
            font-size: 2.72px;
            font-weight: bold;
            letter-spacing: 0.16px;
            vertical-align: middle;
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
            &:active {
              transform: scale(1.1);
            }
          }
          i {
            margin: 0 0.32px;
          }
        }
        .article {
          width: 100%;
          height: 0.8px;
          padding: 16px 0;
          p {
            line-height: 32px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
      .article_contenter_tag {
        padding-top: 28.8px;
        i {
          margin-right: 0.64px;
        }
        .article_contenter_tag_left {
          float: left;
          .article_contenter_label {
            margin-right: 3.2px;
            i {
              color: lightcoral;
            }
            span {
              color: rgb(78, 160, 40);
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
          .article_contenter_time {
            i {
              color: rgb(54, 161, 165);
            }
            span {
              color: rgb(114, 103, 103);
            }
          }
        }
      }
    }
  }

  .title {
    padding-top: 48px;
    padding-bottom: @padding-8;
    font-size: 56px;
    color: @gray-1;
    text-align: center;
    font-weight: 600;
  }
  .slogan {
    color: @gray-2;
    text-align: center;
  }
  .label {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    cursor: pointer;
    .lable-list {
      padding: 0 14px;
      display: flex;
      align-items: center;
      height: 30px;
      margin: @padding-4;
      color: @gray-2;
      box-sizing: border-box;
    }
    .lbselected {
      color: @gray-1;
      font-weight: 600;
      border: 1px solid @gray-1;
      border-radius: 16px;
    }
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    padding-top: 28px;
    margin: auto;
    .card-inner {
      margin: 6px;
    }
    .cardSelected {
      border: 1px solid @primary-color;
    }
  }
  .add {
    width: 56px;
    height: 56px;
    background: @gray-1;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    position: fixed;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: @tr;
    .icon-tianjia {
      color: @gray-10;
      font-size: 24px;
    }
  }
}
</style>
