<template>
  <div class="list my-2 col-6 col-md-3">
    <div class="card shadow">
      <div>
        <button type="button" class="close text-danger text-right pr-2 pt-1" @click="deleteList()">
          <span>&times;</span>
        </button>
      </div>
      <div class="card-body">
        <h3 class="card-title text-capitalize my-n4">{{listData.title}}</h3>
      </div>
      <ul class="list-group list-group-flush">
        <Task v-for="Task in Tasks" :taskData="Task" :key="Task._id"></Task>
      </ul>
      <div class="card-body">
        <!-- <button type="button" class="btn btn-danger" @click="deleteList()">Delete List</button> -->
        <form @submit.prevent="addTask()">
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" type="submit">+</button>
              </div>
              <input
                type="text"
                class="form-control"
                required
                placeholder="Add Task"
                v-model="newTask.title"
                aria-label
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Task from "../components/Task";
export default {
  name: "list",
  props: ["listData"],
  mounted() {
    this.$store.dispatch("getTasks", this.listData._id);
  },
  data() {
    return {
      newTask: {}
    };
  },
  computed: {
    Tasks() {
      return this.$store.state.tasks[this.listData._id];
    }
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listData);
    },
    addTask() {
      this.newTask.listId = this.listData._id;
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = {};
    }
  },
  components: {
    Task
  }
};
</script>


<style scoped>
.card-title {
  font-family: "Patrick Hand", cursive;
  text-decoration: underline;
}
</style>