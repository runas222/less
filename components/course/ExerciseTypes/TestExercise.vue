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
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
}

.title {
  margin-bottom: 1.5rem;
  color: #1e293b;
  font-size: 1.5rem;
}

.question {
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.question-title {
  margin-bottom: 1rem;
  color: #1e293b;
  font-size: 1.25rem;
}

.question-text {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #1e293b;
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
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 1rem;
  font-style: italic;
  color: #1e293b;
}
</style>
