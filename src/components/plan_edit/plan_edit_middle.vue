<script setup>
import { ref, onMounted, inject, defineProps } from 'vue';
import axios from 'axios';

const server_url = localStorage.getItem('server_url');

const props = defineProps({
  plan_id: {
    type: String,
    required: true
  }
});
console.log('PLAN-EDIT-MIDDLE=', props.plan_id);
const plan_id = ref(props.plan_id);

const CurrentPlan = inject('CurrentPlan');
// const plan_id = inject('plan_id')

const fetchWorkoutsInPlan = async (plan_id) => {
    console.log('fetch');
    const response = await axios.get(server_url+`/get_plan/${plan_id.value}`);
    CurrentPlan.value = response.data;
    console.log('Data:', CurrentPlan.value);
};

onMounted(() => {
    fetchWorkoutsInPlan(plan_id);
});

</script>

<template>
    <div v-if="CurrentPlan && CurrentPlan.plan_name" class="vp-wks">
            
            <div v-for="workout, index in CurrentPlan.workouts" key="index"  class="vp-wk">
                <a href="#" class="vp-wk-link">
                    <div class="vp-wk-texts">
                        <div class="vp-wk-name text-18">{{ workout.workout_name }}</div>
                        <div class="vp-wk-info">
                            <div class="vp-wk-count">Exercises: {{ workout.exercises_count }}</div>
                            <div class="vp-wk-type">Duration: ~{{ workout.workout_duration }}min.</div>
                        </div>
                    </div>
                    <div class="img-gradient">
                        <div class="vp-wk-img">
                            <img class="vp-wk-img-src" src="">
                        </div>
                    </div>
                </a>
            </div>

            

    </div>
</template>

<style>
</style>