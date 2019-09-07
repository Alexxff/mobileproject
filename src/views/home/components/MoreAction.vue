<template>
 <van-dialog
 v-model="show"
 :showConfirmButton="false"
 closeOnClickOverlay
 >
hello
 </van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>
