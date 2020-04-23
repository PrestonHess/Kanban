<template>
  <div class="list my-2 col-6 col-md-3">
    <div class="card ">
      <button
        type="button"
        class="close text-danger text-right pr-2 pt-1"
        @click="deleteList()"
      >
        <span>&times;</span>
      </button>
  <div class="card-body">
    
    <h5 class="card-title text-uppercase">{{listData.title}}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <Task v-for="Task in Tasks" :taskData="Task" :key="Task._id"> </Task>
  </ul>
  <div class="card-body">
    <!-- <button type="button" class="btn btn-danger" @click="deleteList()">Delete List</button> -->
    <form @submit.prevent="addTask()">
            <div class="form-group">
                <input type="text" name="newTask" id="" class="form-control form-control-sm" placeholder="enter task..." 
                aria-describedby="helpId" required v-model="newTask.title">
            <button type="submit" class="btn btn-secondary">Add Task</button>
            </div>
        </form>
  </div>
</div>

  </div>
</template>


<script>

import Task from '../components/Task'
export default {
  name: 'list',
  props: ['listData'],
  mounted(){
    this.$store.dispatch('getTasks', this.listData._id)
  },
  data(){
    return {
      newTask: {},
    } 
  },
  computed:{
    Tasks(){
      return this.$store.state.tasks[this.listData._id]
    }
  },
  methods:{
    deleteList() {
      this.$store.dispatch('deleteList', this.listData)
    },
    addTask(){
      this.newTask.listId = this.listData._id
      this.$store.dispatch('addTask', this.newTask)
      this.newTask = {}
    }
  },
  components:{
    Task,
  }
}
</script>


<style scoped>
</style>