import { ref, watch, type Ref } from 'vue'

export const useDebounce = (query: Ref<string>, delay: number) => {
  const debounced = ref<string>(query.value)
  let timeoutId: ReturnType<typeof setTimeout>

  watch(query, (newQuery) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      debounced.value = newQuery
    }, delay)
  })

  return debounced
}
