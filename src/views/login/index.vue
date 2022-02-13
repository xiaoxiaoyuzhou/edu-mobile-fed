<template>
  <div class="Login">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { validator: checkPhone, message: '输入格式不正确，请检查'}
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^[a-zA-z0-9]{6,12}$/, message: '密码长度在6-12位间'}
        ]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block type="info"
          native-type="submit"
          :loading="isLoading"
        >提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/services/user'
export default {
  name: 'Learn',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoading: false
    }
  },
  methods: {
    // 导航事件
    onClickLeft () {
      this.$router.go(-1)
    },
    // 手机号格式校验
    checkPhone (value) {
      return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)
    },
    // 提交表单
    async onSubmit () {
      this.isLoading = true
      const { data } = await login(this.form)
      if (data.state === 1) {
        this.$toast.success('登录成功')
        // 将登录数据存储到本地
        this.$store.commit('setUser', data.content)
        // 跳转至登录前的页面
        this.$router.push(this.$route.query.fromPath || '/')
      } else {
        this.$toast.fail(data.message)
      }
      this.isLoading = false
    }
  }
}
</script>

<style>

</style>
