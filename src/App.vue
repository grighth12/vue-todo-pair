<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
const todos = ref<string[]>([]);

const onSubmit = () => {
  todos.value.push(value.value);
  value.value = "";
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="value" />
    <button type="submit">제출하기</button>
  </form>

  <div>{{ todos.join() }}</div>
</template>

<style scoped></style>
