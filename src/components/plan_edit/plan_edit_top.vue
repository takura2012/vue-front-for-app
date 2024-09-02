<script setup>

import { inject, computed, defineProps} from 'vue';

const CurrentPlan = inject('CurrentPlan');

const props = defineProps({
  plan_id: {
    type: String,
    required: true
  }
});
console.log('PLAN-EDIT-TOP=', props.plan_id)

const server_url = localStorage.getItem('server_url')

const imageSrc = (img) => {
    return server_url+'/get_img/' + img;
}

const backgroundStyle = computed(() => {
  if (!CurrentPlan) {
    return {};
  }
  console.log(`url(${server_url}/get_img/${CurrentPlan.value.plan_owner_id}-${CurrentPlan.value.plan_img})`);
  return {

    backgroundImage: `url(${server_url}/get_img/${CurrentPlan.value.plan_owner_id}-${CurrentPlan.value.plan_img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

});

</script>



<template>
    <div v-if="CurrentPlan && CurrentPlan.plan_name" class="vp-top-name" :style="backgroundStyle">
        <div class="vp-name">
            <label for="fud" class="utils-block-link shadowed-text">
                {{CurrentPlan.plan_name}}
            </label>
            <input type="checkbox" class="hidden-check" id="fud">
            <div class="vp-modal-blocker"></div>
            <div class="vp-rename-modal">
                <p class="text-24">Rename current Plan</p>
                <input type="text" class="vp-modal-input text-24" v-model="CurrentPlan.plan_name">
                
                <div class="plan-rename-img text-14">
                    <img :src="imageSrc(CurrentPlan.plan_owner_id + '-' + CurrentPlan.plan_img)" alt="set plan image">
                </div>
                
                    <label for="fud" class="button-modal-confirm">Confirm</label>
                    
                <div class="modal-rename-footer text-14">
                    <button class="button-modal-delete">Delete</button>
                    Удаленный план восстановить невозможно
                </div>
            </div>
        </div>
        <div v-if="CurrentPlan && CurrentPlan.workouts_count" class="vp-count">{{CurrentPlan.workouts_count}} day workouts plan</div>
    </div>
</template>

<style>

</style>