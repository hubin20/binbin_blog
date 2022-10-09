<template>
  <div id="box">
    <div
      class="login-main-box"
      :style="{ height: isLogin ? '364px' : '520px' }"
    >
      <div :class="isLogin ? 'login-box' : 'register-box'">
        <h2 @click="change(true)" class="loginbtn">登录</h2>
        <span>|</span>
        <h2 @click="change(false)" class="reguserbtn">注册</h2>
        <div class="item">
          <input
            type="text"
            name="username"
            v-model="username"
            @input="verifyUsername"
          />
          <label for="username">用户名</label>
          <div class="err-msg" v-show="errUsername">
            <el-icon><InfoFilled /></el-icon>
            用户名不能为空
          </div>
        </div>
        <div class="item" v-show="!isLogin">
          <input
            type="text"
            v-model="email"
            @input="verifyEmail"
            @blur="verifyTrue('email', 'errEmail')"
          />
          <label for="">邮箱</label>
          <div class="err-msg" v-show="errEmail">
            <i class="el-icon-info"></i>邮箱格式不正确
          </div>
        </div>
        <div class="item">
          <input
            type="password"
            v-model="password"
            @input="verifyPassword"
            @blur="verifyTrue('password', 'errPassword')"
          />
          <label for="">密码(8~12位字符)</label>
          <div class="err-msg" v-show="errPassword">
            <i class="el-icon-info"></i>密码不符合要求
          </div>
        </div>
        <div class="item" v-show="!isLogin">
          <input
            type="password"
            v-model="rePassword"
            @input="verifyRepassword"
            @blur="verifyTrue('rePassword', 'errRepassword')"
          />
          <label for="">确认密码</label>
          <div class="err-msg" v-show="errRepassword">
            <i class="el-icon-info"></i>两次密码不一致
          </div>
        </div>
        <el-checkbox class="checkBox" v-model="isKeepPassword" v-show="isLogin"
          >记住密码</el-checkbox
        >
        <button class="btn" @click="login" v-show="isLogin">
          登 录
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button class="btn" @click="register" v-show="!isLogin">
          注 册
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { useLoginStore } from '@/store/login/login'
import router from '@/router'
import localCache from '@/utils/cache'

const email = ref(localCache.getCache('email') || '') as any
const password = ref(localCache.getCache('password') || '') as any
const rePassword = ref('') as any
const username = ref(localCache.getCache('username') || '') as any
const isLogin = ref(true) as any
const errEmail = ref(false) as any
const errUsername = ref(false) as any
const errPassword = ref(false) as any
const errRepassword = ref(false) as any
const isKeepPassword = ref(
  localCache.getCache('isKeepPassword') || false
) as any

const store = useLoginStore()

const message = inject('message') as any

const login = async () => {
  let result = null
  if (!errEmail.value && !errPassword.value) {
    if (username.value === '') {
      message({
        message: '用户名不允许为空！',
        type: 'error'
      })
    } else if (password.value === '') {
      message({
        message: '密码不允许为空！',
        type: 'error'
      })
    } else {
      result = await store.accountLoginAction({
        username: username.value,
        password: password.value
      })
      if (result.status === 1) {
        message({
          message: '密码错误！',
          type: 'error'
        })
      } else {
        if (isKeepPassword.value) {
          localCache.setCache('email', email.value)
          localCache.setCache('password', password.value)
          store.token = result.token
          localCache.setCache('token', result.token)
          localCache.setCache('username', username.value)
          store.username = username.value

          localCache.setCache('isKeepPassword', isKeepPassword.value)
        } else {
          localCache.setCache('token', result.token)
          localCache.deleteCache('email')
          localCache.deleteCache('password')
          localCache.deleteCache('username')
          localCache.deleteCache('isKeepPassword')
        }
        router.push('/main/analysis/article-analysis')
        message({
          message: '登录成功！',
          type: 'success'
        })
      }
    }
  }
}

const change = (bool: any) => {
  isLogin.value = bool
  email.value = localCache.getCache('email') || ''
  password.value = localCache.getCache('password') || ''
  username.value = localCache.getCache('username') || ''
  rePassword.value = ''
  errEmail.value = false
  errPassword.value = false
  errUsername.value = false
  errRepassword.value = false
}

const register = async () => {
  let result = null
  if (
    !errEmail.value &&
    !errPassword.value &&
    !errUsername.value &&
    !errRepassword.value
  ) {
    if (username.value === '') {
      message({
        message: '用户名不允许为空！',
        type: 'error'
      })
    } else if (email.value === '') {
      message({
        message: '邮箱不允许为空！',
        type: 'error'
      })
    } else if (password.value === '') {
      message({
        message: '密码不允许为空！',
        type: 'error'
      })
    } else if (rePassword.value === '') {
      message({
        message: '确认密码不允许为空！',
        type: 'error'
      })
    } else {
      result = await store.accountRegisterAction({
        username: username.value,
        email: email.value,
        password: password.value,
        rePassword: rePassword.value
      })
      if (result.status === 1) {
        message({
          message: '注册失败！',
          type: 'error'
        })
      } else {
        isLogin.value = true
        message({
          message: '注册成功！',
          type: 'success'
        })
      }
    }
  }
}

