

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const server_url = localStorage.getItem('server_url')
const router = useRouter()
const logout = async () => {
    try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('no token found');
                return
            }
            await axios.post(server_url+'/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            localStorage.removeItem('token');
            router.push('/login');
        } catch (error) {
            console.error('Error during logout:', error);
            }
}

</script>

<template>
    <h1>START PAGE</h1>
    <a href="/plans">PLANS</a>
    <button @click="logout">LOGOUT</button>
</template>

<style scoped>
h1 {
    color: red;
}
</style>