<template>
    <div class="add-list">
        <form @submit.prevent="addList()">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" id="" class="form-control" placeholder="enter title..." 
                aria-describedby="helpId" required v-model="newList.title">
            </div>
            <button type="submit" class="btn btn-secondary">Add List</button>
        </form>

    </div>
</template>


<script>
export default {
    name: 'add-list',
    data(){
        return {
            newList: {}
        }
    },
    computed:{
        activeBoardId(){
            return this.$store.state.activeBoard._id
        }
    },
    methods:{
        addList(){
            this.newList.boardId = this.activeBoardId;
            this.$store.dispatch('addList', this.newList)
            
            this.newList = {}

        }
    },
    components:{}
}
</script>


<style scoped>

</style>