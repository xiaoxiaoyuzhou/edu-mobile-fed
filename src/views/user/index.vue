<template>
  <div class="user">
    <!-- 顶部 -->
    <van-cell-group>
      <!-- 用户信息区域 -->
      <van-cell class="user-info" :border="false">
        <van-image
          width="50"
          height="50"
          :src="userInfo.portrait || 'https://s0.lgstatic.com/common/image/pc/default_boy_headpic1.png'"
        ></van-image>
        <div class="user-info-content">
          <h3>{{ userInfo.userName }}</h3>
          <span>
            <van-icon name="edit" />
            编辑个人资料
          </span>
        </div>
      </van-cell>
      <!-- 账户信息 -->
      <van-cell class="account-info" :border="false">
        <van-grid>
          <van-grid-item>
            <span class="title">14.05</span>
            <span>学习时长</span>
          </van-grid-item>
          <van-grid-item>
            <span class="title">200</span>
            <span>钱包/勾⾖</span>
          </van-grid-item>
          <van-grid-item>
            <span class="title">1</span>
            <span>优惠卷</span>
          </van-grid-item>
          <van-grid-item>
            <span class="title">213</span>
            <span>学分</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <!-- 底部菜单 -->
      <van-cell title="分销中心" icon="user-o" is-link value="收益200元" />
      <van-cell title="个性化设置" icon="setting-o" is-link />
      <van-cell title="我的下载" icon="down" is-link />
      <van-cell title="帮助与反馈" icon="question-o" is-link />
      <van-cell title="关于拉勾教育" icon="info-o" is-link value="v2.0.0" />
    </van-cell-group>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter'
import { getInfo } from '@/services/user'
export default {
  name: 'User',
  components: {
    LayoutFooter
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getInfo()
      console.log(data)
      if (data.state === 1) {
        this.userInfo = data.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 用户信息
.user-info {
  padding: 30px 20px 0;
  background-color: rgb(248, 150, 3);
  .van-cell__value {
    display: flex;
  }
  .user-info-content {
    padding-left: 15px;
    h3 {
      font-size: 18px;
      margin: 5px;
    }
  }
}
// 账户信息
.account-info {
  background-color: rgb(248, 150, 3);
  .van-cell__value {
    border-radius: 15px;
    .title {
      font-size: 22px;
      font-weight: 700;
    }
  }
}
</style>
