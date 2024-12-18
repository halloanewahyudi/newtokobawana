<script setup lang="ts">
const { login, logout, token, initAuth } = useAuth();
const { orders, loading, errorMessage, fetchOrders } = useOrders();

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

const handleLogin = async () => {
  authError.value = null;

  const response = await login(username.value, password.value);
  if (!response.success) {
    authError.value = response.message;
  } else {
    fetchOrders(token.value!); // Fetch orders setelah login berhasil
  }
};
</script>

<template>
  <div class="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-4">My Account</h1>

    <!-- Jika belum login -->
    <div v-if="!token">
      <p v-if="authError" class="text-red-500">{{ authError }}</p>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full border rounded p-2"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label class="block text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full border rounded p-2"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>

    <!-- Jika sudah login, tampilkan daftar orders -->
    <div v-else>
      <h2 class="text-lg font-semibold mb-4">Your Orders</h2>

      <div v-if="loading">Loading orders...</div>
      <div v-else-if="errorMessage" class="text-red-500">
        {{ errorMessage }}
      </div>
      <div v-else>
        <ul v-if="orders.length > 0" class="space-y-2">
          <li v-for="order in orders" :key="order.id" class="border p-4 rounded">
            <p><strong>Order ID:</strong> {{ order.id }}</p>
            <p><strong>Status:</strong> {{ order.status }}</p>
            <p><strong>Total:</strong> ${{ order.total }}</p>
          </li>
        </ul>
        <p v-else>No orders found.</p>
      </div>

      <button @click="logout" class="mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded">
        Logout
      </button>
    </div>
  </div>
</template>
