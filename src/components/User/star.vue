<template>
<span :class="className" v-html="htmlrow" style="color:red">
</span>
</template>
<script>
export default {
  name: 'Star',
  data() {
    return {
      htmlrow: (this.fen?(this.data+' '):'')+this.fetchData(this.data),
    }
  },
  methods: {
    fetchData(nub) {
        if(nub<=5)return '<i class="iconfont icon-star-1"></i>';
        return this.echoStar(nub,1);
        //
    },
    echoStar(nub,pow){
        if(pow>9) return ''
        let nub1 = Math.ceil(nub/Math.pow(5,pow))
        let str  = '';
        if(nub1>=5 && pow<9){
            return this.echoStar(nub,pow+1)
            nub1 = nub1%5
        }
        for (let index = 0; index < nub1; index++) {
            str += '<i class="iconfont icon-star-'+pow+'"></i>';
        }
        return str
    }
  },
  props: {
    data:{
      type    : Number,
      required: true     /**必须字段 */
    },
    fen:{
      type   : Boolean,
      default: true
    },
    className:{
      type: String
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

