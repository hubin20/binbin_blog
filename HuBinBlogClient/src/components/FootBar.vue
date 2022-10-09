<template>
  <div class="foot-bar">
    <div class="foot-bar-inner">
      <div class="foot-left">
        <div class="logo">
          <img src="@/assets/img/yksg.svg" class="logo-img" />
          <p class="logo-name">斌斌博客</p>
        </div>
        <p class="top-p">
          斌斌博客是本人独自开发的，为便于自身学习总结与交流的平台。
        </p>
        <p class="top-p">自身学习分享，总结，照片分享，音乐分享。</p>
        <p class="state">
          <span>声明</span><span>备案/许可证粤ICP备19012866号</span
          ><span>网站备案/许可证粤ICP备19012866号-1</span>
        </p>
      </div>
      <div class="link">
        <p class="title">链接</p>
        <div class="line-inner">
          <a href="http://43.138.167.206:8094" target="_blank" class="link-name"
            >斌斌博客简陋版</a
          >
          <a
            href="https://space.bilibili.com/2430218?spm_id_from=333.1007.0.0"
            target="_blank"
            class="link-name"
            >b站</a
          >
        </div>
      </div>
      <div class="foot-right">
        <p class="title">打赏</p>
        <div class="right-inner">
          <div>
            <img src="@/assets/img/wxzf.jpg" alt="" />
            <p class="ds-title">微信支付</p>
          </div>
          <div>
            <img src="@/assets/img/zfbzf.jpg" alt="" />
            <p class="ds-title">支付宝支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.foot-bar {
  width: 100%;
  height: 200px;
  background: @gray-1;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 40px;
}
.foot-bar-inner {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  p {
    color: rgba(255, 255, 255, 0.5);
  }
}
.foot-left {
  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .logo-name {
      font-size: 20px;
      color: @gray-10;
      font-weight: 600;
      padding-left: 10px;
    }
  }
  .top-p {
    font-size: @size-12;
    padding-bottom: 4px;
    width: 400px;
  }
  .state {
    font-size: @size-12;
    padding-top: 26px;
    span {
      padding-right: 20px;
    }
  }
}
.title {
  font-size: @size-16;
  padding-bottom: 12px;
}
.link {
  padding: 0 40px;
  flex: 1;
  .line-inner {
    a {
      color: rgba(255, 255, 255, 0.5);
      padding-right: @padding-20;
      font-size: @size-12;
    }
  }
}
.foot-right {
  .right-inner {
    display: flex;
    img {
      width: 100px;
      padding-right: 40px;
    }
    .ds-title {
      font-size: @size-12;
      padding-top: 8px;
    }
  }
}
</style>
