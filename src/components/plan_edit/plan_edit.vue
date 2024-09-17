<script setup>
import PlanEditTop from './plan_edit_top.vue';
import PlanEditMiddle from './plan_edit_middle.vue';
import PlanEditBottom from './plan_edit_bottom.vue';
import PlanEditModalAdd from './plan_edit_modal_add.vue';
import axios from 'axios';
import { ref, provide, defineProps, onMounted } from 'vue';


const props = defineProps({
  plan_id: {
    type: String,
    required: true
  }
});

const plan_id = ref(props.plan_id);
const CurrentPlan = ref(null);
const UserWorkouts = ref([]);
const CommonWorkouts = ref([]);
const server_url = localStorage.getItem('server_url')
const token = localStorage.getItem('token') ;

provide('CurrentPlan', CurrentPlan);
provide('UserWorkouts', UserWorkouts)
provide('CommonWorkouts', CommonWorkouts)


const fetchAllWorkouts = async () => {
  const token = localStorage.getItem('token') ;
  const server_url = localStorage.getItem('server_url');
  const response = await axios.get(server_url+'/get_workouts', {headers: {
            'Authorization': `Bearer ${token}`
        }});
  let workouts = response.data;
  UserWorkouts.value = workouts.filter(wk => wk.owner != 'admin');
  CommonWorkouts.value = workouts.filter(wk => wk.owner === 'admin');
  
}

const fetchWorkoutsInPlan = async (plan_id) => {
    const url = server_url+`/get_plan/${plan_id.value}`;
    const response = await axios.get(url, {
        headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    CurrentPlan.value = response.data;

};

// onMounted(() => {
//     fetchWorkoutsInPlan(plan_id);
// });


onMounted(() => {
  // console.log('mounted')
    fetchWorkoutsInPlan(plan_id);
    fetchAllWorkouts();
});



</script>

<template>
    <PlanEditTop :plan_id="plan_id"/>
    <PlanEditMiddle :plan_id="plan_id"/>
    <PlanEditBottom :plan_id="plan_id"/>
    <PlanEditModalAdd :plan_id="plan_id"/>   
</template>

<style>
@import '@/assets/css/plans/view_plan_add.css';
</style>