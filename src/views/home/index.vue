<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar fixed="true" title="黑马头条" />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 下拉加载更多组件 -->
        <van-pull-refresh
          :success-text="successText"
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
        >
          <!-- 文章列表 ,不同的标签页下有不同的列表 -->
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
              <div slot="label">
                <!-- grid显示封面 -->
                <van-grid v-if="article.cover.type" :border="false" :column-num="3">
                  <van-grid-item
                  v-for="(img,index) in article.cover.images"
                  :key="img+index">
                    <van-image lazy-load height="80" :src="img" >
                      <!-- 图片的加载提示 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                      <!-- 自定义加载失败提示 -->
                      <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>{{article.aut_name}}</span>&nbsp;
                  <span>{{article.comm_count}}</span>&nbsp;
                  <span>{{article.pubdate}}</span>
&nbsp;
                  <van-icon name="cross" class="close" @click="showMorteAction=true"/>
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层组件 -->
    <more-action v-model="showMorteAction"></more-action>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import Vue from 'vue'
import { Lazyload } from 'vant'
// 加载moreaction组件
import MoreAction from './components/MoreAction'
// options 为可选参数，无则不传
Vue.use(Lazyload)
export default {
  name: 'Home',
  components: {
    MoreAction
  },
  data () {
    return {
      // 列表用的数据
      list: [],
      loading: false,
      finished: false,
      // 频道列表
      channels: [],
      // tab组件中默认显示的tab项的索引(Index)
      // 通过该Index，可以找到当前的频道对象
      activeIndex: 0,
      // 下拉更新完毕之后显示的成功提示
      successText: '',
      showMorteAction: false
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    // 返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    async loadChannels () {
      try {
        const data = await getDefaultOrUserChannels()
        // 给所有的频道设置，时间戳和文章数组
        data.channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
          // 上拉加载
          channel.loading = false
          channel.finished = false
          // 下拉加载
          channel.pullLoading = false
        })
        // console.log(data)
        this.channels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    async onLoad () {
      // 发送请求
      // 获取当前频道对象,通过索引来获取 ---下面不需要写了，因为设置了一个当前频道的计算属性
      // const currentChannel = this.channels[this.activeIndex]
      const data = await getArticles({
        // 频道的id
        channelId: this.currentChannel.id,
        // 时间戳
        timestamp: this.currentChannel.timestamp || Date.now(),
        // 是否包含置顶1，0不包含
        withTop: 1
      })
      console.log(data)
      // 记录文章列表，记录最后一条数据的时间戳
      this.currentChannel.timestamp = data.pre_timestamp
      // console.log(data.results)
      this.currentChannel.articles.push(...data.results)
      // this.loading = false
      this.currentChannel.loading = false
      // 文章加载完毕
      if (data.results.length === 0) {
        // this.finished = true
        this.currentChannel.finished = true
      }
      // console.log(this.currentChannel.articles)
      // 当前对象中的时间戳
      // 当前频道对象的文章数组
      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    },
    // 下拉加载更多
    async onRefresh () {
      try {
        const data = await getArticles({
          channelId: this.currentChannel.id,
          // 时间戳
          timestamp: Date.now(),
          // 是否包含置顶1，0不包含
          withTop: 1
        })
        // 设置加载完成
        this.currentChannel.pullLoading = false
        // 把数据放到数组的最前面（最新数据）
        this.currentChannel.articles.unshift(...data.results)
        this.successText = `加载了${data.results.length}条数据`
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// .van-tabs /deep/ .van-tabs__content {
//   margin-top: 46px;
//   margin-bottom: 50px;
// }
// .van-tabs{
//    margin-top: 46px;
//    margin-bottom: 50px;
// }
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
.close {
  float: right;
}
</style>
