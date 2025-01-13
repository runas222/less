<template>
  <div class="profile">
    <h1 class="title">Мой профиль</h1>
    
    <div class="profile-card">
      <div class="avatar-section">
        <img 
          :src="user.avatar || 'https://via.placeholder.com/150'" 
          alt="Аватар"
          class="avatar"
        >
        <button 
          class="upload-btn"
          @click="uploadAvatar"
        >
          Изменить фото
        </button>
      </div>

      <div class="info-section">
        <div class="info-row">
          <span class="label">Имя:</span>
          <input
            v-if="isEditing"
            v-model="editableName"
            class="edit-input"
          >
          <span v-else>{{ user.name }}</span>
        </div>

        <div class="info-row">
          <span class="label">Email:</span>
          <span>{{ user.email }}</span>
        </div>

        <div class="info-row">
          <span class="label">Дата регистрации:</span>
          <span>{{ formatDate(user.createdAt) }}</span>
        </div>

        <button
          class="edit-btn"
          @click="toggleEdit"
        >
          {{ isEditing ? 'Сохранить' : 'Редактировать профиль' }}
        </button>
      </div>
    </div>

    <div class="stats">
      <div class="stat-card">
        <span class="stat-value">{{ completedCourses.length }}</span>
        <span class="stat-label">Курсов начато</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ completedCount }}</span>
        <span class="stat-label">Курсов завершено</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ averageProgress }}%</span>
        <span class="stat-label">Средний прогресс</span>
      </div>
    </div>

    <div class="courses">
      <h2 class="courses-title">Мои курсы</h2>
      <div class="courses-grid">
        <div
          v-for="course in completedCourses"
          :key="course.id"
          class="course-card"
        >
          <NuxtLink 
            :to="`/courses/${course.id}`"
            class="course-link"
          >
            {{ course.title }}
          </NuxtLink>
          <div class="progress-bar">
            <div 
              class="progress-fill"
              :style="{ width: course.progress + '%' }"
            ></div>
          </div>
          <span class="progress-value">{{ course.progress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  name: string
  email: string
  createdAt: string
  avatar?: string
}

interface Course {
  id: number
  title: string
  progress: number
}

const user = ref<User>({
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  createdAt: '2024-01-01'
})

const completedCourses = ref<Course[]>([
  {
    id: 1,
    title: 'Основы программирования',
    progress: 75
  },
  {
    id: 2,
    title: 'Продвинутый JavaScript',
    progress: 45
  }
])

const isEditing = ref(false)
const editableName = ref(user.value.name)

const completedCount = computed(() => {
  return completedCourses.value.filter(c => c.progress === 100).length
})

const averageProgress = computed(() => {
  const total = completedCourses.value.reduce((sum, c) => sum + c.progress, 0)
  return Math.round(total / completedCourses.value.length)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU')
}

const toggleEdit = () => {
  if (isEditing.value) {
    user.value.name = editableName.value
  }
  isEditing.value = !isEditing.value
}

const uploadAvatar = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          user.value.avatar = event.target.result as string
        }
      }
      reader.readAsDataURL(file)
    }
  }
  
  input.click()
}
</script>

<style scoped>
.profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #42b983;
}

.upload-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.upload-btn:hover {
  background: #3aa876;
}

.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.label {
  font-weight: 500;
  color: #666;
  min-width: 120px;
}

.edit-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
}

.edit-btn {
  margin-top: 1rem;
  background: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
}

.edit-btn:hover {
  background: #3aa876;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.courses-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.course-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.course-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 1rem;
  display: block;
}

.course-link:hover {
  color: #42b983;
}

.progress-bar {
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #42b983;
  border-radius: 4px;
  transition: width 0.3s;
}

.progress-value {
  display: block;
  text-align: right;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
  }
  
  .avatar-section {
    align-items: flex-start;
  }
  
  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .edit-btn {
    width: 100%;
  }
}
</style>
