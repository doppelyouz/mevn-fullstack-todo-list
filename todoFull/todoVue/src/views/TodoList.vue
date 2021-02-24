<template>
<form action="#">
  <div> 
      <div class="wrapper">
        <input class="todoInput" v-model="addTodo.todo"> <button @click="CreateTodo">Create</button><br><br><br><br>
        <div v-for="(todo,index) in todos" :key="todo.id" class="todoItem"> {{ todo.todo }}
        <button @click="RemoveTodo(index)" class="todoRemove">Remove</button>
        </div>    
      </div>
  </div>
</form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'todo-list',
  data: () => {
    return { addTodo: { todo : null } };
  },
  computed: mapState ({
    todos: state => state.todos
  }),
  mounted() {
    this.$store.dispatch('getPosts');
  },
  methods: {
    async GetTodos() {
        this.$store.dispatch('getPosts');
    },
    async CreateTodo() {
      if (this.addTodo.todo.trim().length == 0) {
        return
      }
      else {
        await this.$store.dispatch('createTodo', this.addTodo);
        this.addTodo="";
        window.location.reload();
      }
    },
    async RemoveTodo(index) {
        this.$store.dispatch('deleteTodo', index);
    }
  }
}
</script>

<style>
    body{
      width: 100%;
      height: 100vh;
      padding: 10px;
      background: linear-gradient(to bottom, #68EACC 0%, #497BE8 100%);
    }
    .wrapper{
      background: #fff;
      max-width: 400px;
      width: 100%;
      margin: 120px auto;
      padding: 25px;
      border-radius: 5px;
      box-shadow: 0px 10px 15px rgba(0,0,0,0.1);
    }
    .wrapper header{
      font-size: 30px;
      font-weight: 600;
    }
    .wrapper .inputField{
      margin: 20px 0;
      width: 100%;
      display: flex;
      height: 45px;
    }
    
    .wrapper .footer{
      display: flex;
      width: 100%;
      margin-top: 20px;
      align-items: center;
      justify-content: space-between;
    }
    
  .todoInput {
    width: 80%;
    padding: 10px 20px;
    font-size: 20px;
    margin-bottom: 15px;
  }
  .todoItem {
    display: flex;
    margin-left: 50px;
    margin-bottom: 20px;
    justify-content: space-between;
  }
  .todoRemove {
    margin-right: 50px;
  }
</style>