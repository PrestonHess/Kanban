<template>
  <div class="boards container-fluid">
    WELCOME TO THE BOARDS!!!
    <div class="row justify-content-center">
      <div class="col-6">
        <form @submit.prevent="addBoard">
          <input
            type="text"
            class="form-control m-1"
            placeholder="Title"
            v-model="newBoard.title"
            required
          />
          <input
            type="text"
            class="form-control m-1"
            placeholder="Description"
            v-model="newBoard.description"
          />
          <button class="btn btn-secondary" type="submit">Create Board</button>
        </form>
      </div>
    </div>

    <div class="row justify-content-center">
    <div v-for="board in boards" :boardId="board._id" :key="board.id">
      <div class="card bg-light shadow p-3 m-3">
        <div class="card-body bg-light">
          <button type="button" class="close text-danger" @click="deleteBoard(board._id)">
          <span>&times;</span>
        </button>
          <router-link id="board-card"
            @click="setActiveBoard(board._id)"
            :to="{name: 'board', params: {boardId: board.id}}"
          >{{board.title}}</router-link>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    // deleteBoard(boardId) {
    //   this.$store.dispatch("deleteBoard", boardId)
    // }
  }
};
</script>

<style>
#board-card{
  color:black
}
</style>