<template>
  <div class="list my-2 col-6 col-md-3">
    <div class="card">
  <div class="card-body">
    <h5 class="card-title">{{listData.title}}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Task 1</li>
    <li class="list-group-item">Task 2</li>
    <li class="list-group-item">Task 3</li>
  </ul>
  <div class="card-body">
    <button type="button" class="btn btn-danger" @click="deleteList()">Delete List</button>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>

  </div>
</template>


<script>
export default {
  name: 'list',
  props: ['listData'],
  data(){
    return {}
  },
  computed:{},
  methods:{
    deleteList() {
      this.$store.dispatch('deleteList', this.listData)
    }
  },
  components:{}
}
</script>


<style scoped>
</style>