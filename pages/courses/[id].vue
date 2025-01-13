<template>
  <div class="course-page">
    <template v-if="pending">
      <div class="loading">Загрузка курса...</div>
    </template>
    <template v-else-if="error">
      <div class="error">Ошибка при загрузке курса</div>
    </template>
    <template v-else-if="course">
      <div class="course-header">
        <div class="breadcrumbs">
          <NuxtLink to="/courses" class="breadcrumb">Курсы</NuxtLink>
          <ChevronRightIcon class="breadcrumb-icon" />
          <span class="breadcrumb current">{{ course.title }}</span>
        </div>
        <h1 class="course-title">{{ course.title }}</h1>
        <p class="course-description">{{ course.description }}</p>
        <div class="course-stats">
          <div class="stat-card">
            <div class="stat-value">{{ course.lessons?.length || 0 }}</div>
            <div class="stat-label">Уроков</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ course.rating?.value || 0 }}</div>
            <div class="stat-label">Рейтинг</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ course.rating?.count || 0 }}</div>
            <div class="stat-label">Отзывов</div>
          </div>
        </div>
      </div>

      <div class="course-content">
        <div class="lessons-grid">
          <div
            v-for="lesson in course.lessons"
            :key="lesson.id"
            class="lesson-card"
          >
            <NuxtLink 
              :to="`/courses/${course.id}/lessons/${lesson.id}`"
              class="lesson-link"
            >
              <div class="lesson-icon">
                <PlayIcon class="icon" />
              </div>
              <div class="lesson-info">
                <h3 class="lesson-title">{{ lesson.title }}</h3>
                <p class="lesson-description">{{ lesson.content.slice(0, 100) }}...</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon, PlayIcon } from '@heroicons/vue/24/outline'
import type { Course } from '~/types/exercises'

const route = useRoute()
const courseId = parseInt(route.params.id as string)

const { data: course, pending, error } = await useFetch<Course>(`/api/courses/${courseId}`)
</script>

<style scoped>
.course-page {
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
  text-align: center;
}

.course-header {
  max-width: 1200px;
  margin: 0 auto;
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

.course-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.course-description {
  color: #64748b;
  margin-bottom: 2rem;
}

.course-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-card {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}

.stat-label {
  color: #64748b;
  font-size: 0.9rem;
}

.course-content {
  max-width: 1200px;
  margin: 2rem auto 0;
}

.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.lesson-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.lesson-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.lesson-link {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.lesson-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lesson-icon .icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #0ea5e9;
}

.lesson-info {
  flex: 1;
}

.lesson-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.lesson-description {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .course-page {
    padding: 1rem;
  }
  
  .course-header {
    padding: 1.5rem;
  }
  
  .course-title {
    font-size: 1.5rem;
  }
  
  .course-stats {
    gap: 1rem;
  }
  
  .lessons-grid {
    grid-template-columns: 1fr;
  }
  
  .lesson-link {
    padding: 1rem;
  }
}
</style>
