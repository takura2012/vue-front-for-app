
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const new_plan_name = ref('');
const token = localStorage.getItem('token');
const server_url = localStorage.getItem('server_url');

const confirm = async () => {
    let status = 'before';
    console.log(new_plan_name.value);
    const url = server_url+'/plan_new';
    const new_name = new_plan_name.value;
    try {
        const res = await axios.post(url, new URLSearchParams({
                        new_name
                        }),{
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': `Bearer ${token}`
                            }
                        });
        
        status = res.data.status;               
        if (status == 'OK') {
            router.push('/plan_edit/'+res.data.id);
            // console.log('status: OK', 'ID=', res.data.id)
        } else {
            console.log('status:', status)
        } 
    } catch (error) {
        console.error('Catched error:', error)
    } 
};

</script>

<template>
    <div class="p-bottom-menu">
           <div class="p-bottom-item">
               <a href="/start" class="utils-block-link">
                   <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                       <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                   </svg>
                </a>
           </div>
           <div class="p-bottom-item">
               <label class="utils-block-link" for="pluscheck">
                   <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                       <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                       <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                   </svg>
               </label>
           </div>
       </div>

       <input type="checkbox" id="pluscheck">
       <div class="p-modal-blocker"></div>
       <div class="p-new-modal">
           <p class="text-24">Name your new plan</p>
           <p class="text-14">(3-20 letters)</p>
           <input v-model="new_plan_name" type="text" class="p-modal-input" placeholder="type plan name here">
           <label for="pluscheck" class="button-modal-confirm"
           @click="confirm()">
                Confirm
            </label>
           <label for="pluscheck" class="button-modal-close">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                   <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
               </svg>
           </label>
       </div>
</template>

<style>
@import '@/assets/css/plans/plans.css';
</style>