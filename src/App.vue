<script setup lang="ts">
import { ref } from "vue";

const errorMessage = ref("");
const value = ref("");
const todos = ref<{ id: number; value: string }[]>([]);

const onSubmit = () => {
  const todo = value.value.trim();

  if (!todo) {
    errorMessage.value = "할 일을 입력해주세요.";
    return;
  }

  todos.value.push({
    id: new Date().getUTCSeconds(),
    value: todo,
  });

  value.value = "";
  errorMessage.value = "";
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="value" />
    <button type="submit">제출하기</button>
  </form>
  <div class="error">{{ errorMessage }}</div>

  <ul>
    <li v-for="{ id, value } in todos" :key="id">
      {{ value }}
    </li>
  </ul>
</template>

<style scoped>
.error {
  color: #f00;
}
</style>
