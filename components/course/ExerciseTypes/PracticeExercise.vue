<template>
  <div class="practice-exercise">
    <h2 class="title">{{ exercise.title }}</h2>
    
    <div class="task">
      <h3>Задание:</h3>
      <p>{{ exercise.task }}</p>
    </div>
    
    <div v-if="exercise.hints?.length" class="hints">
      <h3>Подсказки:</h3>
      <ul>
        <li 
          v-for="(hint, index) in exercise.hints" 
          :key="index"
          class="hint"
        >
          {{ hint }}
        </li>
      </ul>
    </div>
    
    <div v-if="exercise.solution" class="solution">
      <h3>Решение:</h3>
      <pre>{{ exercise.solution }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Exercise } from '~/types/exercises'

const props = defineProps<{
  exercise: Exercise & { type: 'practice' }
}>()
</script>

<style scoped>
.practice-exercise {
  margin-top: 20px;
  max-width: 800px;
}

.title {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.task {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.task h3 {
  margin-bottom: 1rem;
  color: #34495e;
}

.task p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.hints {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.hints h3 {
  margin-bottom: 1rem;
  color: #34495e;
}

.hint {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.hint::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3498db;
}

.solution {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.solution h3 {
  margin-bottom: 1rem;
  color: #34495e;
}

.solution pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background: white;
  padding: 1rem;
  border-radius: 4px;
}
</style>
