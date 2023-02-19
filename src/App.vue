<script setup lang="ts">
import { ref } from "vue";

type ToDo = { id: number; value: string };

const errorMessage = ref("");
const value = ref("");
const ongoingTodos = ref<ToDo[]>([]);
const completedTodos = ref<ToDo[]>([]);

const onSubmit = () => {
  const todo = value.value.trim();

  if (!todo) {
    errorMessage.value = "할 일을 입력해주세요.";
    return;
  }

  ongoingTodos.value.push({
    id: new Date().getUTCMilliseconds(),
    value: todo,
  });

  value.value = "";
  errorMessage.value = "";
};

const removeTodo = (id: number) => {
  ongoingTodos.value = ongoingTodos.value.filter((item) => {
    return item.id !== id;
  });
};

const moveToCompleted = (id: number) => {
  const index = ongoingTodos.value.findIndex((item) => item.id === id);

  if (index === -1) return;

  completedTodos.value.push(ongoingTodos.value[index]);
  ongoingTodos.value.splice(index, 1);
};

const moveToOngoing = (id: number) => {
  const index = completedTodos.value.findIndex((item) => item.id === id);

  if (index === -1) return;

  ongoingTodos.value.push(completedTodos.value[index]);
  completedTodos.value.splice(index, 1);
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="value" />
    <button type="submit">제출하기</button>
  </form>
  <div class="error">{{ errorMessage }}</div>

  <article v-if="ongoingTodos.length !== 0">
    <h2>할 일</h2>
    <ul>
      <li v-for="{ id, value } in ongoingTodos" :key="id">
        <input type="checkbox" :checked="false" @change="moveToCompleted(id)" />
        {{ value }}
        <button type="button" @click="removeTodo(id)">remove</button>
      </li>
    </ul>
  </article>

  <article v-if="completedTodos.length !== 0">
    <h2>완료</h2>
    <ul>
      <li v-for="{ id, value } in completedTodos" :key="id">
        <input type="checkbox" :checked="true" @change="moveToOngoing(id)" />
        {{ value }}
        <button type="button" @click="removeTodo(id)">remove</button>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.error {
  color: #f00;
}
</style>
