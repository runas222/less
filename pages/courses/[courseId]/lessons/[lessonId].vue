<template>
  <div class="dashboard-page">
    <template v-if="pending">
      <div class="loading">Загрузка...</div>
    </template>
    <template v-else-if="error">
      <div class="error">Ошибка при загрузке урока</div>
    </template>
    <template v-else>
      <div class="lesson-header" v-if="lesson && course">
        <div class="breadcrumbs">
          <NuxtLink to="/courses" class="breadcrumb">Курсы</NuxtLink>
          <ChevronRightIcon class="breadcrumb-icon" />
          <NuxtLink :to="`/courses/${course.id}`" class="breadcrumb">{{ course.title }}</NuxtLink>
          <ChevronRightIcon class="breadcrumb-icon" />
          <span class="breadcrumb current">{{ lesson.title }}</span>
        </div>
        
        <div class="tabs">
          <button 
            :class="['tab', { active: activeTab === 'lesson' }]"
            @click="activeTab = 'lesson'"
          >
            Урок
          </button>
          <button 
            :class="['tab', { active: activeTab === 'exercises' }]"
            @click="activeTab = 'exercises'"
          >
            Упражнения
          </button>
          <button 
            :class="['tab', { active: activeTab === 'tests' }]"
            @click="activeTab = 'tests'"
          >
            Тесты
          </button>
        </div>

        <div class="lesson-info">
          <h1 class="lesson-title">{{ lesson.title }}</h1>
          <div class="lesson-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${courseProgress}%` }"></div>
            </div>
            <div class="progress-text">{{ Math.round(courseProgress) }}% завершено</div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'lesson'" class="lesson-content">
        <div class="content-card">
          <div class="text-content" v-html="formattedContent"></div>
        </div>
      </div>

      <div v-if="activeTab === 'exercises'" class="exercises-content">
        <CourseExercises v-if="lesson?.exercises" :exercises="lesson.exercises.filter((e: Exercise) => e.type !== 'test')" />
      </div>

      <div v-if="activeTab === 'tests'" class="tests-content">
        <CourseExercises v-if="lesson?.exercises" :exercises="lesson.exercises.filter((e: Exercise) => e.type === 'test')" />
      </div>

      <div class="lesson-navigation">
        <button 
          class="nav-button prev"
          :disabled="!hasPreviousLesson"
          @click="navigateToPreviousLesson"
        >
          <ArrowLeftIcon class="icon" />
          <span v-if="hasPreviousLesson && completedLessons.includes(course!.lessons![currentLessonIndex - 1].id)" class="completed-icon">
            <CheckIcon class="check-icon" />
          </span>
          Предыдущий урок
        </button>
        <button 
          class="nav-button next"
          :disabled="!hasNextLesson"
          @click="navigateToNextLesson"
        >
          <span v-if="hasNextLesson && completedLessons.includes(course!.lessons![currentLessonIndex + 1].id)" class="completed-icon">
            <CheckIcon class="check-icon" />
          </span>
          Следующий урок
          <ArrowRightIcon class="icon" />
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@heroicons/vue/24/outline'
import CourseExercises from '~/components/course/CourseExercises.vue'

const activeTab = ref<'lesson' | 'exercises' | 'tests'>('lesson')

const route = useRoute()
const courseId = parseInt(route.params.courseId as string)
const lessonId = parseInt(route.params.lessonId as string)

const completedLessons = ref<number[]>([])
const courseProgress = computed(() => {
  if (!course.value?.lessons) return 0
  const totalLessons = course.value.lessons.length
  const completedCount = completedLessons.value.length
  return (completedCount / totalLessons) * 100
})

const markLessonCompleted = () => {
  if (!lesson.value || completedLessons.value.includes(lesson.value.id)) return
  completedLessons.value.push(lesson.value.id)
}

onMounted(() => {
  const savedProgress = localStorage.getItem(`course-${courseId}-progress`)
  if (savedProgress) {
    completedLessons.value = JSON.parse(savedProgress)
  }
})

watch(completedLessons, (newValue) => {
  localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(newValue))
}, { deep: true })

import type { Lesson, Exercise } from '~/types/exercises'

