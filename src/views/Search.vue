<template>
<div>
    <!-- 搜索框 -->
    <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch"
    @cancel="onCancel"
    background="#3e9df8"
    />
    <!-- 搜索提示 -->
    <van-cell-group>
        <van-cell title="单元格" icon="search"/>
        <van-cell title="单元格" icon="search"/>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group>
        <van-cell title="单元格">
            <!-- 自定义右侧内容 -->
            <div>
                <span>全部删除</span>&nbsp;
                <span>完成</span>&nbsp;
                <van-icon name="delete" size="18px"/>
            </div>
        </van-cell>
        <van-cell title="单元格">
            <van-icon name="close" size="18px"/>
        </van-cell>
    </van-cell-group>
</div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {},
    onCancel () {}
  }
}
</script>

<style>

</style>
