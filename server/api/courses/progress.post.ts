import { getRouterParam } from 'h3'
import type { ExerciseProgress } from '~/types/exercises'

export default defineEventHandler(async (event) => {
  const courseId = getRouterParam(event, 'courseId')
  const lessonId = getRouterParam(event, 'lessonId')
  
  const body = await readBody<ExerciseProgress>(event)
  
  // TODO: Реализовать логику сохранения прогресса
  
  return {
    success: true,
    data: body
  }
})
