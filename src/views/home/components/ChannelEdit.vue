<template>
<van-popup
:value="value"
@input="$emit('input',$event)"
  position="bottom"
  :style="{ height: '90%' }"
>
<van-cell icon="cross" @click="$emit('input',false)"/>
    <!-- 我的代码 -->
    <van-cell title="我的频道" label="点击进入频道">
        <van-button
        round
        type="danger"
        size="mini"
        v-show="!isEdit"
        @click="isEdit=true"
        >编辑</van-button>
        <van-button
        round
        type="danger"
        size="mini"
        v-show="isEdit"
        @click="isEdit=false"
        >完成</van-button>
    </van-cell>
    <van-grid>
        <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
        >
        <!-- 关闭按钮 -->
        <van-icon
        slot="icon"
        class="close-icon"
        name="close"
        v-show="isEdit"
        />
        </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" label="点击添加频道"/>
    <van-grid>
        <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
        />
    </van-grid>
</van-popup>
</template>

<script>
export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      // 是否是编辑模式
      isEdit: false
    }
  }
}
</script>

<style lang="less" scoped>
.close-icon{
    position: absolute;
    right:0;
    top:0;
}
</style>
