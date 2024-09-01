<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('')
const password = ref('')
const server_url = localStorage.getItem('server_url')
const login = async () => {
    try {       
                
                const response = await axios.post(server_url+'/login', new URLSearchParams({
                    username: username.value,
                    password: password.value
                }),{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                // console.log(response)
                if (response.data.access_token) {
                    console.log('Data:', response.data)
                    localStorage.setItem('token', response.data.access_token);
                    router.push('/start');
                } else {
                    console.log('Login failed')
                }
            } catch (error) {
                console.error('Some Error', error);
            };
}

</script>

<template>
    <div class="login-logo">Login to App</div>
        <div class="login-controls">
            <div class="login-control-group">
                <div class=""><span class="span-input">Enter login here</span></div>
                <div class=""><input v-model="username" type="text" class="input-login" name="input-login" placeholder="Type login here"></div>
            </div>
            <div class="login-control-group">
                <div class=""><span class="span-input">Enter password here</span></div>
                <div class=""><input v-model="password" type="password" class="input-login" name="input-login" placeholder="type password here"></div>
            </div>
            <div class="login-control-group">
                <button @click="login" class="button-confirm">Confirm</button>
            </div>
        </div>
        <div class="centred-div">
            <div class="text-14 login-bottom-links">
                <a href="#">Have no account? Sign Up!</a>
            </div>
            <div class="text-14 utc-orange login-bottom-links">
                What is it and how to use..
            </div>
        </div>
</template>


<style>
@import '@/assets/css/login/login.css';
</style>