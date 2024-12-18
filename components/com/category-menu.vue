<template>
  <div class="border-b  bg-white">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-8 gap-4">
        <div class="lg:border-r lg:pr-6 py-6 lg:col-span-2">
          <div v-if="loading" class="h-full flex justify-center items-center">
            <IconLoading class="text-xl" />
          </div>
          <div v-else class="">
            <input type="search" v-model="search" placeholder="Search Category" class="form-control mb-5">

            <ScrollAreaRoot class="w-full h-[80vh]  rounded overflow-hidden  bg-white" style="--scrollbar-size: 10px">
              <ScrollAreaViewport class="w-full h-full rounded">
                <div class="flex flex-col gap-3">

                  <div v-for="item in filteredCategories" :key="item.id" class="text-sm ">
                    <NuxtLink to="/"> {{ item.name }} </NuxtLink>
                  </div>
                </div>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar
                class="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical">
                <ScrollAreaThumb
                  class="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
              </ScrollAreaScrollbar>
              <ScrollAreaScrollbar
                class="flex select-none touch-none p-0.5 bg-primary transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="horizontal">
                <ScrollAreaThumb
                  class="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
              </ScrollAreaScrollbar>
            </ScrollAreaRoot>

            <div class="lg:col-span-5 py-6">

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'

const { getApi, wcConsumerKey, wcConsumerSecret } = useApi();
const categories = ref([]);
const loading = ref(true);
// membuat autocomplete search category
const search = ref('');
const filteredCategories = computed(() => {
  return categories.value.filter((category) => {
    return category.name.toLowerCase().includes(search.value.toLowerCase());
  });
})

onMounted(async () => {
  try {
    // Contoh endpoint: posts
    categories.value = await getApi('wc/v3/products/categories', {
      params: {
        consumer_key: wcConsumerKey,
        consumer_secret: wcConsumerSecret,
        parent: 0,
        per_page: 100
      }
    });
    loading.value = false;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
});

watchEffect(() => {
  categories.value
})
</script>

<style></style>