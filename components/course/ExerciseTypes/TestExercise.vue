<template>
  <div class="test-exercise">
    <h2 class="title">{{ exercise.title }}</h2>
    
    <div class="questions">
      <div 
        v-for="(question, index) in exercise.questions" 
        :key="index"
        class="question"
      >
        <h3 class="question-title">Вопрос {{ index + 1 }}</h3>
        <p class="question-text">{{ question.question }}</p>
        
        <div class="options">
          <div
            v-for="(option, optionIndex) in question.options"
            :key="optionIndex"
            class="option"
          >
            <input
              type="radio"
              :name="`question-${index}`"
              :id="`option-${index}-${optionIndex}`"
              :value="optionIndex"
            >
            <label :for="`option-${index}-${optionIndex}`">
              {{ option }}
            </label>
          </div>
        </div>
        
        <div v-if="question.explanation" class="explanation">
          {{ question.explanation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Exercise } from '~/types/exercises'

const props = defineProps<{
  exercise: Exercise & { type: 'test' }
}>()
</script>

<style scoped>
.test-exercise {
  margin-top: 20px;
  max-width: 800px;
}

.title {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.question {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.question-title {
  margin-bottom: 1rem;
  color: #34495e;
}

.question-text {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.option input {
  margin: 0;
}

.option label {
  cursor: pointer;
}

.explanation {
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 4px;
  font-style: italic;
  color: #666;
}
</style>
