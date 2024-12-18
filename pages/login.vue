<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
     <h4 class="text-xl font-bold mb-4">Login</h4>
     <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
      <input type="text" v-model="username" placeholder="Username" class="form-control">
      <input type="password" v-model="password" placeholder="Password" class="form-control">
      <button type="submit" class="bg-primary font-semibold py-2 px-4 rounded-lg">Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const { login, logout, token, initAuth } = useAuth();

const username = ref('');
const password = ref('');
const authError = ref<string | null>(null);

// Inisialisasi token saat halaman dimuat
onMounted(() => {
  initAuth();

  if (token.value) {
    fetchOrders(token.value); // Fetch orders jika sudah login
  }
});

watchEffect(() => {
  if (token.value) {
    fetchOrders(token.value); // Fetch orders jika sudah login  
  }
});

const handleLogin = async () => {
  authError.value = null;

  const response = await login(username.value, password.value);
  if (!response.success) {
    authError.value = response.message;
  } else {
    // redirect to my-account
    return navigateTo('/my-account');
   //  fetchOrders(token.value!); // Fetch orders setelah login berhasil
  }
};
</script>

<style>

</style>