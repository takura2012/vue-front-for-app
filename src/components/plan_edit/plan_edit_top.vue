<script setup>
import { inject } from 'vue';

const CurrentPlan = inject('CurrentPlan');

</script>

<template>
    <div class="vp-top-name">
        <div v-if="CurrentPlan && CurrentPlan.plan_name" class="vp-name">
            <label for="fud" class="utils-block-link utc-white">
                {{CurrentPlan.plan_name}}
            </label>
            <input type="checkbox" class="hidden-check" id="fud">
            <div class="vp-modal-blocker"></div>
            <div class="vp-rename-modal">
                <p class="text-24">Rename current Plan</p>
                <input type="text" class="vp-modal-input" value="Fullbody for newbie workouts plan">
                <label for="fud" class="button-modal-confirm">Confirm</label>
            </div>
        </div>
        <div v-if="CurrentPlan && CurrentPlan.workouts_count" class="vp-count">{{CurrentPlan.workouts_count}} day workouts plan</div>
    </div>
</template>

<style></style>