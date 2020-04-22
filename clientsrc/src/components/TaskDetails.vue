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
                <button type="submit" class="mx-2 btn btn-sm btn-secondary">Add Comment</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
    this.$store.dispatch('getComments', this.taskData._id)
  },
  computed: {
    activeTask() {
      return this.$store.state.activeTask;
    },
    comments() {
      return this.$store.state.comments[this.taskData._id];
    }
  },
  methods: {
    addComment(){
      this.comment.taskId = this.taskData._id
      this.$store.dispatch('addComment', this.comment)
      this.comment = {}
    }
  },
  components: {
    Comment
  }
};
</script>


<style scoped>
</style>