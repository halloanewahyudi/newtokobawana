<template>
  <div class="container py-10">
    <h1 class="text-2xl font-bold mb-6">Products in {{ category?.name }}</h1>
    <div v-if="loading" class="flex justify-center items-center h-48">
      <IconLoading class="text-2xl" />
    </div>
    <div v-else class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
      >
        <NuxtLink :to="{ path: '/product/' + product.slug }">
          <img :src="product.images[0]?.src" alt="Product Image" class="mb-3 rounded-lg" />
          <h2 class="text-sm font-semibold">{{ product.name }}</h2>
          <p class="text-gray-500">Rp {{ formatNumber(product.price) }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { getApi, wcConsumerKey, wcConsumerSecret } = useApi();

const products = ref([]);
const category = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const { slug } = route.params;

    // Get category details
    const [categoryData] = await getApi('wc/v3/products/categories', {
      params: {
        slug,
        consumer_key: wcConsumerKey,
        consumer_secret: wcConsumerSecret,
      },
    });
    category.value = categoryData;

    // Get products in this category
    products.value = await getApi('wc/v3/products', {
      params: {
        category: categoryData.id,
        consumer_key: wcConsumerKey,
        consumer_secret: wcConsumerSecret,
      },
    });
  } catch (error) {
    console.error('Error fetching category or products:', error);
  } finally {
    loading.value = false;
  }
});
</script>
