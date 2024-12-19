<template>
  <div class="border-b bg-white">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-8 gap-4">
        <!-- Kategori (Sidebar) -->
        <div class="lg:border-r lg:pr-6 py-6 lg:col-span-2">
          <div v-if="loadingCategories" class="h-full flex justify-center items-center">
            <IconLoading class="text-xl" />
          </div>
          <div v-else>
            <input
              type="search"
              v-model="search"
              placeholder="Search Category"
              class="form-control mb-5"
            />
            <div class="flex flex-col gap-3">
              <div
                v-for="item in filteredCategories"
                :key="item.id"
                class="text-sm p-2 rounded-lg cursor-pointer transition hover:bg-gray-100 hover:text-primary relative group"
                @mouseover="setProductsForHover(item.id)"
                @mouseleave="resetProducts"
              >
                <NuxtLink :to="{ path: '/category/' + item.slug }" class="block" @click="reloadPage">
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <!-- Produk (Main Content) -->
        <div class="lg:col-span-6 p-6">
          <div v-if="loadingProducts" class="h-full flex justify-center items-center">
            <IconLoading class="text-xl" />
          </div>
          <div v-else class="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <!-- List Produk -->
            <div
              v-for="product in products"
              :key="product.id"
              class="text-sm p-4 border border-0.5 rounded-lg hover:shadow-lg duration-200"
            >
              <button @click="detailProduct(product.slug)">
                <img :src="product.images[0]?.src || '/placeholder.png'" alt="" class="mb-3" />
                <p>{{ product.name }}</p>
                <p class="font-semibold">Rp, {{ formatNumber(product.price) }}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
const { getApi, wcConsumerKey, wcConsumerSecret } = useApi();

const categories = ref([]); // Data kategori
const products = ref([]); // Produk saat ini untuk ditampilkan
const defaultProducts = ref([]); // Produk default
const productCache = ref(new Map()); // Cache produk berdasarkan kategori
const loadingCategories = ref(true);
const loadingProducts = ref(true);
const search = ref('');

// Pencarian kategori
const filteredCategories = computed(() => {
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Dapatkan kategori dan preload produk untuk masing-masing kategori
const fetchCategoriesAndProducts = async () => {
  try {
    // Muat kategori saja
    categories.value = await getApi('wc/v3/products/categories', {
      params: {
        consumer_key: wcConsumerKey,
        consumer_secret: wcConsumerSecret,
        parent: 0,
        per_page: 100,
      },
    });

    // Muat produk default
    defaultProducts.value = await getApi('wc/v3/products', {
      params: {
        consumer_key: wcConsumerKey,
        consumer_secret: wcConsumerSecret,
        per_page: 10,
      },
    });
    products.value = defaultProducts.value;
  } catch (error) {
    console.error('Error fetching categories or default products:', error);
  } finally {
    loadingCategories.value = false;
    loadingProducts.value = false;
  }
};



// Tampilkan produk berdasarkan kategori yang di-hover
const fetchProductsForHover = async (categoryId: number) => {
  try {
    loadingProducts.value = true;

    // Cek apakah produk untuk kategori ini sudah ada di cache
    if (productCache.value.has(categoryId)) {
      products.value = productCache.value.get(categoryId);
    } else {
      const categoryProducts = await getApi('wc/v3/products', {
        params: {
          category: categoryId,
          consumer_key: wcConsumerKey,
          consumer_secret: wcConsumerSecret,
          per_page: 10,
        },
      });
      // Simpan ke cache dan perbarui produk
      productCache.value.set(categoryId, categoryProducts);
      products.value = categoryProducts;
    }
  } catch (error) {
    console.error('Error fetching products for hover:', error);
  } finally {
    loadingProducts.value = false;
  }
};


// Reset ke produk default jika mouse keluar dari kategori
const resetProducts = () => {
  products.value = defaultProducts.value;
  loadingProducts.value = false;
};


// Navigasi ke detail produk
const detailProduct = (slug: string) => {
  navigateTo(`/product/${slug}`);
  // page reload
  location.reload();
};

// Muat data kategori dan produk saat halaman dimuat
onMounted(fetchCategoriesAndProducts);

// reload page
const reloadPage = () => {
  setTimeout(() => {
    location.reload();
  }, 200);

};
</script>
