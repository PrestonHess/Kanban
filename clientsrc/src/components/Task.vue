<template>
  <div>
    <li class="task text-left pl-0 list-group-item">
      <div
        :data-target="'#task-modal-'+taskData._id"
        class="title"
        data-toggle="modal"
      >{{taskData.title}}</div>
      <button type="button" class="close text-secondary" @click="deleteTask(taskData)">
        <span>&#10005;</span>
      </button>
    </li>
    <TaskDetails :taskData="taskData"></TaskDetails>
  </div>
</template>


<script>
import TaskDetails from "./TaskDetails";
export default {
  name: "task",
  props: ["taskData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    },
    setActiveTask() {
      this.$store.dispatch("setActiveTask", this.taskData);
    }
  },
  components: {
    TaskDetails
  }
};
</script>


<style scoped>
.title {
  display: inline-block;
  padding-left: 1rem;
  font-family: "Fira Sans Condensed", sans-serif;
  font-weight: lighter;
  font-size: 1.1em;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  width: 90%;
}
span {
  font-size: 15px;
}
</style>