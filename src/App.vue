<script setup lang="ts">
import { onMounted, ref } from "vue";
import { TEngine } from "./ts/TEngine";

const threeTarget = ref<HTMLElement>()
onMounted(()=>{
  const te = new TEngine(threeTarget)

})
</script>

<template>
 <div class="three-canvas" ref="threeTarget"></div>
</template>

<style>

</style>
