<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="movie" class="movie-detail">
    <div class="row options">
      <font-awesome-icon
        icon="arrow-left"
        class="mr-1"
        @click="router.go(-1)"
      />
      <span>Movie Details</span>
    </div>
    <div class="row movie-title">
      <span>{{ movie.name }}</span>
    </div>
    <div class="row">
      <div class="movie-header">
        <div class="poster-column fill">
          <img :src="movie.poster" alt="poster" />
        </div>
        <div class="second-column">
          <h3>{{ new Date(movie.releaseDate).getFullYear() }}</h3>
          <p>
            <i>{{ movie.runTime }} mins</i>
          </p>

          <div>
            <b v-if="movie.rating">{{ movie.rating }} / 10</b>
            <span v-else>&nbsp;</span>
          </div>
          <button class="btn btn-default btn-fluid">Add to Favorite</button>
        </div>
      </div>
      <div class="movie-plot">
        <p>{{ movie.plot }}</p>
      </div>
      <div class="movie-trailers">
        <h3 class="trailers-title">TRAILERS</h3>
        <hr />
        <div class="row" v-if="movie.trailers">
          <a
            v-for="(trailer, index) in movie.trailers"
            class="btn btn-grey btn-fluid mb-1 trailer-btn"
            target="_blank"
            :href="trailer.link"
            :key="index"
          >
            <font-awesome-icon icon="play-circle" class="mr-1" />
            Play Trailer {{ index + 1 }}
          </a>
        </div>
        <div v-else>
          <p>No trailers.</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="error">Movie not found: Internal Server Error</div>
</template>

<script lang="ts">
import { provide } from 'vue';
import { movieDetails } from '../graphql/queries/movies';
import {
  DefaultApolloClient,
  useQuery,
  useResult,
} from '@vue/apollo-composable';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import apolloClient from '../utils/ApolloClient';
export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  name: 'MovieDetails',
  setup(props) {
    provide(DefaultApolloClient, apolloClient);
    const router = useRouter();
    const { result, loading, error } = useQuery(movieDetails, {
      movieId: parseInt(`${props.id}`),
    });

    if (error) {
      if (error.value?.message.includes('Movie not found')) {
        router.push({ name: 'Movies' });
      }
    }

    const movie = useResult(result, null, (result) => result.movie);

    return {
      movie,
      loading,
      router,
    };
  },
});
</script>

<style>
body {
  color: #aeaeae;
}
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
.movie-title {
  background-color: #746a64;
  color: aliceblue;
  font-size: 20px;
  padding: 1.5rem;
}

.mr-1 {
  margin-right: 1rem;
}

.poster-column {
  padding: 0;
  float: left;
}
.second-column {
  padding: 0 0.5rem;
  float: right;
}

.movie-header {
  max-width: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25 rem;
  transition: color 0.15s;
}

.btn-default {
  background-color: #746a64;
  color: aliceblue;
}
.btn-grey {
  background-color: grey;
  color: #aeaeae;
}

.btn-fluid {
  max-width: 100%;
  width: 100%;
}
.trailers-title {
  margin-bottom: 0;
}

.trailer-btn {
  text-align: left;
  margin-bottom: 1rem;
}
a.btn {
  text-decoration: none;
}
</style>
