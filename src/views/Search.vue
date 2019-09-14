<template>
<div>
    <!-- 搜索框 -->
    <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch"
    @cancel="onCancel"
    @input="handleInput"
    clearable
    background="#3e9df8"
    />
    <!-- 搜索提示 -->
    <van-cell-group v-show="value">
        <van-cell v-for="item in suggestionList" :key="item" :title="item" icon="search"/>
        <!-- <van-cell title="单元格" icon="search"/> -->
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
        <van-cell title="单元格">
            <!-- 自定义右侧内容 -->
            <div v-show="isEdit" style="display:inline-block">
                <span>全部删除</span>&nbsp;
                <span @click="isEdit=false">完成</span>&nbsp;
            </div>
            <van-icon v-show="!isEdit" @click="isEdit=true" name="delete" size="18px"/>
        </van-cell>
        <van-cell title="单元格">
            <van-icon v-show="isEdit" name="close" size="18px"/>
        </van-cell>
    </van-cell-group>
</div>
</template>

<script>
import { getSuggestion } from '@/api/search'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      // 存储搜索建议
      suggestionList: [],
      // 编辑模式
      isEdit: false
    }
  },
  methods: {
    onSearch () {},
    onCancel () {},
    // 在文本框输入的过程中获取搜索提示
    async handleInput () {
      // 判断是否为空
      if (this.value.length === 0) {
        return
      }
      try {
        const data = await getSuggestion(this.value)
        this.suggestionList = data.options
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
