<script setup lang="ts">
import { IconLogout, IconBrightnessUpFilled, IconMoon} from '@tabler/icons-vue';
import {useCookies} from "@vueuse/integrations/useCookies";
import {Ref, ref} from "vue";

  const {get, addChangeListener} = useCookies();
  let isAuthenticated: Ref<string | null> = ref(get('note_user_token'));
  interface Props {title?: string, theme: string, handleChangeTheme: ()=>void, handleLogout: ()=>void};
  const props = defineProps<Props>();
  addChangeListener((cookie) => {
    if (cookie.name === 'note_user_token' && !isAuthenticated.value) {
      isAuthenticated.value = cookie.value
    }else {
      isAuthenticated.value = cookie.value
    }
  })
  console.log("isAuthenticated", isAuthenticated.value);
</script>

<template>
  <div class='flex items-center p-4 justify-between bg-[color:var(--color-lighter)] align-middle'>
    <h1 class='text-3xl font-extrabold text-center text-[color:var(--color-dark)]'>{{props.title}}</h1>
    <span class='flex gap-x-4'>
      <icon-brightness-up-filled
          :size='18'
          v-if="theme === 'dark'"
          class='cursor-pointer text-[color:var(--color-dark)]'
          @click="props.handleChangeTheme()"/>
      <IconMoon
          :size='18'
          v-else
          class='cursor-pointer text-[color:var(--color-dark)]'
          @click="props.handleChangeTheme()"/>
      <IconLogout
          :size='18'
          v-if="isAuthenticated"
          @click="props.handleLogout()"
          class='cursor-pointer text-[color:var(--color-dark)]'/>
    </span>
  </div>
</template>

<style scoped>

</style>