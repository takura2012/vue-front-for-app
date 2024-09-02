<script setup>
import PlanEditTop from './plan_edit_top.vue';
import PlanEditMiddle from './plan_edit_middle.vue';
import PlanEditBottom from './plan_edit_bottom.vue';
import PlanEditModalAdd from './plan_edit_modal_add.vue';
import { ref, provide, defineProps } from 'vue';

const props = defineProps({
  plan_id: {
    type: String,
    required: true
  }
});

const CurrentPlan = ref(null);


provide('CurrentPlan', CurrentPlan);


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