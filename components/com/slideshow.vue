<template>
  <div class="container">
    <div class="rounded-lg overflow-hidden relative">
      <Splide :options="{
       type: 'loop',
       rewind: true,
       loop: true,
       autoplay: true,
       interval: 3000,
       arrows: false,
       classes: {
		arrows: 'splide__arrows slide-arrows',
		arrow : 'splide__arrow slide-arrow',
		prev  : 'splide__arrow--prev slide-prev',
		next  : 'splide__arrow--next slide-next',
  },
        }" aria-label="My Favorite Images" class="rounded-lg overflow-hidden w-full">
    <SplideSlide v-for="item in posts" :key="item.id" class="">
      <img :src="item._embedded['wp:featuredmedia'][0].source_url" :alt="item.title.rendered" class="rounded-lg">
    </SplideSlide>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
      <button class="slide-prev">prev</button>
      <button class="slide-next">next</button>
    </div>

  </Splide>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {Splide, SplideSlide} from '@splidejs/vue-splide';
// import '@splidejs/vue-splide/css/core';
import '@splidejs/vue-splide/css/core';
const {getApi} = useApi();
 const posts = ref([]);
onMounted(async () => {
  try {
    // Contoh endpoint: posts
    posts.value = await getApi('wp/v2/slideshow?_embed');
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
});
</script>

<style>

</style>