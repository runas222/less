<script setup lang="ts">
import type { ReadingExercise, PracticeExercise, VideoExercise, TestExercise, ExampleExercise } from '~/types/exercises'
import ReadingExerciseComponent from './ExerciseTypes/ReadingExercise.vue'
import TestExerciseComponent from './ExerciseTypes/TestExercise.vue'
import PracticeExerciseComponent from './ExerciseTypes/PracticeExercise.vue'
import VideoExerciseComponent from './ExerciseTypes/VideoExercise.vue'

type Exercise = ReadingExercise | PracticeExercise | VideoExercise | TestExercise | ExampleExercise

const props = defineProps<{
  exercises: Exercise[]
}>()

const exerciseComponents = {
  reading: ReadingExerciseComponent,
  test: TestExerciseComponent,
  practice: PracticeExerciseComponent,
  video: VideoExerciseComponent
} as const
</script>

<template>
  <div class="exercises">
    <div v-for="exercise in exercises" :key="exercise.id">
      <component
        v-if="exercise.type === 'reading'"
        :is="exerciseComponents.reading"
        :exercise="exercise as ReadingExercise"
      />
      <component
        v-else-if="exercise.type === 'practice'"
        :is="exerciseComponents.practice"
        :exercise="exercise as PracticeExercise"
      />
      <component
        v-else-if="exercise.type === 'test'"
        :is="exerciseComponents.test"
        :exercise="exercise as TestExercise"
      />
      <component
        v-else-if="exercise.type === 'video'"
        :is="exerciseComponents.video"
        :exercise="exercise as VideoExercise"
      />
    </div>
  </div>
</template>

<style scoped>
.exercises {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
}
</style>
