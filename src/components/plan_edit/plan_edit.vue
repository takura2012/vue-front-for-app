<script setup>
import PlanEditTop from './plan_edit_top.vue';
import PlanEditMiddle from './plan_edit_middle.vue';
import PlanEditBottom from './plan_edit_bottom.vue';
import PlanEditModalAdd from './plan_edit_modal_add.vue';
import { ref, provide } from 'vue';

const CurrentPlan = ref(null);
const plan_id = ref(14); //5 14

provide('CurrentPlan', CurrentPlan);
provide('plan_id', plan_id);

</script>

<template>
    <PlanEditTop/>
    <PlanEditMiddle/>
    <PlanEditBottom/>
    <PlanEditModalAdd/>   
</template>

<style>
@import '@/assets/css/plans/view_plan_add.css';
</style>