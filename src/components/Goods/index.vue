<template>
<el-popover trigger="hover" v-model="visible2">
  <div>
  <div slot="header">
    <span>商品{{data.title}}</span>
  </div>
  

</div>

    <a slot="reference">{{data.title}}</a>
  </el-popover>
</template>

<script>
export default {
  name: 'Goods',
  data() {
    return {
      visible2: false,
    }
  },
  props:{
    data:{
      type    : Object,
      required: true
    },
    className:{
      type: String
    }
  },
  computed:{

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
