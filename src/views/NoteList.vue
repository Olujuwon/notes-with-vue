<script setup lang="ts">
  import EmptyNote from '../components/EmptyNote.vue';
  import AddButton from '../components/AddButton.vue';
  import {Ref, ref} from 'vue';
  import NoteListItem from "../components/NoteListItem.vue";
  import {useFetchUtility} from "../utils/fetchUtility.ts";
  import {Note} from "../types/note.ts";

  let notes : Ref<Note[]> = ref([]);
  let error : Ref<string | null> = ref(null);

  const sortNotes = (notes: Note[])=>{
    return notes.sort((a, b)=> {
      const dateA = (new Date(a.updatedAt as Date)).valueOf();
      const dateB = (new Date(b.updatedAt as Date)).valueOf();
      if (dateA > dateB) return -1;
      else if (dateA < dateB) return 1;
      else return 0;
    })
  }

  useFetchUtility('notes', 'GET',)
      .then(async (res)=> {
        const _notes = await res.json() as Note[];
        notes.value = sortNotes(_notes);
      })
      .catch((error)=>error.value);
</script>

<template>
  <div class='flex items-center justify-between py-2.5 px-4'>
    <h2 class='text-2xl font-semibold text-[color:var(--color-main)]'>&#9782; Notes</h2>
    <p class='text-lg text-[color:var(--color-main)]'>{{notes && notes.length}}</p>
  </div>
  <div class='p-0 my-2.5 mx-0 h-[70vh] overflow-y-auto'>
    <div v-if="error">
      <p class='mx-auto pl-2 text-red-400 text-sm'>Error getting notes. please try again later.</p>
    </div>
    <div v-else-if="notes && notes.length === 0">
      <EmptyNote/>
    </div>
    <div v-else>
      <div v-for="note in notes" >
        <NoteListItem :note="note"/>
      </div>
    </div>
  </div>
  <AddButton/>
</template>

<style scoped>

</style>