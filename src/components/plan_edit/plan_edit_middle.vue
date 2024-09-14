<script setup>
import { ref, onMounted, inject, defineProps, computed } from 'vue';
import axios from 'axios';

const server_url = localStorage.getItem('server_url');
const token = localStorage.getItem('token') ;
const props = defineProps({
  plan_id: {
    type: String,
    required: true
  }
});
// console.log('PLAN-EDIT-MIDDLE=', props.plan_id);
const plan_id = ref(props.plan_id);

const CurrentPlan = inject('CurrentPlan');

const selectedBlock = ref(null);

const isMobile = computed(() => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
});

const selectBlock = (index) => {

    // console.log("before", selectedBlock.value);
    if (selectedBlock.value == index) {
        // console.log("after", selectedBlock.value);
        selectedBlock.value = null;
        return
    }

  selectedBlock.value = index;
};


const UpClick = (index) => {
    if (index == 0) { return }
    let temp_workout = {};
    temp_workout = CurrentPlan.value.workouts[index-1];
    CurrentPlan.value.workouts[index-1] = CurrentPlan.value.workouts[index];
    CurrentPlan.value.workouts[index] = temp_workout;
    selectBlock(index-1);
}

const DownClick = (index) => {
    // console.log('CurrentPlan.value.workouts.length=', CurrentPlan.value.workouts.length, ' index=', index)
    if (index == CurrentPlan.value.workouts.length-1) { return }
    let temp_workout = {};
    temp_workout = CurrentPlan.value.workouts[index+1];
    CurrentPlan.value.workouts[index+1] = CurrentPlan.value.workouts[index];
    CurrentPlan.value.workouts[index] = temp_workout;
    selectBlock(index+1);
}

const DelClick = async (index, PT_id) => {
    selectedBlock.value = null;
    // console.log('delclick, PT_id=', PT_id);
    const token = localStorage.getItem('token');
    let status = 'before post'
    try {
            let response = await axios.post(server_url+'/plan_del_wk', new URLSearchParams({
                        PT_id
                    }),{
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
            status = response.data.status;
            if (status!='OK') {
                console.log('del_status: ', status);
                return {}
            }
            response = await axios.get(server_url+'/get_plan/'+CurrentPlan.value.plan_id, {
                headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`
                    }
            });
            if (response.data.status != 'fail') {
                CurrentPlan.value = response.data;
            } else {
                console.log(response.data.status);
            }

            } catch {
                status = 'catch error'
                console.log('Error post to server plan_del_wk')
            };
    console.log('Status:', status);
    
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

onMounted(() => {
    fetchWorkoutsInPlan(plan_id);
});

</script>

<template>
    <div v-if="CurrentPlan && CurrentPlan.plan_name" class="vp-wks">
            
            <div v-for="workout, index in CurrentPlan.workouts" 
                        :key="index"
                        class="vp-wk"
                        :class="{ active: selectedBlock === index }"
                        @click="selectBlock(index)"
                        >
                <div class="vp-wk-leftbar">
                    <div class="vp-wk-leftbar-up" @click.stop="UpClick(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                        </svg>
                    </div>
                    <div class="vp-wk-leftbar-down" @click.stop="DownClick(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                        </svg>
                    </div>
                </div>
                <div class="vp-wk-rightbar-del" @click.stop="DelClick(index, workout.PT_id)">
                    <div class="round">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg utc-red" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </div>
                </div>

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