<template>
  <div class="Comment">
    <p>{{commentData.body}}
      <button
        type="button"
        class="close text-danger"
        @click="deleteComment()"
      >
        <span>&times;</span>
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

</style>