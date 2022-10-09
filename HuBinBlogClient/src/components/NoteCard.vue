<template>
  <div
    class="hb-node-card"
    :style="{ width: width, background: cardColor[card.imgurl] }"
  >
    <div class="top">
      <p class="time">{{ formatNewDate(card.moment, "YYYY.MM.DD") }}</p>
      <p class="label">{{ label[card.type][card.label] }}</p>
    </div>
    <p class="message">
      {{ card.message }}
    </p>
    <div class="foot">
      <div class="foot-left">
        <div class="icon">
          <span class="iconfont icon-aixin1"></span>
          <span class="value">{{ card.like }}</span>
        </div>
        <div class="icon">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">{{ card.comment }}</span>
        </div>
      </div>
      <div class="name">{{ card.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { label, cardColor } from "@/utils/data";
import { formatNewDate } from "@/utils/date-format";
const props = defineProps({
  width: {
    default: "100%",
  },
  note: {
    type: Object,
    default: () => ({}),
  },
});

const card = computed(() => {
  return props.note;
});
</script>

<style scoped lang="less">
.hb-node-card {
  height: 240px;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    p {
      font-size: 12px;
      color: @gray-3;
    }
  }
  .message {
    height: 140px;
    font-family: fa;
    font-size: 15px;
    color: @gray-1;
    cursor: pointer;
  }
  .foot {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 16px;
    left: 0;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    .foot-left {
      display: flex;
      .value {
        font-size: @size-12;
        color: @gray-3;
        line-height: 16px;
        padding-left: @padding-4;
      }
      .iconfont {
        font-size: 16px;
        color: @gray-3;
      }
      .icon {
        padding-right: @padding-8;
        display: flex;
        align-items: center;
        .icon-aixin1 {
          cursor: pointer;
          &:hover {
            transition: @tr;
            color: @like-color;
          }
        }
      }
    }
  }
  .name {
    font-family: fa;
    font-size: 17px;
    color: @gray-1;
    font-weight: 500;
  }
}
</style>
