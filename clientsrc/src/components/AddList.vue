<template>
  <div class="add-list">
    <div class="row justify-content-center">
      <div class="col-6">
        <small class="text-muted mx-2" for="title">Create New List</small>
        <form class="form-inline justify-content-center" @submit.prevent="addList()">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id
              class="mx-1 form-control form-control-sm"
              placeholder="enter title..."
              aria-describedby="helpId"
              required
              v-model="newList.title"
            />
            <button type="submit" class="mx-2 btn btn-sm btn-secondary">Add List</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "add-list",
  data() {
    return {
      newList: {}
    };
  },
  computed: {
    activeBoardId() {
      return this.$store.state.activeBoard._id;
    }
  },
  methods: {
    addList() {
      this.newList.boardId = this.activeBoardId;
      this.$store.dispatch("addList", this.newList);
      this.newList = {};
    }
  },
  components: {}
};
</script>


<style scoped>
</style>