<template>
  <div class="flex items-center px-4 py-2 hover:bg-blue-500">
    <input
      @change="updateTodo($event)"
      type="checkbox"
      :checked="props.completed"
      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <div class="flex flex-col ml-4">
      <span class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ props.title }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ props.content }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ props.author }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ props.date }}</span>
    </div>
    <div class="ml-4">
      <button class="text-white hover:text-red-500" @click="deleteTodo">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button class="text-white hover:text-green-500" @click="editTodo">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M19 21a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h8l4 4v10z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['update', 'edit'])
  const props = defineProps<{
    'title': string,
    'content': string,
    'author': string,
    'date': string,
    'id': number,
    'completed': boolean,
  }>()

  const updateTodo = async (e: Event) => {
    const res = await fetch(`http://localhost:3000/${props.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: (e.target as HTMLInputElement).checked })
    })
    await res.json()

    emit('update')
  }

  const deleteTodo = async () => {
    const res = await fetch(`http://localhost:3000/${props.id}`, {
      method: 'DELETE'
    })

    emit('update')
  }

  const editTodo = () => {
    emit('edit', props.id)
  }
</script>
