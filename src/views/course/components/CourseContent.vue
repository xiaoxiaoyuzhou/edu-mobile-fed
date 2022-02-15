<template>
  <div class="course-content">
    <!-- 顶部轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdlist" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 下拉列表展示课程部分 -->
    <course-content-list></course-content-list>
  </div>
</template>

<script>
import { getAllAds } from '@/services/course'
import CourseContentList from '@/components/CourseContentList.vue'
export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
  data () {
    return {
      // 轮播图列表
      adList: []
    }
  },
  created () {
    this.loadAds()
  },
  methods: {
    async loadAds () {
      const { data } = await getAllAds({ spaceKeys: '999' })
      if (data.state === 1) {
        this.adList = data.content[0].adDTOList
      }
    }
  },
  computed: {
    activeAdlist () {
      return this.adList.filter(item => item.status === 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-swipe {
  width: 100%;
  .van-swipe-item {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 170px;
  }
}
// 子组件样式根据父组件需求特异性设置，保证子组件的复用性
.course-content-list {
  top: 210px;
  bottom: 48px;
}
</style>
