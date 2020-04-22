import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    activeBoard: {},
    tasks: {},
    activeTask: {},
    comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, tasks){
      // state.tasks  = tasks
      Vue.set(state.tasks, tasks.listIdObject, tasks.tasks)
    },
    setActiveTask(state, task) {
      state.activeTask = task
    },
    setComments(state, comments){
      // state.comments = comments
      Vue.set(state.comments, comments[0].taskId, comments)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    async setActiveBoard({commit, dispatch}, boardId) {
      try {
        let res = await api.get(`boards/${boardId}`)
        commit('setActiveBoard', res.data)
        console.log("set board", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteBoard({commit, dispatch}, boardId) {
      try {
        await api.delete('boards/' + boardId)
        dispatch('getBoards')
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion


    //#region -- LISTS --
    async addList({commit,dispatch}, list){
      try {
        let res = await api.post('lists', list)
        console.log("add list", res.data)
        dispatch('getLists', res.data.boardId)
      } catch (error) {
        console.error(error)
      }
    },
    async getLists({commit, dispatch}, boardId) {
      try {
        console.log('invoked')
        let res = await api.get(`boards/${boardId}/lists`)
        console.log("here is the get list res", res.data)
        commit('setLists', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteList({commit, dispatch}, list) {
      try {
        console.log(list.boardId)
        await api.delete('lists/' + list._id)
        dispatch('getLists', list.boardId)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteAllLists({commit, dispatch}, boardId) {
      try {
        await api.delete('')
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion
    //#region -- TASKS --
      async addTask({commit, dispatch}, taskData){
        try {
         let res =  await api.post('tasks', taskData)
         dispatch('getTasks', taskData.listId)

        } catch (error) {
          console.error(error)
        }
      },
      async getTasks({commit, dispatch}, listId){
        try {
          let res = await api.get(`lists/${listId}/tasks`)
          let newTask = {listIdObject:listId, tasks:res.data}
          commit('setTasks', newTask)
        } catch (error) {
          console.error(error)
        }
      },
      async deleteTask({commit, dispatch}, task){
        try {
          await api.delete(`tasks/${task._id}`, task)
          dispatch('getTasks', task.listId)
        } catch (error) {
          console.error(error)
        }
      },
      async setActiveTask({commit, dispatch}, task) {
        try {
          let res = await api.get('tasks/' + task._id)
          commit('setActiveTask', res.data)
        } catch (error) {
          console.error(error)
        }
      },
    //#endregion
    //#region -- COMMENTS --
    async addComment({commit, dispatch}, comment) {
      try {
        console.log(comment)
        let res = await api.post('comments', comment)
        dispatch('getComments', comment.taskId)
      } catch (error) {
        console.error(error)
      }
    },
    async getComments({commit, dispatch}, taskId){
      try {
        let res = await api.get(`tasks/${taskId}/comments`)
        commit('setComments', res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    //#endregion
  }
})
