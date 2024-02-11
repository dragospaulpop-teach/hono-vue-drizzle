<template>
  <form
    class="flex flex-col space-y-4 border border-gray-300 rounded p-4 w-full"
    :class="{ 'bg-teal-950': todo?.id, 'bg-sky-950': !todo?.id }"
    @submit.prevent="addOrUpdateTodo"
  >
    <label class="text-md font-medium text-gray-900 dark:text-gray-100" for="title">Todo</label>
    <input
      id="title"
      v-model="title"
      type="text"
      placeholder="Title"
      class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
    />

    <label class="text-md font-medium text-gray-900 dark:text-gray-100" for="content">Content</label>
    <textarea
      id="content"
      v-model="content"
      type="text"
      placeholder="Content"
      class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
    >
    </textarea>

    <label class="text-md font-medium text-gray-900 dark:text-gray-100" for="author">Author</label>
    <input
      id="author"
      v-model="author"
      type="text"
      placeholder="Author"
      class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
    />
    <button
      :disabled="!isValid"
      type="submit"
      class="disabled:opacity-75 disabled:bg-gray-500 p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
      :class="{
        'dark:focus:ring-teal-800 dark:bg-teal-800 dark:hover:bg-teal-900': todo?.id,
        'dark:focus:ring-sky-800 dark:bg-sky-800 dark:hover:bg-sky-900': !todo?.id
      }"
    >
      {{ todo?.id ? 'Update Todo' : 'Add Todo' }}
    </button>
    <button
      @click.prevent="cancel"
      class="p-2 text-white bg-red-500 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-900 dark:bg-red-900 dark:hover:bg-red-950"
    >
      Cancel
    </button>
    <p v-if="!isValid" class="text-red-500">All fields are required</p>
  </form>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, watch } from 'vue'

type TodoType = {
  id: number,
  title: string,
  completed: boolean,
  content: string,
  author: string,
  date: string
}

const emit = defineEmits(['update', 'cancel'])

const props = defineProps({ 'todo': Object })

const { todo } = toRefs(props)

const title = ref(todo?.value?.title ?? '')
const content = ref(todo?.value?.content ?? '')
const author = ref(todo?.value?.author ?? '')

watch(todo, (newValue: TodoType) => {
  title.value = newValue?.title ?? ''
  content.value = newValue?.content ?? ''
  author.value = newValue?.author ?? ''
})

const isValid = computed(() => {
  if (title.value === '' || content.value === '' || author.value === '') {
    return false
  } else {
    return true
  }
})

const cancel = () => {
  title.value = ''
  content.value = ''
  author.value = ''

  emit('cancel')
}

const addOrUpdateTodo = async () => {
  if (!isValid.value) return
  if (todo.value?.id) {
    const res = await fetch(`http://localhost:3000/${todo.value.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        author: author.value
      })
    })
  } else {
    const res = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        author: author.value
      })
    })
  }

  title.value = ''
  content.value = ''
  author.value = ''

  emit('update')
}
</script>