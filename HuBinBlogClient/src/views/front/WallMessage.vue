<template>
  <div class="wall-message">
    <p class="title">{{ wallType[id].name }}</p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
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
        v-for="(item, index) in label[id]"
        :key="index"
        @click="selectNode(index)"
      >
        {{ item }}
      </p>
    </div>
    <div class="card" :style="{ width: nWidth + 'px' }">
      <note-card
        v-for="(item, index) in note.data"
        :key="index"
        :note="item"
        class="card-inner"
        width="288px"
        :class="{ cardSelected: index == cardSelected }"
        @click="selectCard(index)"
      ></note-card>
    </div>
    <div
      class="add"
      :style="{ bottom: addBottom + 'px' }"
      @click="addBox"
      v-show="!isBox"
    >
      <span class="iconfont icon-tianjia"></span>
    </div>
    <pop-up-box :title="messageTitle" @closeBox="changeBox" :isBox="isBox">
      <new-card
        :id="id"
        @closeBox="closeBox"
        v-if="cardSelected == -1"
      ></new-card>
      <card-detail
        v-if="cardSelected != -1"
        :card="note.data[cardSelected]"
      ></card-detail>
    </pop-up-box>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { wallType, label } from '@/utils/data'
import NoteCard from '@/components/NoteCard.vue'
import { note } from '../../../mock/index'
import PopUpBox from '@/components/PopUpBox.vue'
import NewCard from '@/components/NewCard.vue'
import CardDetail from '@/components/CardDetail.vue'

const id = ref(0) //留言墙与照片墙的切换id
const nWidth = ref(0)
const addBottom = ref(30) //添加按钮底部定位数字
const currentLabel = ref(-1)
const cardSelected = ref(-1) //当前选择的卡片

const messageTitle = ref('写留言')
let isBox = ref(false)

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
//关闭弹窗
const changeBox = () => {
  isBox.value = !isBox.value
}
const addBox = () => {
  messageTitle.value = '写留言'
  changeBox()
}
const closeBox = (data: any) => {
  console.log(data)
  isBox.value = !isBox.value
}

const selectCard = (index: any) => {
  if (cardSelected.value !== index) {
    messageTitle.value = ''
    cardSelected.value = index
    isBox.value = true
  } else {
    cardSelected.value = -1
    isBox.value = false
  }
}

onMounted(() => {
  noteWith()
  window.addEventListener('resize', noteWith)
  //监听滚动高度变化
  window.addEventListener('scroll', scrollBottom)
})
</script>

<style scoped lang="less">
.wall-message {
  min-height: 700px;
  padding-top: 52px;
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
