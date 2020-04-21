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
    activeBoard: {}
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
    }
    //#endregion
  }
})
