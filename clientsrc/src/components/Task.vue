<template>
  <div>
    <li class="task text-left pl-0 list-group-item">
      <div :data-target="'#task-modal-'+taskData._id" class="title" data-toggle="modal">
      {{taskData.title}}
      </div>
      <button
        type="button"
        class="close text-danger"
        @click="deleteTask(taskData)"
      >
        <span>&times;</span>
      </button>
    </li>
    <TaskDetails :taskData="taskData"></TaskDetails>
  </div>
</template>


<script>
import TaskDetails from "./TaskDetails"
export default {
  name: "task",
  props: ["taskData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
      deleteTask() {
          this.$store.dispatch('deleteTask', this.taskData)
      },
      setActiveTask() {
          this.$store.dispatch('setActiveTask', this.taskData)
      }
  },
  components: {
      TaskDetails
  }
};
</script>


<style scoped>
.title{
  display: inline;
  padding: 1rem;
  font-family: 'Patrick Hand', cursive;
  font-size: 1.2em
}
</style>