<template>
<el-popover trigger="hover" v-model="visible2">
  <div>
  <div slot="header">
    <span>商铺: {{data.title}}</span>
  </div>
  <div style="text-align: right; margin: 0">
    <el-button type="info" size="small" @click="visible2 = false" icon="el-icon-delete" circle></el-button>
    <el-button type="primary" size="small" icon="el-icon-message" @click="visible2 = false" circle></el-button>
  </div>

</div>

    <a slot="reference">{{data.title}}</a>
  </el-popover>
</template>

<script>
export default {
  name: 'Store',
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
