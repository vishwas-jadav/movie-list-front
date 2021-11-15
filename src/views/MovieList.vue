<template>
  <div class="row options">
    <span>Pop Movies</span>
  </div>
  <div class="movie-list" v-if="movies && movies.length">
    <div
      class="fill"
      v-for="(movie, index) in movies"
      :class="[index % 2 == 0 ? 'float-left' : 'float-right']"
      :key="movie.id"
    >
      <router-link :to="`/movies/${movie.id}`">
        <img :src="movie.poster" alt="poster" />
      </router-link>
    </div>
  </div>
  <div v-else>No Movies Found</div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import {
  DefaultApolloClient,
  useQuery,
  useResult,
} from '@vue/apollo-composable';
import { popularMoviesQuery } from '../graphql/queries/movies';
import apolloClient from '../utils/ApolloClient';

export default defineComponent({
  name: 'MovieList',
  setup() {
    provide(DefaultApolloClient, apolloClient);
    const { result } = useQuery(popularMoviesQuery);

    const movies = useResult(result);

    return {
      movies: movies,
    };
  },
});
</script>

<style>
.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.fill img {
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
}

.grid {
  display: grid;
  grid-template-columns: 6ch auto;
}

.float-right {
  float: right;
}

.float-left {
  float: left;
}

img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.movie-list {
  max-width: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.hour {
  text-align: right;
  padding: 3px 5px 3px 3px;
}

.name {
  text-align: left;
  padding: 3px 5px 3px 3px;
}

.row {
  padding: 1rem;
  overflow: hidden;
}

.options {
  background-color: black;
  color: aliceblue;
  font-size: 20px;
  padding: 1.5rem;
}

@media screen and (min-width: 1024px) {
  .movie-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

/* For Tablet View */
@media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .movie-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* For Mobile Portrait View */
@media screen and (max-device-width: 480px) and (orientation: portrait) {
  .movie-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* For Mobile Landscape View */
@media screen and (max-device-width: 640px) and (orientation: landscape) {
  .movie-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
