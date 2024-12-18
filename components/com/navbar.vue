<template>
  <div class="">
    <div class="border-b py-2 bg-white fixed top-0 w-full z-50">
      <div class="container">
        <div class="flex justify-between items-center gap-4 lg:gap-8">
          <NuxtLink to="/" @click="catopen = false"> <img src="/logo.png" alt="" class="w-[200px] shrink-0"></NuxtLink>
          <button class="text-xl flex items-center gap-2" @click="catopen = !catopen">
            <IconMenu /> <span class="text-sm"> Category</span>
          </button>
          <div class="relative w-full">
            <input type="search" placeholder="Search" class="form-control" v-model="search">
            <div v-if="search.length > 0" class="absolute top-12 left-0 bg-white p-4 w-full border rounded-lg shadow-lg z-50">
              <ul  class="flex flex-col gap-2 ">
            <li v-for="item in filteredproducts" :key="item" @click="search = ''">
              <NuxtLink :to="`/product/${item.slug}`" :title="item.slug" class="hover:text-primary"> {{ item.name }} </NuxtLink>
            </li>
          </ul>
            </div>

          </div>
         
          <div class="flex items-center gap-4 shrink-0 text-xl">
            <NuxtLink to="/cart" class="relative">
              <span class="bg-red-500 w-5 h-5 flex justify-center items-center text-white rounded-full absolute top-2 -right-2 text-sm ">{{ cart.length }}</span>
              <IconCart />
            </NuxtLink> 
            <div v-if="logedIn">
              <button @click="logout">
                <IconUser />
              </button>
            </div>
            <div v-else>
              <NuxtLink to="/login" @click="catopen = false">
                <IconLogin />
              </NuxtLink>
            </div>

          </div>
        </div>
      </div>

    </div>
    <div v-if="catopen" class="fixed top-[57px] w-full z-50">
      <ComCategoryMenu />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { login, logout, initAuth, token } = useAuth();
const { getApi, wcConsumerKey, wcConsumerSecret } = useApi();
const {cart, addToCart, removeFromCart, decreaseQty} = useCart();
const logedIn = ref(false);
const catopen = ref(false);
onMounted(() => {
  initAuth();
})

watchEffect(() => {
  if (token.value) {
    logedIn.value = true;
  } else {
    logedIn.value = false;
  }
})


const products = ref([]);
const loading = ref(true);
// membuat autocomplete search category
const search = ref('');
const filteredproducts = computed(() => {

  return products.value.filter((product) => {

      return product.name.toLowerCase().includes(search.value.toLowerCase());
  })
})

onMounted(async () => {
  try {
    // Contoh endpoint: posts
    products.value = await getApi('wc/v3/products', {
      params: {
        consumer_key: wcConsumerKey,
        consumer_secret: wcConsumerSecret,
        search: search.value,
        per_page: 100
      }
    });
    loading.value = false;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
});

watchEffect(() => {
  products.value
})
</script>

<style></style>