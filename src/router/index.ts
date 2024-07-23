import { createWebHistory, createRouter } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies'

import Register from '../views/Register.vue';
import NoteList from "../views/NoteList.vue";
import Note from '../views/Note.vue';
import Login from '../views/Login.vue';
import NotFound from "../components/NotFound.vue";

const routes = [
    {path: '/', name: 'Home', redirect: '/notes'},
    {path: '/register', name: 'Register', component: Register},
    {path: '/login', name: 'Login', component: Login},
    {path: '/notes', name: 'NoteList', component: NoteList},
    {path: '/notes/:id', name: 'Note', component: Note},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({history: createWebHistory(), routes});

export const userIsAuthenticated = ()=>{
    const {get} = useCookies();
    return !!get('note_user_token') && !!get('note_user_id') && !!get('note_user');
}

router.beforeEach((to, from, next) => {
    console.log(from);
    if (to.name !== 'Login' && to.name !== 'Register' && !userIsAuthenticated() ) next({ name: 'Register' })
    else next()
})

export default router;