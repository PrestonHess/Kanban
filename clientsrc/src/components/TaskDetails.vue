<template>
  <div class="TaskDetails">
    <div
      class="modal fade"
      :id="'task-modal-'+taskData._id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{{taskData.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <Comment v-for="Comment in comments" :commentData="Comment" :key="Comment._id"></Comment>
            <form class="form-inline justify-content-center" @submit.prevent="addComment()">
              <div class="form-group">
                <input
                  type="text"
                  name="comment"
                  id
                  class="mx-1 form-control form-control-sm"
                  placeholder="enter comment..."
                  aria-describedby="helpId"
                  required
                  v-model="comment.body"
                />
                <button type="submit" class="mx-2 btn btn-sm btn-secondary mt-2">Add Comment</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Move Task</button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div v-for="list in lists" :key="list._id">
                  <a class="text-center dropdown-item" v-if="list._id != taskData.listId" data-dismiss="modal" @click.prevent="changeTask(list)">{{list.title}}</a>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Comment from "./Comment.vue";
export default {
  name: "TaskDetails",
  props: ["taskData"],
  data() {
    return {
      comment: {}
    };
  },
  mounted() {
    this.$store.dispatch("getComments", this.taskData._id);
  },
  computed: {
    lists() {
      return this.$store.state.lists
    },
    activeTask() {
      return this.$store.state.activeTask;
    },
    comments() {
      return this.$store.state.comments[this.taskData._id];
    }
  },
  methods: {
    addComment() {
      this.comment.taskId = this.taskData._id;
      this.$store.dispatch("addComment", this.comment);
      this.comment = {};
    },
    changeTask(list) {
      let listIDs = {
        oldListId : this.taskData.listId,
        newListId : list._id,
        taskId: this.taskData._id
      }
      console.log(listIDs)
      this.$store.dispatch('changeTask', listIDs);
      // this.$store.dispatch('getTasks', this.key)
    }
  },
  components: {
    Comment
  }
};
</script>


<style scoped>
.modal-footer {
      justify-content: space-between;
}
.dropdown-item {
  cursor: pointer;
}
</style>