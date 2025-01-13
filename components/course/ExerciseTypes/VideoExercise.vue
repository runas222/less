<template>
  <div class="video-exercise">
    <h2 class="title">{{ exercise.title }}</h2>
    
    <div class="video-container">
      <iframe
        :src="videoEmbedUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    
    <div v-if="exercise.transcript" class="transcript">
      <h3>Транскрипт:</h3>
      <p>{{ exercise.transcript }}</p>
    </div>
    
    <div v-if="exercise.keyMoments?.length" class="key-moments">
      <h3>Ключевые моменты:</h3>
      <ul>
        <li
          v-for="(moment, index) in exercise.keyMoments"
          :key="index"
          class="moment"
        >
          <button @click="seekTo(moment.time)">
            {{ moment.title }} ({{ formatTime(moment.time) }})
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Exercise } from '~/types/exercises'

const props = defineProps<{
  exercise: Exercise & { type: 'video' }
}>()

const videoEmbedUrl = computed(() => {
  const url = new URL(props.exercise.videoUrl)
  url.searchParams.set('autoplay', '0')
  url.searchParams.set('rel', '0')
  return url.toString()
})

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

function seekTo(time: number) {
  const iframe = document.querySelector('iframe')
  if (iframe) {
    iframe.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'seekTo',
        args: [time, true]
      }),
      '*'
    )
  }
}
</script>

<style scoped>
.video-exercise {
  margin-top: 20px;
  max-width: 800px;
}

.title {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  margin-bottom: 2rem;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.transcript {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.transcript h3 {
  margin-bottom: 1rem;
  color: #34495e;
}

.transcript p {
  white-space: pre-wrap;
  line-height: 1.6;
}

.key-moments {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.key-moments h3 {
  margin-bottom: 1rem;
  color: #34495e;
}

.moment {
  margin-bottom: 0.8rem;
}

.moment button {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  padding: 0;
  text-align: left;
}

.moment button:hover {
  text-decoration: underline;
}
</style>
