// 播放视频
<template>
  <div class="course-video">
    <!-- 导航 -->
    <van-nav-bar
      title="视频"
      left-text="返回"
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <!-- 视频播放容器 -->
    <div id="video-container"></div>
  </div>
</template>

<script>
import { getVideoInfo } from '@/services/course'
export default {
  name: 'CourseLesson',
  props: {
    lessonId: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.loadVideoInfo()
  },
  data () {
    return {

    }
  },
  methods: {
    async loadVideoInfo () {
      const { data } = await getVideoInfo({
        lessonId: this.lessonId
      })
      // 初始化播放器
      const player = new window.Aliplayer({
        // 容器id
        id: 'video-container',
        // 视频id
        vid: data.content.fileId,
        // 播放凭证
        playauth: data.content.playAuth,
        qualitySort: 'asc',
        format: 'mp4',
        mediaType: 'video',
        width: '100%',
        height: '100%',
        autoplay: true,
        isLive: false,
        rePlay: false,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true
      },
      function (player) {
        console.log(player, 'The player is created')
      }
      )
      console.log(player)
    }
  }
}
</script>

<style lang="scss" scoped>
.course-video {
  width: 100%;
  height: 210px;
  #video-container {
    width: 100%;
    height: auto;
  }
}
</style>
