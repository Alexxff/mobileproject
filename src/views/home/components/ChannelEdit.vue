<template>
<van-popup
  v-model="show"
  position="bottom"
  :style="{ height: '80%' }"
>
hello
</van-popup>
</template>

<script>
export default {
  name: 'ChannelEdit',
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>
