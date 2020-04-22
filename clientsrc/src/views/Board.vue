<template>
  <div class="Board container-fluid ">
    <h1 v-if="board.title" class="text-capitalize">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <AddList> </AddList>
    <div class="row my-2 justify-content-around">
      <list v-for="list in lists" :listData="list" :key="list._id"></list>
    </div>
  </div>
</template>

<script>
  import AddList from "../components/AddList"
  import List from "../components/List"
export default {
  name: "Board",
  mounted() {
    this.$store.dispatch('setActiveBoard', this.$route.params.boardId)
    this.$store.dispatch('getLists', this.$route.params.boardId)
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  props: ["boardId"],
  components:{
    AddList,
    List
  }
};
</script>
