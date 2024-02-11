<template>
  <form class="flex flex-col space-y-4" @submit.prevent="addTodo">
    <input
      v-model="title"
      type="text"
      placeholder="Title"
      class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
    />
    <input
      v-model="content"
      type="text"
      placeholder="Content"
      class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
    />
    <input
      v-model="author"
      type="text"
      placeholder="Author"
      class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
    />
    <button
      :disabled="!isValid"
      type="submit"
      class="disabled:opacity-75 disabled:bg-gray-500 p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
    >
      Add Todo
    </button>
    <p v-if="!isValid" class="text-red-500">All fields are required</p>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['update'])

const title = ref('')
const content = ref('')
const author = ref('')

const isValid = computed(() => {
  if (title.value === '' || content.value === '' || author.value === '') {
    return false
  } else {
    return true
  }
})

const addTodo = async () => {
  if (!isValid.value) return
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

  await res.json()

  title.value = ''
  content.value = ''
  author.value = ''

  emit('update')
}
</script>