interface Course {
  id: number
  title: string
  description: string
  image: string
  lessonsCount: number
  isPopular?: boolean
  lessons?: Lesson[]
  rating?: {
    value: number
    count: number
  }
  category?: string
}

const { data: courseData, error: courseError, pending } = await useFetch<Course>(`/api/courses/${courseId}`)
const course = computed(() => courseData.value)
const error = ref(courseError.value)

const lesson = computed(() => {
  if (!course.value?.lessons) {
    error.value = new Error('Уроки не найдены')
    return null
  }
  const foundLesson = course.value.lessons.find((l: Lesson) => l.id === lessonId)
  if (!foundLesson) {
    error.value = new Error('Урок не найден')
  }
  return foundLesson
})

const formattedContent = computed(() => {
  if (!lesson.value) return ''
  return lesson.value.content.replace(/\n/g, '<br>')
})

const currentLessonIndex = computed(() => {
  if (!course.value?.lessons) return -1
  return course.value.lessons.findIndex(l => l.id === lessonId)
})

const hasPreviousLesson = computed(() => {
  return currentLessonIndex.value > 0
})

const hasNextLesson = computed(() => {
  if (!course.value?.lessons) return false
  return currentLessonIndex.value < course.value.lessons.length - 1
})

const navigateToPreviousLesson = () => {
  if (!course.value?.lessons || !hasPreviousLesson.value) return
  const prevLesson = course.value.lessons[currentLessonIndex.value - 1]
  navigateTo(`/courses/${courseId}/lessons/${prevLesson.id}`)
}

const navigateToNextLesson = () => {
  if (!course.value?.lessons || !hasNextLesson.value) return
  const nextLesson = course.value.lessons[currentLessonIndex.value + 1]
  navigateTo(`/courses/${courseId}/lessons/${nextLesson.id}`)
}
</script>

<style scoped>
.dashboard-page {
  background: #f8fafc;
  min-height: 100vh;
  padding: 2rem;
}

.loading,
.error {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.lesson-header {
  max-width: 1200px;
  margin: 0 auto 2rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: #64748b;
  font-size: 0.9rem;
}

.breadcrumb {
  color: #64748b;
  text-decoration: none;
}

.breadcrumb.current {
  color: #1e293b;
  font-weight: 500;
}

.breadcrumb-icon {
  width: 1rem;
  height: 1rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: #64748b;
  transition: all 0.2s;
}

.tab:hover {
  color: #3b82f6;
}

.tab.active {
  color: #3b82f6;
  border-bottom: 2px solid #3b82f6;
}

.lesson-info {
  max-width: 800px;
  margin: 0 auto;
}

.lesson-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.lesson-progress {
  margin-top: 1rem;
}

.progress-bar {
  height: 0.5rem;
  background: #e2e8f0;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.progress-bar div {
  height: 100%;
  background: #3b82f6;
  border-radius: 0.25rem;
}

.progress-text {
  color: #64748b;
  font-size: 0.9rem;
}

.lesson-content,
.exercises-content {
  max-width: 1200px;
  margin: 0 auto;
}

.content-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.text-content {
  line-height: 1.6;
  font-size: 1rem;
  color: #1e293b;
}

.text-content :deep(h3) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: #1e293b;
  font-size: 1.25rem;
}

.text-content :deep(br) {
  margin-bottom: 1rem;
  display: block;
  content: "";
}

.text-content :deep(ul) {
  margin-top: 1.5rem;
  padding-left: 1rem;
}

.text-content :deep(li) {
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
  font-size: 1rem;
  color: #1e293b;
}

.text-content :deep(li::before) {
  content: '•';
  position: absolute;
  left: 0;
  color: #3b82f6;
}

@media (max-width: 768px) {
  .text-content {
    font-size: 0.95rem;
  }
  
  .text-content :deep(h3) {
    font-size: 1.1rem;
  }
  
  .text-content :deep(li) {
    font-size: 0.95rem;
  }
}

.lesson-navigation {
  max-width: 1200px;
  margin: 2rem auto 0;
  display: flex;
  justify-content: space-between;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-button:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.nav-button .icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 1rem;
  }
  
  .lesson-header {
    padding: 1.5rem;
  }
  
  .lesson-title {
    font-size: 1.5rem;
  }
  
  .content-card {
    padding: 1.5rem;
  }
  
  .nav-button {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
