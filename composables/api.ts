// composables/useApi.ts
export function useApi() {
  const config = useRuntimeConfig();

  const getApi = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    try {
      const response = await $fetch<T>(`${config.public.apiBase}/${endpoint}`, {
        ...options,
      });
      return response;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    }
  };

  const wcConsumerKey = 'ck_883fdea4803c9a83fe764ed10b141ac129ab61ea';
const wcConsumerSecret = 'cs_bb23889eab21510e69cbbc425279a5c193b0eed8';

  return {
    getApi,
    wcConsumerKey,
    wcConsumerSecret
  };
}
