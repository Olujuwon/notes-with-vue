<script setup lang="ts">
  import {Note} from "../types/note.ts";

  interface Props {note: Note};
  const props = defineProps<Props>();
  const noteId = props.note.id;

  const getNoteTitle = (note: Note)=>{
    const title = note.body
    if (title.length > 45) {
      return title.slice(0, 45)
    }
    return title.replace(/^["'](.+(?=["']$))["']$/, '$1');
  }

  const getNoteTime = (note: Note)=>{
    return new Date(note.updatedAt as Date).toLocaleDateString()
  }


  const getNoteContentSummary = (note: Note) => {
    let contentSummary = note.body
    contentSummary = contentSummary.replaceAll(getNoteTitle(note), '')

    if (contentSummary.length > 45) {
      return contentSummary.slice(0, 35)
    }
    return contentSummary.replace(/^["'](.+(?=["']$))["']$/, '$1');
  }

</script>

<template>
  <RouterLink :to="'/notes/'+noteId">
    <div class='w-[95%] mx-auto border-b-2 border-b-[color:var(--color-bg)] text-[color:var(--color-light)] border-solid mb-2 py-4 px-2 rounded
                hover:bg-[color:var(--color-bg)] text-left'>
      <h3 class='font-semibold'>{{getNoteTitle(note)}}</h3>
      <p class='font-normal'>{{getNoteContentSummary(note)}}</p>
      <span class='mr-4 inline-block'>{{getNoteTime(note)}}</span>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>