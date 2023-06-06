import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDebounce } from '@/composables/useDebounce'

export const useQueryStore = defineStore('query', () => {
  const query = ref<string>('')
  const debounced = useDebounce(query, 500)
  const currentPage = ref(1)

  return {
    query,
    debounced,
    currentPage
  }
})
