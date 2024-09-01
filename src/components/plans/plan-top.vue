<script setup>
import { ref, inject, computed } from 'vue';

const checked = inject('checked');
const owner = computed(() => { return checked.value ? 'Your':'Common'});
</script>

<template>
    <div class="p-top">
           <div class="p-top-name text-36">{{owner}} Training plans</div>
           <input type="checkbox" id="heartswitcher" v-model="checked">
           <label for="heartswitcher" class="p-top-heart-fill">
               <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                   <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
               </svg>
           </label>
           <label for="heartswitcher" class="p-top-heart-empty">
               <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                   <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
               </svg>
           </label>
       </div>
</template>

<style>
@import '@/assets/css/plans/plans.css';
</style>