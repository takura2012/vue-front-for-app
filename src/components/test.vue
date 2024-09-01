<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const server_url = localStorage.getItem('server_url')
const img_url = ref('')
const img_api_url = ref(server_url+'/get_img_url/')
const img_name = ref('plan1.png')
const fetchImg = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Not authorized (no token)');
    return}
  try {
  const response = await axios.get(img_api_url.value + img_name.value, {headers: {
            'Authorization': `Bearer ${token}`
        }});
        console.log(response.data.id)
        img_url.value = response.data.id
      } catch (err) {
        console.log(err)
      }

        // id.value = response;
}
onMounted(()=> {
  fetchImg();
});

</script>

<template>
    <div>
      {{ img_url }}
    </div>
  </template>
  