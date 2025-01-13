<template>
  <div class="dashboard-page">
    <div class="courses-header">
      <h1 class="courses-title">Доступные курсы</h1>
      <div class="courses-stats">
        <div class="stat-card">
          <div class="stat-value">12</div>
          <div class="stat-label">Активных курсов</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">85%</div>
          <div class="stat-label">Завершено</div>
        </div>
      </div>
    </div>

    <div v-if="pending" class="loading">Загрузка курсов...</div>
    <div v-else-if="error" class="error">Ошибка при загрузке курсов</div>
    <div v-else class="courses-grid">
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: courses, pending, error } = await useFetch('/api/courses')
</script>

<style scoped>
.dashboard-page {
  background: #f8fafc;
  min-height: 100vh;
  padding: 2rem;
}

.courses-header {
  max-width: 1200px;
  margin: 0 auto 2rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.courses-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.courses-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: #f1f5f9;
  padding: 1.5rem;
  border-radius: 1rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #64748b;
  font-size: 0.9rem;
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

.courses-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 1rem;
  }
  
  .courses-header {
    padding: 1.5rem;
  }
  
  .courses-title {
    font-size: 1.5rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
}
</style>
