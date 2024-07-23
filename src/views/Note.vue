<script setup lang="ts">
import { IconArrowLeft} from '@tabler/icons-vue';
import {onMounted, Ref, ref} from "vue";
import {useRoute, useRouter} from 'vue-router'
import {useCookies} from "@vueuse/integrations/useCookies";
import {useFetchUtility} from "../utils/fetchUtility.ts";

const route = useRoute();
const router = useRouter()
const {get} = useCookies();
const isNoteNew: Ref<boolean> = ref(route.params.id === 'new');
const newNote: Ref<string> = ref('');
const error: Ref<string | null> = ref(null);

onMounted(()=> fetchNote(route.params.id as string))

const fetchNote = async (id: string) => {
  if (isNoteNew.value) return;
  try {
    const noteReq = await useFetchUtility('notes/' + id, 'GET');
    const note = await noteReq.json();
    newNote.value = note.body;
  }catch (err: any) {
    error.value=err.message
  }
}

const handleDeleteNote = ()=>{
  useFetchUtility('notes/'+route.params.id, 'DELETE')
      .then(()=>router.push('/notes'))
      .catch((err: any)=> {
        error.value = err.message
      });
}

const handleSubmitNote =()=>{
  if (newNote.value.length === 0){
    router.push('/notes');
    return;
  }
  const noteOwnerId = get('note_user_id');
  if (isNoteNew.value){
    useFetchUtility('notes', 'POST', JSON.stringify({body: newNote.value, owner: noteOwnerId}))
        .then((res)=>res.json())
        .then(()=>router.push('/notes'))
        .catch((err: any)=>error.value=err.message);
  }else{
    useFetchUtility('notes/'+route.params.id, 'PUT', JSON.stringify({body: newNote.value, owner: noteOwnerId}))
        .then((res)=>res.json())
        .then(()=>router.push('/notes'))
        .catch((err: any)=>error.value=err.message);
  }
}

</script>

<template>
  <div class='w-full max-w-[480px] mx-auto h-[88vh] relative font-semibold bg-[color:var(--color-bg)]'>
    <p class='mx-auto pl-2 text-red-400 text-sm' v-if="error">{{error}}</p>
    <div class='flex items-center justify-between p-2.5'>
      <h3 class='flex items-center text-2xl cursor-pointer'>
        <IconArrowLeft class='w-5 mr-2 text-[color:var(--color-text)]' @click="handleSubmitNote"/>
      </h3>
      <button v-if="!isNoteNew"
              class='border-0 outline-0 font-semibold bg-transparent text-lg text-[color:var(--color-text)]'
              @click="handleDeleteNote">Delete</button>
      <button v-else
              class='border-0 outline-0 font-semibold bg-transparent text-lg text-[color:var(--color-text)]'
              @click="handleSubmitNote">Done</button>
    </div>
    <textarea
        v-model="newNote"
    placeholder='Note here'
    class='border-0 outline-0 py-4 px-3 w-full h-[calc(100vh-116px)]
    resize-none active:outline-0 active:border-0 text-[color:var(--color-text)] rounded bg-transparent text-pretty'/>
    </div>
</template>

<style scoped>

</style>