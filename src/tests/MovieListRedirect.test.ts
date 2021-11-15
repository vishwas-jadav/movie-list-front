import { shallowMount } from '@vue/test-utils';
import MovieList from '../views/MovieList.vue';

test('movie are there.', async () => {
  const wrapper = shallowMount(MovieList);

  expect(wrapper.find('.movie-list').exists()).toBe(true);
});
