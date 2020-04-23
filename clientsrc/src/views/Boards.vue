<template>
  <div class="boards container-fluid">
    Board View: 
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
            v-model="newBoard.description" required
          />
          <button class="btn btn-color mt-2" type="submit">Create Board</button>
        </form>
      </div>
    </div>

    <div class="row justify-content-center">
    <div class="" v-for="board in boards" :boardId="board._id" :key="board.id">
      <div class="card  shadow p-3 m-3">
        <div>
          <button type="button" class="close text-danger button-styling " @click="deleteBoard(board._id)">
          <span>&times;</span>
        </button>
        </div>
        <div class="card-body mt-n3 ">
          <router-link id="board-card" class="font-sans text-capitalize text-overflow text-dark"
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
    deleteBoard(boardId) {
      this.$store.dispatch("deleteBoard", boardId)
    }
  }
};
</script>

<style>
#board-card{
  color:rgb(93, 93, 93);
  
}
.card{
  background-color: #ffffff
}
.font-sans{
font-family: 'Spartan', sans-serif;
font-weight: bold;
font-size: 1em;
}
#board-card:hover{
  text-decoration: none;
  color:rgb(42, 42, 42)
}
.button-styling{
  max-width: 30px;
  
}
.text-overflow{
   white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 15em;
  min-width: 8em;
}
.btn-color{
  background-color: #5f4c4f;
  color: white
}
</style>