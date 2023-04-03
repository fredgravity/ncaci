
export const useSubmitData = async (title:string, url:string, formData:{}, method:string = 'post') =>{
    const api_base = useRuntimeConfig().public.apiBase;
    const loginStore = useLoginStore();
    const accessToken = await loginStore.getAccessToken;
    try {
      const { data, pending, error, refresh } = await useAsyncData(`${title}`, () =>
      $fetch(api_base + "/"+url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + accessToken.accessToken,
        },
        body: formData,
      })
    );
  
    return {'data': data.value, 'pending':pending.value, 'error': error}
      
    } catch (error) {
      console.error(error)
    }

}