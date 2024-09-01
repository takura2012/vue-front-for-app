<script setup>
import PlanEditTop from './plan_edit_top.vue';
import PlanEditMiddle from './plan_edit_middle.vue';
import PlanEditBottom from './plan_edit_bottom.vue';
import PlanEditModalAdd from './plan_edit_modal_add.vue';
import { ref, provide } from 'vue';

const CurrentPlan = ref(null);
provide('CurrentPlan', CurrentPlan);

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