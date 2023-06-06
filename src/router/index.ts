import { createRouter, createWebHistory, type RouteComponent } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search-movies',
      component: (): Promise<RouteComponent> => import('@/views/SearchMovies.vue')
    },
    {
      path: '/:id',
      name: 'movie',
      component: (): Promise<RouteComponent> => import('@/views/SingleMovie.vue')
    }
  ]
})

export default router
