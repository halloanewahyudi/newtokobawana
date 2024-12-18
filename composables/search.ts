//filter products
export const useSearch = () => {
  const search = useState<string>('search', () => '');
  const { getApi, wcConsumerKey, wcConsumerSecret } = useApi();
  // create dynamic filtering products
  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      return product.name.toLowerCase().includes(search.value.toLowerCase());
    });
  })

   // get products by filter
  onMounted(async () => {
    try {
      // Contoh endpoint: posts
      products.value = await getApi('wc/v3/products', {
        params: {
          consumer_key: wcConsumerKey,
          consumer_secret: wcConsumerSecret
        }
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  });
  


  return {
    search,
    filteredProducts
  };
};