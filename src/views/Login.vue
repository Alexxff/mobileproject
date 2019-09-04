<template>
  <div>
      <!-- 导航头 -->
      <van-nav-bar title="登录" />

          <!-- 输入框 -->
          <van-cell-group>
              <!-- <使用VeeValidate
              1.通过V-validate设置验证的规则
              2.设置文本框的name属性
              3.展示验证错误信息
              > -->
              <van-field v-validate="'required|digits:11'"
              name="mobile"
              :error-message="errors.first('mobile')"
              clearble
              v-model="user.mobile"
              left-icon="phone-o"
              placeholder="请输入手机号"/>
              <!-- <van-field v-model="user.code" left-icon="star-o" placeholder="请输入验证码"> -->
              <!-- <van-button slot="button" type="default" size="small">发送验证码</van-button> -->
              <van-field
              v-validate="'required|digits:6'"
              name="code"
              :error-message="errors.first('code')"
              v-model="user.code"
              left-icon="star-o"
              placeholder="请输入验证码">
              <van-button slot="button" type="default" size="small"></van-button>
              </van-field>
          </van-cell-group>
          <!-- 登录按钮 -->
          <div class="login-btn">
            <van-button class="btn" type='info' @click="handleLogin">登录</van-button>
          </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  created () {
    // 配置VeeValidatede 自定义验证信息
    const dict = {
      custom: {
        // 验证的文本框
        mobile: {
          // 验证规则失败之后的提示消息
          required: '请输入手机号',
          digits: '手机号码必须是11位的数字'
        },
        code: {
          required: '请输入验证码',
          digits: '验证码必须是6位的数字'
        }
      }
    }
    this.$validator.localize('custom', dict)
  },
  methods: {
    ...mapMutations(['setUser']),
    // 点击按钮,登录处理
    async handleLogin () {
      try {
        // // 表单验证
        // this.$validator.validate().then(async valid => {
        //   // 验证失败
        //   if (!valid) {
        //     return
        //   }
        //   // 验证成功
        //   const data = await login(this.user)
        //   // 存储登录的状态
        //   this.setUser(data)
        //   // 跳转到首页
        //   this.$router.push('/')
        //   this.$toast.success('登录成功')
        // })
        // // const res = await login(this.user)
        // // console.log(res)
        // // data就是接口返回数据中的data(响应拦截器做了处理)
        // const data = await login(this.user)
        // // 存储登录的状态

        // // console.log(data)
        // // 1.vuex
        // this.$store.commit('setUser', data)
        // // 2.本地存储
        // // --- 以上两件事儿 都是在store中完成----
        // // this.$store.commit('setUser', data)
        // this.setUser(data)
        // // 跳转到首页
        // this.$router.push('/')
        // this.$toast.success('登录成功')

        // validate()返回的是promise对象所以可以使用await调用,
        const valid = await this.$validator.validate()
        // 验证失败
        if (!valid) {
          return
        }
        // 验证成功
        const data = await login(this.user)
        // 存储登录的状态
        this.setUser(data)
        // 跳转到首页
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (err) {
        // console.log(err)
        this.$toast.success('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn{
  padding:20px;
  .btn{
    width:100%;
  }
}
</style>
