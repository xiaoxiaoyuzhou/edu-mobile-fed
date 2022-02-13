<template>
  <div class="course-header">
    <van-image
      :src="require('@/assets/logo.png')"
    />
  </div>
</template>

<script>
export default {
  name: 'CourseHeader'
}
</script>

<style lang="scss" scoped>
.course-header {
  display: flex;
  height: 50px;
  align-items: center;
}
.van-image {
  width: 180px;
  margin-left: -20px;
}
</style>
