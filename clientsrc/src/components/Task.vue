<template>
    <div class="task">
        <li class="list-group-item">{{taskData.title}}</li>
    </div>
</template>


<script>
export default {
    name: 'task',
    props: ['taskData'],
    data(){
        return {}
    },
    computed:{},
    methods:{},
    components:{}
}
</script>


<style scoped>

</style>