import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Movies from '@/views/MovieList.vue';
import MovieDetails from '@/views/MovieDetails.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Movies',
    component: Movies,
  },
  {
    path: '/movies/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    props: (route) => ({ id: parseInt(route.params.id as string) }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
