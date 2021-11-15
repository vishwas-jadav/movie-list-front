import { shallowMount } from '@vue/test-utils';
import MovieDetails from '../views/MovieDetails.vue';

test('Movie Details', async () => {
  const wrapper = shallowMount(MovieDetails, {
    props: {
      id: 112,
    },
  });

  expect(wrapper.text().includes('Movie not found')).toBe(true);
});
