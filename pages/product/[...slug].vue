<template>
  <div class="container mt-10">
    <div v-if="loading" class="h-full flex flex-col justify-center items-center">
      <Onload />
    </div>
    <div v-else class="grid grid-cols-1 lg:grid-cols-8 gap-4 lg:gap-10">
      <div class="lg:col-span-3">
        <div class="">
          <img :src="posts[0].images[0].src" alt="" srcset="" class="">
        </div>
      </div>
      <div class="lg:col-span-3 flex flex-col gap-5">
        <h4 class="text-2xl font-bold">{{ posts[0].name }}</h4>
        <p class="text-primary">{{ posts[0].stock_quantity }} {{ posts[0].stock_status }}</p>
        <p class="text-2xl font-semibold">Rp, {{ formatNumber(posts[0].regular_price) }}</p>
        <p v-html="posts[0].description"></p>

      </div>
      <div class="lg:col-span-2">
     
        <button @click="addToCart(posts[0])" class="bg-secondary text-white px-4 py-2 rounded-lg"> order</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
const {cart, addToCart, removeFromCart, decreaseQty } = useCart();
const route = useRoute();
const slug = computed(() => route.params.slug);
const { getApi, wcConsumerKey, wcConsumerSecret } = useApi();
const loading = ref(true);
const posts = ref([]);
const attributes = ref([])
onMounted(async () => {
  try {
    // Contoh endpoint: posts
    posts.value = await getApi('wc/v3/products', {
      params: {
        slug: slug.value,
        attributes:null,
        consumer_key: wcConsumerKey,
        consumer_secret: wcConsumerSecret
      }
    });



    loading.value = false;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
})


</script>

<style></style>