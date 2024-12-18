export const useOrders = () => {
  const config = useRuntimeConfig();
  const orders = ref([]);
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);

  const fetchOrders = async (token: string) => {
    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await $fetch(`${config.public.apiBase}/wc/v3/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      orders.value = response; // Simpan hasil ke dalam state
    } catch (error: any) {
      console.error('Failed to fetch orders:', error?.data?.message || error.message);
      errorMessage.value = error?.data?.message || 'Failed to fetch orders.';
    } finally {
      loading.value = false;
    }
  };

  return {
    orders,
    loading,
    errorMessage,
    fetchOrders,
  };
};
