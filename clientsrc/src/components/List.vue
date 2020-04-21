<template>
  <div class="list my-2 col-6 col-md-3">
    <div class="card">
  <div class="card-body">
    <h5 class="card-title">{{listData.title}}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <Task v-for="Task in Tasks" :taskData="Task" :key="Task._id"> </Task>
  </ul>
  <div class="card-body">
    <button type="button" class="btn btn-danger" @click="deleteList()">Delete List</button>
    <form @submit.prevent="addTask()">
            <div class="form-group">
                <label for="newTask">Add Task</label>
                <input type="text" name="newTask" id="" class="form-control" placeholder="enter task..." 
                aria-describedby="helpId" required v-model="newTask.title">
            </div>
            <button type="submit" class="btn btn-secondary">Add Task</button>
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