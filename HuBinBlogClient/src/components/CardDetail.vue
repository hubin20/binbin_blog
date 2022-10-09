<template>
  <div class="card-detail">
    <div class="top-bt">
      <p class="revoke-tag">联系墙主撕掉该便签</p>
      <p class="report">举报</p>
    </div>
    <note-card :note="card"></note-card>
    <div class="form">
      <textarea class="cmessage" placeholder="请输入..."></textarea>
      <div class="bt">
        <input class="cname" type="text" placeholder="签名" />
        <hb-button>确定</hb-button>
      </div>
    </div>
    <p class="title">评论{{ card.comment }}</p>
    <div class="comment">
      <div
        class="comment-li"
        v-for="(item, index) in comment.data"
        :key="index"
      >
        <div
          class="user-head"
          :style="{ backgroundImage: portrait[item.imgurl] }"
        ></div>
        <div class="comm-m">
          <div class="m-top">
            <p class="name">{{ item.name }}</p>
            <p class="time">{{ formatNewDate(item.moment, "YYYY.MM.DD") }}</p>
          </div>
          <div class="mm">{{ item.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteCard from "./NoteCard.vue";
import HbButton from "./HbButton.vue";
import { comment } from "../../mock/index";
import { portrait } from "@/utils/data";
import { formatNewDate } from "@/utils/date-format";

const props = defineProps({
  card: {
    type: Object,
    default: () => ({}),
  },
});
console.log(comment);
</script>

<style scoped lang="less">
.card-detail {
  position: relative;
  padding: 0 20px;
  .top-bt {
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px;
    display: flex;
    .revoke-tag {
      color: @primary-color;
      cursor: pointer;
      padding-right: 30px;
      font-size: @size-16;
    }
    .report {
      font-size: @size-16;
      color: @warning-color;
      cursor: pointer;
    }
  }
  .form {
    .cmessage {
      height: 56px;
      background: none;
      border: 1px solid rgba(148, 148, 148, 1);
      resize: none;
      padding: @padding-8;
      box-sizing: border-box;
      width: 100%;
      margin-top: 12px;
    }
    .bt {
      display: flex;
      padding-top: 6px;
      justify-content: space-between;
      .cname {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid rgba(148, 148, 148, 1);
        padding: @padding-8;
        background: none;
        line-height: 20px;
      }
    }
  }
  .title {
    font-weight: 600;
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .comment-li {
    display: flex;
    padding-bottom: 30px;
    .user-head {
      flex: none;
      width: 28px;
      height: 28px;
      border-radius: 20px;
      overflow: hidden;
    }
    .comm-m {
      padding-left: 8px;
    }
    .m-top {
      display: flex;
      align-items: center;
      .name {
        font-weight: 600;
      }
      .time {
        font-size: 12px;
        padding-left: 4px;
        color: @gray-3;
      }
    }
    .mm {
      padding-top: 4px;
    }
  }
}
</style>
