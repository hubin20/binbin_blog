<template>
  <div class="new-card">
    <div class="card-color">
      <p
        class="color-li"
        v-for="(item, index) in cardColor1"
        :key="index"
        :style="{ background: item }"
        :class="{ colorSelected: index == colorSelected }"
        @click="changeColor(index)"
      ></p>
    </div>
    <div class="card-main" :style="{ background: cardColor[colorSelected] }">
      <textarea
        placeholder="留言..."
        class="cmessage"
        maxlength="96"
        v-model="cmessage"
      ></textarea>
      <input type="text" placeholder="签名" class="cname" v-model="cname" />
    </div>
    <div class="labels">
      <p class="title">选择标签</p>
      <div class="label">
        <p
          v-for="(item, index) in label[id]"
          :key="index"
          class="label-li"
          :class="{ labelSelected: index == labelSelected }"
          @click="changeLabel(index)"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div>
      <p class="title">免责声明</p>
      <p class="mzsm">
        斌斌时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
        1、反对宪法所确定的基本原则的；<br />
        2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br />
        3、损害国家荣誉和利益的；<br />
        4、煽动民族仇恨、民族歧视，破坏民族团结的；<br />
        5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
        6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
        7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
        8、侮辱或者诽谤他人，侵害他人合法权益的；<br />
        9、含有法律、行政法规禁止的其他内容的信息。<br />
      </p>
    </div>
    <div class="footBtn">
      <hb-button size="max" nom="secondary" @click="closeBox(0)"
        >丢弃</hb-button
      >
      <hb-button size="max" class="submit">确定</hb-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { cardColor, cardColor1, label } from "@/utils/data";
import HbButton from "@/components/HbButton.vue";

defineProps({
  id: {
    type: Number,
    default: 0,
  },
});

const colorSelected = ref(0);
const labelSelected = ref(0);

const cmessage = ref(""); //留言信息
const cname = ref(""); //签名

const changeColor = (index: any) => {
  colorSelected.value = index;
};

const changeLabel = (index: any) => {
  labelSelected.value = index;
};
//关闭弹窗
const emits = defineEmits(["closeBox"]);

const closeBox = (data: any) => {
  emits("closeBox", data);
};
</script>

<style scoped lang="less">
.new-card {
  position: relative;
  padding: 0 @padding-20 120px;
  .card-color {
    padding-bottom: @padding-12;
    display: flex;
    align-items: center;
    .color-li {
      width: 24px;
      height: 24px;
      margin-right: @padding-8;
      cursor: pointer;
    }
    .colorSelected {
      border: 1px solid @primary-color;
    }
  }
  .card-main {
    height: 240px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    transition: @tr;
    .cmessage {
      background: none;
      border: none;
      resize: none;
      padding: @padding-8;
      box-sizing: border-box;
      height: 172px;
      width: 100%;
      font-family: fa;
      font-weight: 600;
      font-size: 15px;
    }
    .cname {
      width: 100%;
      box-sizing: border-box;
      padding: @padding-8;
      background: none;
      border: 1px solid #fff;
      line-height: 20px;
      font-family: fa;
      font-weight: 600;
      font-size: 15px;
    }
  }
  .title {
    color: @gray-1;
    font-weight: 600;
    padding-top: 30px;
  }
  .label {
    display: flex;
    flex-wrap: wrap;
    width: 320px;
    .label-li {
      padding: 2px 10px;
      border-radius: 20px;
      margin: 16px 4px 0 0;
      cursor: pointer;
      color: @gray-2;
      transition: @tr;
    }
    .labelSelected {
      background: #ebebeb;
      font-weight: 600;
      color: @gray-1;
    }
  }
  .mzsm {
    padding-top: 10px;
    font-size: 12px;
    color: @gray-3;
  }
  .footBtn {
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 52px;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    .submit {
      margin-left: 20px;
      width: 200px;
    }
  }
}
</style>
