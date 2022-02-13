<template>
  <div class="layout-footer">
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to='/' icon='orders-o'>选课</van-tabbar-item>
      <van-tabbar-item replace to='/learn' icon='desktop-o'>学习</van-tabbar-item>
      <van-tabbar-item replace to='/user' icon='user-o'>我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooter',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
