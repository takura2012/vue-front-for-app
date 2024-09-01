<script setup>
import PlanTop from './plan-top.vue';
import PlanMiddle from './plan-middle.vue';
import PlanBottom from './plan-bottom.vue';
import { ref, provide } from 'vue';

const checked = ref(false);
provide('checked', checked)
</script>

<template>
    <PlanTop/>
    <PlanMiddle/>
    <PlanBottom/>
</template>

<style></style>