import { createRouter, createWebHistory } from 'vue-router'
// import Movies from '../views/MoviesPinia.vue'
// import SingleMovie from '@/views/SingleMoviePinia.vue'
import Movies from '../views/MoviesVueQuery.vue'
import SingleMovie from '@/views/SingleMovieVueQuery.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: Movies
    },
    {
      path: '/:id',
      name: 'movie',
      component: SingleMovie
    }
  ]
})

export default router
