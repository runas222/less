<template>
  <div class="dashboard-page">
    <div class="dashboard-grid">
      <!-- Welcome Section -->
      <div class="welcome-card">
        <h1 class="welcome-title">
          <PresentationChartLineIcon class="welcome-icon" />
          Добро пожаловать в ваш учебный портал
        </h1>
        <p class="welcome-subtitle">
          Ваш прогресс: 45% завершено
        </p>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <NuxtLink to="/courses" class="action-card">
          <div class="action-icon">
            <AcademicCapIcon class="h-8 w-8" />
          </div>
          <div class="action-content">
            <h3 class="action-title">Продолжить обучение</h3>
            <p class="action-text">Вернитесь к последнему курсу</p>
          </div>
        </NuxtLink>
        
        <div class="action-card">
          <div class="action-icon">
            <ChartBarIcon class="h-8 w-8" />
          </div>
          <div class="action-content">
            <h3 class="action-title">Ваша статистика</h3>
            <p class="action-text">Просмотрите ваш прогресс</p>
          </div>
        </div>
      </div>

      <!-- Ongoing Courses -->
      <div class="courses-section">
        <h2 class="section-title">Активные курсы</h2>
        <div class="courses-grid">
          <CourseCard :course="{
            id: 1,
            title: 'Основы продаж',
            description: '5 из 8 уроков завершено',
            image: '/images/course1.jpg',
            lessonsCount: 8,
            progress: 65,
            category: 'Продажи',
            isPopular: true,
            rating: {
              value: 4.7,
              count: 120
            }
          }" />
          
          <CourseCard :course="{
            id: 2,
            title: 'Продвинутые техники',
            description: '2 из 10 уроков завершено',
            image: '/images/course2.jpg',
            lessonsCount: 10,
            progress: 30,
            category: 'Продажи',
            isPopular: false,
            rating: {
              value: 4.2,
              count: 85
            }
          }" />
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="stats-section">
        <h2 class="section-title">Ваша активность</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <ClockIcon class="h-8 w-8" />
            </div>
            <div class="stat-content">
              <h3 class="stat-title">12 часов</h3>
              <p class="stat-text">Общее время обучения</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <CheckCircleIcon class="h-8 w-8" />
            </div>
            <div class="stat-content">
              <h3 class="stat-title">23 урока</h3>
              <p class="stat-text">Завершено</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <TrophyIcon class="h-8 w-8" />
            </div>
            <div class="stat-content">
              <h3 class="stat-title">3 курса</h3>
              <p class="stat-text">В процессе</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  PresentationChartLineIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  TrophyIcon
} from '@heroicons/vue/24/outline'
import CourseCard from '~/components/course/CourseCard.vue'
</script>

<style scoped>
.dashboard-page {
  background: #f8fafc;
  color: #0a0a0a;
  min-height: 100vh;
  padding: 2rem;
}

.dashboard-grid {
  display: grid;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.welcome-title {
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.welcome-icon {
  width: 2rem;
  height: 2rem;
  color: #3b82f6;
}

.welcome-subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.action-card:hover {
  transform: translateY(-2px);
}

.action-icon {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 0.75rem;
  color: #3b82f6;
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.action-text {
  color: #64748b;
  font-size: 0.95rem;
}

.courses-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.stats-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 1rem;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 0.75rem;
  color: #3b82f6;
}

.stat-title {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.stat-text {
  color: #64748b;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 1rem;
  }
  
  .welcome-title {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
}
</style>
