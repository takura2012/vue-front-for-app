<script setup>
import { inject, ref, watchEffect } from 'vue';
import axios from 'axios';

const UserWorkouts = inject('UserWorkouts');
const CommonWorkouts = inject('CommonWorkouts');
const CurrentPlan = inject('CurrentPlan');

const modal_selected = ref('filled');
const DisplayedWorkouts = ref([]);
const modal_header = ref('');
const server_url = localStorage.getItem('server_url');

const heart_click = () => {
    if (modal_selected.value === 'empty') {
        modal_selected.value = 'filled';
        DisplayedWorkouts.value = CommonWorkouts.value;
        modal_header.value = "Добавить тренировку (общие)";
    } else {
        modal_selected.value = 'empty';
        DisplayedWorkouts.value = UserWorkouts.value;
        modal_header.value = "Добавить тренировку (личные)";
    }
    // console.log(modal_selected.value)
}

watchEffect(() => {
  if (CommonWorkouts) {
    DisplayedWorkouts.value = CommonWorkouts.value;
    modal_header.value = "Добавить тренировку (общие)";
  }
});

const plan_add = async (plan_id, workout_id) => {

            const token = localStorage.getItem('token') ;
            let response = await axios.post(server_url+'/plan_add', new URLSearchParams({
                    plan_id,
                    workout_id
                }),{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`
                    }
                });

                response = await axios.get(server_url+'/get_plan/'+plan_id);
                if (response.data.status != 'fail') {
                    CurrentPlan.value = response.data;
                    // console.log(CurrentPlan);
                } else {
                    console.log(response.data.status);
                }


            }


</script>

<template>
    <div>
        <input type="checkbox" id="modal-add-check" class="invisible">
        <div class="add-modal-blocker"></div>
        <div class="modal-add-workouts">
            <div class="modal-add-workouts-top">

                <div class="modal-add-workouts-top-text text-24">{{ modal_header }}</div>
                <div class="modal-add-workouts-top-heart utc-red" id="add-heart-empty"
                    @click="heart_click()"
                    :class="{'display-none': modal_selected === 'filled'}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>
                </div>
                <div class="modal-add-workouts-top-heart utc-red" id="add-heart-fill"
                    @click="heart_click()"
                    :class="{'display-none': modal_selected === 'empty'}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>
                </div>

                <div class="modal-add-workouts-top-close">
                    <label for="modal-add-check">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </label>
                </div>
            </div>

            <div class="modal-add-workouts-middle">
                
                <div v-for="workout, index in DisplayedWorkouts" class="modal-add-workouts-item" @click="plan_add(CurrentPlan.plan_id, workout.id)">
                    <label for="modal-add-check">
                        <div class="modal-add-texts">
                            <div class="modal-add-texts-name text-18 utc-orange">{{ workout.name }}</div>
                            <div class="modal-add-texts-count utc-light-gray">Exercises: {{ workout.exercises_count }}</div>
                            <div class="utc-light-gray">Duration ~ {{ workout.duration }} min.</div>
                        </div>
                        <div class="modal-add-workouts-img-group">
                            <div class="modal-add-workouts-img-gradient"></div>
                            <img class="modal-add-workouts-img-src" src="">
                        </div>
                    </label>

                </div>


            </div>
            <div class="modal-add-workouts-bottom"></div>
        </div>
    </div>
</template>

<style></style>