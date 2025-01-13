<template>
  <NuxtLink :to="`/courses/${course.id}`" class="course-card">
    <div class="image-wrapper">
      <img :src="course.image" :alt="course.title" class="course-image">
      <div v-if="course.category" class="category-badge">
        {{ course.category }}
      </div>
    </div>
    <div class="content">
      <h3 class="title">{{ course.title }}</h3>
      <p class="description">{{ course.description }}</p>
      
      <div class="progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${course.progress || 0}%` }"></div>
        </div>
        <div class="progress-text">{{ course.progress || 0 }}% завершено</div>
      </div>

      <div class="meta">
        <div class="meta-item">
          <span class="lessons-count">{{ course.lessonsCount }} уроков</span>
        </div>
        <div class="meta-item">
          <span v-if="course.isPopular && course.rating && course.rating.value >= 4.5" class="popular-badge">Популярный</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Course } from '../../server/data/courses'

defineProps<{
  course: Omit<Course, 'lessons'> & {
    progress?: number
  }
}>()
</script>

<style scoped>
.course-card {
  display: block;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.image-wrapper {
  position: relative;
  padding-top: 56.25%;
  background: #f5f5f5;
}

.course-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.content {
  padding: 1.5rem;
}

.title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #1a1a1a;
}

.description {
  margin: 0 0 1rem;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

.progress {
  margin: 1rem 0;
}

.progress-bar {
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s ease;
}

.progress-text {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  text-align: right;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #888;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.popular-badge {
  background: #ff4757;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
