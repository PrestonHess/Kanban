<template>
  <div class="list my-2  col-lg-4 col-md-6 col-sm-12 ">
    <div class="card shadow">
      <div>
        <button type="button" class="close text-danger text-right pr-2 pt-1" @click="deleteList()">
          <span>&times;</span>
        </button>
      </div>
      <div class="card-body ct-border">
        <h4 class="card-title text-capitalize my-n4">{{listData.title}}</h4>
      </div>
      <ul class="list-group list-group-flush">
        <Task v-for="Task in Tasks" :taskData="Task" :key="Task._id"></Task>
      </ul>
      <div class="card-body">
        <form @submit.prevent="addTask()">
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" type="submit">&#10148;</button>
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
font-family: 'Fira Sans Condensed', sans-serif;
  /* text-decoration: underline; */
}
.ct-border{
  /* border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px;
  border-style: double;
  border-color: black; */
  border-bottom: 1px dotted rgb(71, 71, 71)
}
</style>