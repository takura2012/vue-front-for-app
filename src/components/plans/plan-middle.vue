
<script setup>
import { ref, onMounted, inject, watch, reactive, computed, defineProps } from 'vue';
import axios from 'axios';


const checked = inject('checked');
const server_url = localStorage.getItem('server_url')
const plans = ref(null);
const loading = ref(true);
const error = ref(null);
const plan_default_img = '/src/img/plan_default_img.png';

const userPlans = ref([]);
const adminPlans = ref([]);

const imageSrc = (img) => {
    return server_url+'/get_img/'+ img;
}

const onImgError = (event) => {
  console.log('IMG ERROR'); 
  event.target.src = plan_default_img;
};

const fetchPlans = async () => {
    try {
        const token = localStorage.getItem('token') ;
        const response = await axios.get(server_url+'/plans', {headers: {
            'Authorization': `Bearer ${token}`
        }});
        plans.value = response.data;
        // console.log(plans.value)
        userPlans.value = plans.value.filter(plan => plan.plan_owner != 'admin');
        adminPlans.value = plans.value.filter(plan => plan.plan_owner === 'admin');
    } catch (err) {
        console.log(err);
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchPlans();
});

const displayedPlans = computed(() => {
  return checked.value ? userPlans.value : adminPlans.value;
});

</script>


<template>
    <div class="p-content">
        <div v-for="plan, i in displayedPlans" :key="plan.plan_id" class="plan-item">
            <router-link :to="{name: 'PlanEdit', params: {plan_id: plan.plan_id}}" class="link-nodecoration">
                <div class="p-img">
                    <div class="p-texts">
                        <div class="p-name text-24 utc-orange">{{ plan.plan_local_name }}</div>
                        <div class="p-days utc-white">{{ plan.tip.length }} days repeatable</div>
                        <div class="p-info utc-light-gray">
                            {{ plan.plan_id }} Created by {{ plan.plan_owner }}
                        </div>
                    </div>
                    <div class="p-img-gradient"></div>
                    <img class="p-img-src" 
                    :src="imageSrc(plan.img)"
                    @error="onImgError"
                    />
                </div>
            </router-link>
        </div>
    </div>


</template>


<style scoped>
@import '@/assets/css/plans/plans.css';
</style>