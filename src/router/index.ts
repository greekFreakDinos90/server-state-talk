import { createRouter, createWebHistory } from 'vue-router'
import SearchMovies from '../views/SearchMovies.vue'
import SingleMovie from '@/views/SingleMovie.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search-movies',
      meta: { query: '' },
      component: SearchMovies
    },
    {
      path: '/:id',
      name: 'movie',
      component: SingleMovie
    }
  ]
})

export default router
