<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
const todos = ref<{ id: number; value: string }[]>([]);

const onSubmit = () => {
  todos.value.push({
    id: new Date().getUTCSeconds(),
    value: value.value,
  });
  value.value = "";
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="value" />
    <button type="submit">제출하기</button>
  </form>

  <ul>
    <li v-for="{ id, value } in todos" :key="id">
      {{ value }}
    </li>
  </ul>
</template>

<style scoped></style>
