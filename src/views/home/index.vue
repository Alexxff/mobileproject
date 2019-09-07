<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar fixed="true" title="黑马头条" />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 ,不同的标签页下有不同的列表 -->
        <van-list v-model="currentChannel.loading" :finished="currentChannel.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="article in currentChannel.articles" :key="article.art_id.toString()" :title="article.title" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
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
      activeIndex: 0
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
        data.channels.forEach((channel) => {
          channel.timestamp = null
          channel.articles = []
          channel.loading = false
          channel.finished = false
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
.van-tabs{
  /deep/ .van-tabs__wrap{
    position:fixed;
    top:46px;
    left:0;
    z-index:100;
  }
  /deep/ .van-tabs__content{
    margin-top: 90px;
    margin-bottom: 50px;
  }
}

</style>
