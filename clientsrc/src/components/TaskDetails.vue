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
            <Comment v-for="Comment in Comments" :commentData="Comment" :key="Comment._id"></Comment>
            <form class="inline"></form>
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
import Comment from "./Comment.vue"
export default {
  name: "TaskDetails",
  props: ['taskData'],
  data() {
    return {};
  },
  computed: {
    activeTask() {
      return this.$store.state.activeTask
    }
  },
  methods: {},
  components: {
    Comment
  }
};
</script>


<style scoped>
</style>