<template>
  <div class="reading-exercise">
    <div class="content">
      <div v-html="exercise.content"></div>
      
      <div v-if="exercise.keyPoints.length" class="key-points">
        <h3>Ключевые моменты:</h3>
        <ul>
          <li 
            v-for="(point, index) in exercise.keyPoints" 
            :key="index"
            class="point"
          >
            {{ point }}
          </li>
        </ul>
      </div>
      
      <div v-if="exercise.examples?.length" class="examples">
        <h3>Примеры из практики:</h3>
        <div 
          v-for="(example, index) in exercise.examples" 
          :key="index"
          class="example"
        >
          {{ example }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Exercise } from '~/types/exercises'

const props = defineProps<{
  exercise: Exercise & { type: 'reading' }
}>()
</script>

<style scoped>
.reading-exercise {
  margin-top: 20px;
  max-width: 800px;
}


.content {
  line-height: 1.6;
  font-size: 1.1rem;
}

.content >>> h3 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: #34495e;
}

.key-points {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.point {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
}

.point::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3498db;
}

.examples {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.example {
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
</style>
