<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h1 class="text-3xl font-bold underline mb-4">Todos</h1>
    <TransitionGroup
      tag="ul"
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
      class="space-y-4 mb-4 flex flex-col items-center justify-center w-full">
    <!-- <ul class="space-y-4 mb-4 flex flex-col items-center justify-center w-full"> -->
      <li
        v-for="todo in state.todos"
        :key="todo.id"
        class="w-full p-4 rounded border border-gray-300 flex flex-col items-center justify-between hover:bg-sky-950"
      >
        <TodoComponent v-bind="todo" @update="fetchTodos" @edit="editTodo(todo)" />
      </li>
    <!-- </ul>  -->
    </TransitionGroup>
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <TodoFormComponent @update="hideFormAndRefresh" @cancel="cancelForm" v-if="showForm" :todo="toEditTodo"/>
    </Transition>
    <!-- fab -->
    <button
      @click="addTodo"
      class="fixed bottom-10 right-10 p-4 text-white bg-blue-500 rounded-full w-12 h-12 flex justify-center items-center"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import TodoComponent from './TodoComponent.vue'
  import TodoFormComponent from './TodoFormComponent.vue'

  type TodoType = {
    id: number,
    title: string,
    completed: boolean,
    content: string,
    author: string,
    date: string
  }

  const showForm = ref(false)

  const toEditTodo = ref({
    id: 0,
    title: '',
    completed: false,
    content: '',
    author: '',
    date: ''
  })

  const state = reactive({
    todos: [] as TodoType[]
  })

  const cancelForm = () => {
    showForm.value = false
    toEditTodo.value = {
      id: 0,
      title: '',
      completed: false,
      content: '',
      author: '',
      date: '',
    }
  }

  const editTodo = (todo: TodoType) => {
    toEditTodo.value = todo
    showForm.value = true
  }


  const addTodo = () => {
    toEditTodo.value = {
      id: 0,
      title: '',
      completed: false,
      content: '',
      author: '',
      date: '',
    }
    showForm.value = true
  }

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:3000/')
    const data = await res.json()
    state.todos = data
  }

  const hideFormAndRefresh = () => {
    showForm.value = false
    setTimeout(() => {
      fetchTodos()
    }, 500)
  }

  onMounted(fetchTodos)
</script>
