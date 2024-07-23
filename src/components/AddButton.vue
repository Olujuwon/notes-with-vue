<script setup lang="ts">
  import {IconPlus} from "@tabler/icons-vue";
</script>

<template>
  <RouterLink to="/notes/new" class='absolute bottom-6 right-4 border-0 w-[60px] h-[60px] rounded-full flex items-center
              justify-center cursor-pointer bg-[color:var(--color-main)]'>
    <icon-plus size='48' class='text-[color:var(--color-white)]'/>
  </RouterLink>
</template>

<style scoped>

</style>