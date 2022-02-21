// 课程详情
<template>
  <div class="course-info">
    <!-- 如果已购，去除底部⽀付区域并设置主体内容区域占满屏幕 -->
    <van-cell-group :style="styleOptions">
      <!-- 课程图片 -->
      <van-cell class="course-img">
        <img :src="courseDetailInfo.courseImgUrl" alt="">
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-desctription">
        <!-- 名称 -->
        <h2 v-text="courseDetailInfo.courseName"></h2>
        <!-- 概述 -->
        <p v-text="courseDetailInfo.previewFirstField"></p>
        <!-- 销售信息 -->
        <div class="course-saleInfo">
          <p class="course-price">
            <span class="discounts">￥{{ courseDetailInfo.discounts }}</span>
            <span>￥{{ courseDetailInfo.price }}</span>
          </p>
          <span class="tag">{{ courseDetailInfo.sales }}⼈已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <!-- 课程详细内容 -->
      <van-cell class="course-detail">
        <!-- 选项卡 -->
        <van-tabs sticky>
          <van-tab title="详情">
            <!-- 详情在后台是通过富⽂本编辑器设置的，内容为 HTML ⽂本 -->
            <div v-html="courseDetailInfo.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <!-- 章节组件 -->
            <course-section-and-lesson
              v-for="item in sections"
              :key="item.id"
              :section-data="item"
            ></course-section-and-lesson>
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!courseDetailInfo.isBuy">
      <div class="price">
        <span v-text="courseDetailInfo.discountsTag"></span>
        <span class="discounts">￥{{ courseDetailInfo.discounts }}</span>
        <span>￥{{ courseDetailInfo.price }}</span>
      </div>
      <van-button
        type="primary"
        @click="handlePay"
      >立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { getCourseById, getSectionAndLesson } from '@/services/course'
import CourseSectionAndLesson from './components/CourseSectionAndLesson.vue'
export default {
  name: 'CourseInfo',
  props: {
    courseId: {
      type: [String, Number],
      reuired: true
    }
  },
  components: {
    CourseSectionAndLesson
  },
  data () {
    return {
      // 课程明细信息
      courseDetailInfo: {},
      // 章节信息
      sections: [],
      // 样式信息
      styleOptions: {}
    }
  },
  created () {
    this.loadCourseInfo()
    // 加载章节信息
    this.loadSection()
  },
  methods: {
    async loadCourseInfo () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      if (data.state === 1) {
        this.courseDetailInfo = data.content
        if (data.content.isBuy) {
          this.styleOptions.bottom = 0
        }
      }
    },
    async loadSection () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      if (data.state === 1) {
        this.sections = data.content.courseSectionList
      }
    },
    handlePay () {
      // 检测是否登录
      if (this.$store.state.user) {
        // 跳转支付页
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        // 跳转登录页
        this.$router.push({
          name: 'login',
          query: {
            fromPath: this.$route.fullPath
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  padding: 0;
}
.course-img {
  height: 280px;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.course-desctription {
  padding: 10px 20px;
  height: 150px;
  h2 {
    padding: 0;
  }
  .course-saleInfo {
    display: flex;
    .course-price {
      flex: 1;
      margin: 0;
    }
    .tag {
      line-height: 15px;
      background: #f8f9fa;
      border-radius: 2px;
      padding: 7px 8px;
      font-size: 12px;
      font-weight: 700;
      color: #666;
      margin-left: 10px;
    }
  }
}
// 修改范围，全局使用
.discounts {
  color: #ff7452;
  font-size: 24px;
  font-weight: 700;
}
.van-cell-group {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}
// 调整底部支付部分样式
.van-tabbar {
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  .van-button {
    width: 50%;
    height: 80%;
  }
}
span {
  font-size: 14px;
}
</style>
