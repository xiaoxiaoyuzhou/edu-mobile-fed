// 课程章节组件
<template>
  <div class="section-and-lesson">
    <!-- 章节 -->
    <h2 class="section" v-text="sectionData.sectionName"></h2>
    <!-- 课时 -->
    <p
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      class="lesson"
      @click="handleClick(item)"
    >
      <!-- 课时标题 -->
      <span v-text="item.theme"></span>
      <!-- 课时标题，使用 Vant icon 图标 -->
      <van-icon v-if="item.canPlay" name="play-circle" size="20" />
      <van-icon v-else name="lock" size="20" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'CourseSectionAndLesson',
  props: {
    // 章节数据
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick (lessonData) {
      if (lessonData.canPlay) {
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lessonData.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-and-lesson {
  padding: 0 20px;
  .lesson {
    display: flex;
    justify-content: space-between;
  }
}
</style>
