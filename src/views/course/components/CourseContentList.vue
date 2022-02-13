<template>
  <div class="course-content-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <!-- 课程展示列表组件 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item,index) in courseList"
          :key="index"
        >
          <div>
            <img :src="item.courseImgUrl" alt="">
          </div>
          <div class="course-info">
            <h3 v-text="item.courseName"></h3>
            <p class="course-preview" v-html="item.previewFirstField"></p>
            <p class="course-container">
              <span class="course-discounts">￥{{ item.discounts }}</span>
              <s class="course-price">￥{{ item.price }}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getQueryCourses } from '@/services/course'
export default {
  name: 'CourseContentList',
  data () {
    return {
      // 是否进行加载
      loading: false,
      // 是否加载完成
      finished: false,
      courseList: [],
      currentPage: 1,
      // 下拉刷新状态
      refreshing: false
    }
  },
  methods: {
    // 下拉刷新
    async onRefresh () {
      // 恢复页数
      this.currentPage = 1
      const { data } = await getQueryCourses({
        currentPage: this.currentPage,
        pageSize: 10,
        courseName: '',
        status: 1
      })
      // 重新装载列表数据
      if (data.content && data.content.records && data.content.records.length !== 0) {
        this.courseList = data.content.records
      }
      this.refreshing = false
      this.$toast.success('刷新成功')
    },
    // 列表加载数据
    async onLoad () {
      const { data } = await getQueryCourses({
        currentPage: this.currentPage,
        pageSize: 10,
        courseName: '',
        status: 1
      })
      if (data.state === 1) {
        if (data.content && data.content.records && data.content.records.length !== 0) {
          this.courseList.push(...data.content.records)
        }
      }
      // 页数
      this.currentPage++
      // 加载状态
      this.loading = false
      // 数据全部加载完成
      if (data.content.records.length < 10) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-content-list {
  position: fixed;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
// 课程项样式
.van-cell__value {
  display: flex;
  height: 100px;
  padding: 10px 0;
  img {
    width: 75px;
    height: 100%;
  }
  .course-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    h3, p {
      margin: 0;
      padding: 0;
    }
    .course-preview {
      flex-grow: 1;
      color: gray;
    }
    .course-discounts {
      color: #ff7452;
      margin-right: 10px;
    }
  }
}
</style>
