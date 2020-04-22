<template>
  <div class="task">
    <li class="list-group-item">
      {{taskData.title}}
      <button
        type="button"
        class="close text-danger"
        @click="deleteTask(taskData)"
      >
        <span>&times;</span>
      </button>
    </li>
  </div>
</template>


<script>
export default {
  name: "task",
  props: ["taskData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
      deleteTask(task) {
          this.$store.dispatch('deleteTask', task)
      }
  },
  components: {}
};
</script>


<style scoped>
</style>