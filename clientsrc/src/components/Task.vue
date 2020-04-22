<template>
    <li data-toggle="modal" :data-target="'#task-modal-'+taskData._id" class="task list-group-item">
      {{taskData.title}}
      <button
        type="button"
        class="close text-danger"
        @click="deleteTask(taskData)"
      >
        <span>&times;</span>
      </button>
    <TaskDetails :taskData="taskData"></TaskDetails>
    </li>
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
</style>