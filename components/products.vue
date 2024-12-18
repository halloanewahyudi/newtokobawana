<template>
  <div class="container">
    <div v-if="loading" class="h-full flex flex-col justify-center items-center">
      <Onload />
    </div>
     <div v-else class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
       <div v-for="item in posts" :key="item.id" class="h-full flex flex-col gap-2 p-4 border border-0.5 rounded-lg shadow hover:shadow-lg duration-200">
        <NuxtLink :to="`/product/${item.slug}`" :title="item.slug">
        <img :src="item.images[0].src" alt="" srcset="" class="">
        <div class="text-sm h-full">
          <p v-html="item.name" class="mb-3"></p>
          <p class="font-medium mb-3">Rp, {{ formatNumber(item.regular_price )}}</p>
          <span class="text-primary">{{ item.stock_quantity }} {{ item.stock_status }}</span>
        </div>
      </NuxtLink>
       </div>
     </div>
  </div>
</template>

<script lang="ts" setup>
// call wcConsumerKey and wcConsumerSecret
const loading = ref(true);
  const{getApi, wcConsumerKey, wcConsumerSecret} = useApi();
  const posts = ref([]);
onMounted(async () => {
  try {
    // Contoh endpoint: posts
    posts.value = await getApi('wc/v3/products',{
      params: {
        consumer_key: wcConsumerKey,
        consumer_secret: wcConsumerSecret,
        per_page: 12
      }
    });
    loading.value = false;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
});
</script>

<style>

</style>