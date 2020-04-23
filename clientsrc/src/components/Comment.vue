<template>
  <div class="Comment">
    <p>{{commentData.body}}
      <button
        type="button"
        class="close text-secondary"
        @click="deleteComment()"
      >
        <span>&#10005;</span>
      </button>
    </p>
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
  methods:{
    deleteComment() {
      this.$store.dispatch('deleteComment', this.commentData)
    }
  },
  components:{}
}
</script>


<style scoped>
span{
  font-size: 15px;
}
</style>