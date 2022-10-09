<template>
  <transition name="box">
    <div class="pop-up-box" v-if="isBox">
      <div class="phead">
        <p class="phead-name">{{ title }}</p>
        <span class="iconfont icon-guanbi" @click="closeBox"></span>
      </div>
      <div class="box-main">
        <slot class="slot"></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const emits = defineEmits(["closeBox"]);

const props = defineProps({
  title: {
    default: "标题",
  },
  isBox: {
    default: false,
  },
});

const closeBox = () => {
  emits("closeBox");
};
</script>

<style scoped lang="less">
.box {
  &-enter {
    &-from {
      transform: translateX(360px);
    }
    &-active {
      transition: all 0.2 ease-out;
    }
    &-to {
      transform: translateX(0px);
    }
  }
  &-leave {
    &-from {
      transform: translateX(0px);
    }
    &-active {
      transition: all 0.2 ease-in;
    }
    &-to {
      transform: translateX(360px);
    }
  }
}
.pop-up-box {
  width: 360px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 52px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);

  .phead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: @padding-20;
    box-sizing: border-box;

    .phead-name {
      font-size: 16px;
      color: @gray-1;
      font-weight: 600;
    }
    .icon-guanbi {
      color: @gray-2;
      cursor: pointer;
      padding-left: 8px;
    }
  }
  .box-main {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 116px;
    box-sizing: border-box;
    overflow-x: auto;
    margin: 2px;
  }
  .slot {
    height: 1200px;
    background: #eee;
  }
  .box-main::-webkit-scrollbar {
    //滚动条整体样式
    width: 4px;
    //宽高分别对应横竖滚动条的尺寸
    height: 4px;
  }
  .box-main::-webkit-scrollbar-thumb {
    //滚动条里面的小方块
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
  }
  .box-main::-webkit-scrollbar-track {
    //滚动条里面轨道
    border-radius: 4px;
    background: rgba(0, 0, 0, 0);
  }
}
</style>