// 失去焦点并且输入为空不显示校验信息
const verifyTrue = (content: any, state: any) => {
  if (content.value === '') {
    state.value = false
  }
}

const verifyEmail = () => {
  if (
    /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email.value)
  ) {
    errEmail.value = false
  } else {
    errEmail.value = true
  }
}
const verifyUsername = () => {
  if (username) {
    errUsername.value = false
  } else {
    errUsername.value = true
  }
}
const verifyPassword = () => {
  if (password.value.length >= 8 && password.value.length <= 12) {
    errPassword.value = false
  } else {
    errPassword.value = true
  }
}
const verifyRepassword = () => {
  if (password.value && password.value === rePassword.value) {
    errRepassword.value = false
  } else {
    errRepassword.value = true
  }
}
</script>

<style scoped lang="less">
.err-msg {
  color: #ffffff;
  font-size: 14px;
  margin-top: 5px;
  line-height: 2rem;
}

input,
button {
  background: transparent;
  border: 0;
  outline: none;
}

#box {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-image: url('../../assets/img/bg.jpg');
  /* background: linear-gradient(#141e30, #243b55); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #03e9f4;
  font-size: 16px;
  position: relative;
}

.login-main-box {
  width: 400px;
  height: 364px;
  background-color: #0c1622;
  border-radius: 10px;
  box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.6);
  padding: 40px;
  box-sizing: border-box;
  opacity: 0.8;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.login-box {
  position: absolute;
  width: 320px;
  animation: loginAnimation 1s;
}

.register-box {
  position: absolute;
  width: 320px;
  animation: registerAnimation 1s;
}

@keyframes loginAnimation {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }

  100% {
    /* transform: translateX(0px); */
    opacity: 1;
  }
}

@keyframes registerAnimation {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

h2 {
  /* text-align: center; */
  display: inline-block;
  color: aliceblue;
  margin-bottom: 30px;
  font-family: 'Courier New', Courier, monospace;
  cursor: pointer;
}
.loginbtn {
  margin-right: 100px;
}
.reguserbtn {
  margin-left: 100px;
}
.item {
  height: 45px;
  border-bottom: 1px solid #fff;
  margin-bottom: 40px;
  position: relative;
}

.item input {
  width: 100%;
  height: 100%;
  color: #fff;
  padding-top: 20px;
  box-sizing: border-box;
}

.item input:focus + label,
.item input:valid + label {
  top: 0px;
  font-size: 2px;
}

.item label {
  position: absolute;
  left: 0;
  top: 12px;
  transition: all 0.5s linear;
}

.btn {
  padding: 10px 50px;
  margin-right: 30px;
  color: #03e9f4;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;
  left: 30%;
}
.checkBox {
  color: #03e9f4;
}
.btn:hover {
  border-radius: 5px;
  color: #fff;
  /* background: #03e9f4; */
  box-shadow: 0 0 5px 0 #03e9f4, 0 0 25px 0 #03e9f4, 0 0 50px 0 #03e9f4,
    0 0 100px 0 #03e9f4;
  transition: all 500ms linear;
}

.btn > span {
  position: absolute;
}

.btn > span:nth-child(1) {
  width: 100%;
  height: 2px;
  background: -webkit-linear-gradient(left, transparent, #03e9f4);
  left: -100%;
  top: 0px;
  animation: line1 1s linear infinite;
}

@keyframes line1 {
  50%,
  100% {
    left: 100%;
  }
}

.btn > span:nth-child(2) {
  width: 2px;
  height: 100%;
  background: -webkit-linear-gradient(top, transparent, #03e9f4);
  right: 0px;
  top: -100%;
  animation: line2 1s 0.25s linear infinite;
}

@keyframes line2 {
  50%,
  100% {
    top: 100%;
  }
}

.btn > span:nth-child(3) {
  width: 100%;
  height: 2px;
  background: -webkit-linear-gradient(left, #03e9f4, transparent);
  left: 100%;
  bottom: 0px;
  animation: line3 1s 0.75s linear infinite;
}

@keyframes line3 {
  50%,
  100% {
    left: -100%;
  }
}

.btn > span:nth-child(4) {
  width: 2px;
  height: 100%;
  background: -webkit-linear-gradient(top, transparent, #03e9f4);
  left: 0px;
  top: 100%;
  animation: line4 1s 1s linear infinite;
}

@keyframes line4 {
  50%,
  100% {
    top: -100%;
  }
}
</style>
