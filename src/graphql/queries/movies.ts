import gql from 'graphql-tag';

export const popularMoviesQuery = gql`
  {
    popularMovies {
      id
      poster
    }
  }
`;

export const movieDetails = gql`
  query ($movieId: Int!) {
    movie(id: $movieId) {
      id
      name
      plot
      poster
      rating
      releaseDate
      runTime
      trailers {
        link
      }
    }
  }
`;
