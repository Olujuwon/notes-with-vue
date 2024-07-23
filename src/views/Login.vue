<script setup lang="ts">
import {Ref, ref, watch} from "vue";
  import { useCookies } from '@vueuse/integrations/useCookies'
  import {useFetchUtility} from "../utils/fetchUtility.ts";
  import {AuthUser} from "../types/user.ts";
  import {useRouter} from "vue-router";

  const username : Ref<string | null> =ref(null);
  const password : Ref<string | null> =ref(null);
  const isButtonDisabled : Ref<boolean>=ref(true);
  const error=ref<string | null>(null);
  const cookies = useCookies();
  const router = useRouter();
  const cookiesMaxAge=Number(import.meta.env.VITE_COOKIE_AGE);

  const handleSubmit=()=>{
    useFetchUtility('auth/login', 'POST',
        JSON.stringify({username: username.value, password: password.value}))
        .then((res)=>res.json())
        .then((json)=> {
          const {user, token} = json as AuthUser;
          cookies.set('note_user_token', token, {maxAge: cookiesMaxAge});
          cookies.set('note_user_id', user.id, {maxAge: cookiesMaxAge});
          cookies.set('note_user', user.username, {maxAge: cookiesMaxAge});
          router.push('/notes');
        })
        .catch(()=>error.value = 'An unexpected error occurred. Please try again.');
  }

  watch([username, password], ([username, password])=>{
    if (username && password) {
      isButtonDisabled.value = false;
    }else{
      isButtonDisabled.value = true;
    }
  });
</script>

<template>
  <form class='flex flex-col gap-y-3 place-content-center justify-center py-[50%]' @submit.prevent='handleSubmit'>
    <p class='mx-auto pl-2 text-red-400 text-sm' v-if="error">{{error}}</p>
    <input
        type='text'
        placeholder='Username'
        v-model="username"
        class='outline-0 w-3/4 mx-auto h-11 pl-2'
        />
    <input
        type='password'
        placeholder='Password'
        v-model="password"
        class='outline-0 w-3/4 mx-auto h-11 pl-2'
        />

    <button
        type="submit"
        class='h-10 w-3/4 mx-auto text-[color:var(--color-white)]'
        :disabled='isButtonDisabled'
        :class="isButtonDisabled ? 'bg-[color:var(--color-disabled)]' : 'bg-[color:var(--color-main)]'">
      Login</button>
    <RouterLink class='mx-auto mt-4 cursor-pointer text-[color:var(--color-dark)]' to='/register'>Not registered? Register here</RouterLink>
    <p class='mx-auto mt-4 cursor-pointer text-[color:var(--color-dark)] text-xs font-light'>Powered by Vue.js</p>
  </form>
</template>

<style scoped>

</style>