
export const useGetData = async (url) =>{
  const api_base = useRuntimeConfig().public.apiBase;
  const loginStore = useLoginStore();
  const accessToken = await loginStore.getAccessToken;
  try {
    const { data, error, refresh, pending } = await useFetch(api_base + "/"+url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + accessToken.accessToken,
        }
      });

      return {'data': data.value, 'pending':pending.value, 'error': error}
    
  } catch (error) {
    console.log(error)
  }
}