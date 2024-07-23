<script setup lang="ts">
import {Ref, ref, watch} from "vue";
  import {useFetchUtility} from "../utils/fetchUtility.ts";
  import { useCookies } from '@vueuse/integrations/useCookies'
  import {AuthUser} from "../types/user.ts";
  import {useRouter} from "vue-router";

  const username: Ref<string | null> =ref(null);
  const password: Ref<string | null> =ref(null);
  const email: Ref<string | null> =ref(null);
  const error: Ref<string | null> =ref<string | null>(null);
  const isButtonDisabled: Ref<boolean> =ref(true);
  const cookies = useCookies();
  const router = useRouter();
  const cookiesMaxAge=Number(import.meta.env.VITE_COOKIE_AGE);

  const handleSubmit=()=>{
    useFetchUtility('auth/register', 'POST',
        JSON.stringify({username: username.value, password: password.value, email: email.value}))
        .then((res)=>res.json())
        .then((json)=> {
          const {user, token} = json as AuthUser;
          cookies.set('note_user_token', token, {maxAge: cookiesMaxAge});
          cookies.set('note_user_id', user.id, {maxAge: cookiesMaxAge});
          cookies.set('note_user', user.username, {maxAge: cookiesMaxAge});
          router.push('/notes');
        })
        .catch((err: any)=> {
          console.error(err.message)
          error.value = 'An unexpected error occurred. Please try again.'
        });
  }

  watch([username, email, password], ([username, email, password])=>{
    if (username && email && password) {
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
        type='email'
        placeholder='Email'
        v-model="email"
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
      Register</button>
    <RouterLink class='mx-auto mt-4 cursor-pointer text-[color:var(--color-dark)]' to='/login'>Already registered? Login here</RouterLink>
    <p class='mx-auto mt-4 cursor-pointer text-[color:var(--color-dark)] text-xs font-light'>Powered by Vue.js</p>
  </form>
</template>

<style scoped>

</style>