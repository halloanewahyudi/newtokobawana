export const useAuth = () => {
  const token = useState<string | null>('token', () => null);
  const config = useRuntimeConfig();
   const { getApi, wcConsumerKey, wcConsumerSecret } = useApi();
  // Fungsi login untuk mendapatkan token JWT
  const login = async (username: string, password: string) => {
    try {
      const response = await $fetch<{ token: string; user_email: string; user_nicename: string }>(
        `${config.public.apiBase}/jwt-auth/v1/token`,
        {
          method: 'POST',
          body: {
            username,
            password,
          },
        }
      );

      // Simpan token di state dan localStorage
      token.value = response.token;
      localStorage.setItem('authToken', response.token);
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error?.data?.message || 'Login failed');
      return { success: false, message: error?.data?.message || 'Something went wrong' };
    }
  };

  // Fungsi logout
  const logout = () => {
    token.value = null;
    localStorage.removeItem('authToken');
  };

  // Inisialisasi token saat aplikasi dimuat
  const initAuth = () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      token.value = storedToken;
    }
  };

  return { login, logout, token, initAuth };
};
