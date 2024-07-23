<script setup lang="ts">
  import Header from "./components/Header.vue";
  import {useCookies} from "@vueuse/integrations/useCookies";
  import {Ref, ref} from "vue";
  import {useFetchUtility} from "./utils/fetchUtility.ts";
  import {useRouter} from "vue-router";

  const {get, set, remove} = useCookies();
  const router = useRouter()
  const cookieTheme : Ref<string | null> = get('note-app-theme');
  const theme : Ref<string | null> = ref(cookieTheme ? cookieTheme : 'dark');
  const cookiesMaxAge: number =Number(import.meta.env.VITE_COOKIE_AGE);
  const error: Ref<string | null> = ref(null);

  const handleChangeTheme = (): void => {
    if (theme.value === 'dark') {
      theme.value = 'light';
    }else {
      theme.value = 'dark';
    }
    set('note-app-theme', theme.value, {maxAge: cookiesMaxAge});
  }

  const logout = async (): Promise<void> => {
    try {
      await useFetchUtility('auth/logoutall', 'POST');
      remove('note_user_token');
      remove('note_user_id');
      remove('note_user');
      await router.push({name: 'Login', replace: true});
    }catch(err : any){
      error.value=err.message
    }
  }
</script>

<template>
  <div
      :class="theme"
      class='w-full max-w-[480px] mx-auto h-[100vh] relative bg-[color:var(--color-bg)] font-poppins'>
    <Header
        title='Note Taking App'
        :theme="theme as string"
        :handleChangeTheme='handleChangeTheme'
        :handleLogout='logout'/>
    <RouterView />
  </div>
</template>

<style>
</style>
