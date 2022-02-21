// 支付功能页
<template>
  <div class="pay">
    <van-cell-group>
      <van-cell class="course-info">
        <img :src="courseData.courseImgUrl" alt="">
        <div class="price-info">
          <div class="course-name" v-text="courseData.courseName"></div>
          <div class="discounts">￥{{ courseData.discounts }}</div>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <div>购买信息</div>
        <div>购买课程后使⽤此账号登录【拉勾教育】学习课程</div>
        <div class="username">当前账号：{{ $store.state.user.organization | retAccount }}</div>
      </van-cell>
      <van-cell class="pay-channel">
        <div class="title">
          <p>支付方式</p>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell @click="radio = '1'">
                <!-- 将左侧标题设置为插槽，添加对应⽀付图标 -->
                <template #title>
                  <img src="../../../public/wx.png" alt="">
                  <span>微信支付</span>
                </template>
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell @click="radio = '2'">
                <!-- 将左侧标题设置为插槽，添加对应⽀付图标 -->
                <template #title>
                  <img src="../../../public/zfb.png" alt="">
                  <span>支付宝支付</span>
                </template>
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <van-button @click="handlePay">￥{{ courseData.discounts }} ⽴即⽀付</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getCourseById } from '@/services/course'
import { createOrder, getPayInfo, initPayment, getPayResult } from '@/services/pay'
export default {
  name: 'Pay',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      courseData: {},
      // 支付方式
      radio: '1',
      // 订单号
      orderNo: null,
      // 支付方式信息
      payInfo: []
    }
  },
  created () {
    this.loadCourseInfo()
    // 创建订单
    this.loadOrder()
  },
  methods: {
    async loadCourseInfo () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      if (data.state === 1) {
        this.courseData = data.content
      }
    },
    // 创建订单
    async loadOrder () {
      const { data } = await createOrder({
        goodsId: this.courseId
      })
      if (data.state === 1) {
        this.orderNo = data.content.orderNo
        // 获取支付方式
        const { data: payInfo } = await getPayInfo({
          shopOrderNo: this.orderNo
        })
        if (data.state === 1) {
          this.payInfo = payInfo.content.supportChannels
        }
      }
    },
    // 支付请求
    async handlePay () {
      const { data } = await initPayment({
        goodsOrderNo: this.orderNo,
        channel: this.radio === '1' ? 'weChat' : 'aliPay',
        returnUrl: 'http://edufront.lagounews.com/',
        wxType: 0,
        source: '',
        userid: 0,
        clientIp: ''
      })
      if (data.state === 1) {
        // 接收响应地址，并进⾏跳转
        window.location.href = data.content.payUrl
        // 查询支付结果
        const timer = setInterval(async () => {
          const { data: payResult } = await getPayResult({
            orderNo: data.content.orderNo
          })
          // 如果⽀付结果成功，清除定时器，并提示购买成功，跳回到学习⻚
          if (payResult.content && payResult.content.status === 2) {
            clearInterval(timer)
            this.$toast.success('购买成功')
            this.$router.push({
              name: 'learn'
            })
          }
        }, 1000)
      }
    }
  },
  filters: {
    retAccount (data) {
      return data.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }
}
</script>

<style lang="scss" scoped>
.pay {
  position: absolute;
  width: 100%;
  height: 100%;
  .van-cell-group {
    width: 100%;
    height: 100%;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    // 课程信息
    .course-info {
      height: 170px;
      padding: 40px 20px 0;
      margin-bottom: 10px;
      box-sizing: border-box;
      .van-cell__value {
         display: flex;
         img {
           width: 80px;
           height: 107px;
           border-radius: 10px;
         }
         .price-info {
           height: 107px;
           padding: 5px 20px;
           box-sizing: border-box;
           display: flex;
           flex-direction: column;
           justify-content: space-between;
           .course-name {
             font-size: 16px;
           }
           .discounts {
             font-size: 22px;
             font-weight: 700;
             color: #ff7452;
           }
         }
      }
    }
    // 账户信息
    .account-info {
      height: 120px;
      margin-bottom: 10px;
      div:nth-child(2) {
        font-size: 12px;
        color: #999;
      }
      .username {
        margin: 20px 0 10px;
        font-size: 16px;
      }
    }
    // 支付信息
    .pay-channel {
      flex: 1;
      .van-cell__value {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .van-cell {
          padding: 20px 10px;
          img {
            width: 28px;
            height: 28px;
          }
          span {
            font-size: 16px;
            margin-left: 10px;
          }
          // 左侧标题插槽
          .van-cell__title {
            display: flex;
            align-items: center;
          }
          // 右侧 radio 选中颜⾊
          ::v-deep .van-radio__icon--checked .van-icon {
            background-color: #fbc546;
            border-color: #fbc546;
          }
        }
      }
      // 底部按钮样式
      .van-button {
        background: linear-gradient(270deg, #faa83e, #fbc546);
        border-radius: 20px;
        margin-bottom: 5px;
        font-size: 18px;
      }
    }
  }
}
</style>
