import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const app = new axios.create({
  baseURL: "http://localhost:3000/"
});
export default new Vuex.Store({
  state: {
    todos: [], 
  },
  mutations: {
    GET_STATUS(state,payload)
    {
      state.todos = payload;
    },
    CREATE_STATUS(state,payload)
    {
      state.todos.push(payload);
    },
    DELETE_STATUS(state,payload)
    {
      state.todos.splice(payload,1);
    }
  },
  actions: {
    async getPosts({ commit }) {
      const {data,status} = await app.get('todos');
      console.log(status);
      commit('GET_STATUS',data);
    },
    async createTodo({ commit },todo) {
      const {status} = await app.post('todos', todo);
      console.log(status);
      if(status === 200) {
        commit('CREATE_STATUS',todo);
      }
    },
    async deleteTodo({ commit,state}, todoIndex) {
      const todoID = state.todos[todoIndex]._id;
      const {status} = await app.delete('todos/' + todoID);
      console.log(status);
      commit('DELETE_STATUS', todoIndex);
    },
  },
  modules: {
      
  }
})
