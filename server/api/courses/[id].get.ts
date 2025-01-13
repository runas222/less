import { courses } from '../../data/courses'
import type { Course } from '../../data/courses'

export default defineEventHandler(async (event) => {
  try {
    const courseId = event.context.params?.id
    
    if (!courseId || isNaN(Number(courseId))) {
      throw createError({
        statusCode: 400,
        message: 'Некорректный ID курса'
      })
    }

    const course = courses.find((c: Course) => c.id === Number(courseId))
    
    if (!course) {
      throw createError({
        statusCode: 404,
        message: 'Курс не найден'
      })
    }

    return course
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        message: `Ошибка при получении курса: ${error.message}`
      })
    }
    throw createError({
      statusCode: 500,
      message: 'Неизвестная ошибка при получении курса'
    })
  }
})
