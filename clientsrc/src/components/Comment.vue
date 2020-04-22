<template>
  <div class="Comment">
    <p>{{commentData.body}}</p>
  </div>
</template>


<script>
export default {
  name: 'Comment',
  props: ['commentData'],
  data(){ 
    return {}
  },
  computed:{

  },
  methods:{},
  components:{}
}
</script>


<style scoped>

</style>