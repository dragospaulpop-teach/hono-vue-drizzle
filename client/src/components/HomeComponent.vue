<template>
  <div>
    <ul>
      <li v-for="todo in state.todos" :key="todo.id">
        <TodoComponent v-bind="todo" @update="fetchTodos" />
      </li>
    </ul>
    <AddTodoComponent @update="fetchTodos" />
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from 'vue'
  import TodoComponent from './TodoComponent.vue'
  import AddTodoComponent from './AddTodoComponent.vue'

  type TodoType = {
    id: number,
    title: string,
    completed: boolean,
    content: string,
    author: string,
    date: string
  }

  const state = reactive({
    todos: [] as TodoType[]
  })

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:3000/')
    const data = await res.json()
    state.todos = data
  }

  onMounted(fetchTodos)
</script>
