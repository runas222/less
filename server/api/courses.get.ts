import { courses } from '../data/courses'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const popularOnly = query.popular === 'true'
    
    const filteredCourses = courses
      .filter(course => !popularOnly || course.isPopular)
      .map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        image: course.image,
        lessonsCount: course.lessonsCount,
        isPopular: course.isPopular
      }))

    console.log('Filtered courses:', filteredCourses)
    console.log('Query params:', query)

    return filteredCourses
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении списка курсов'
    })
  }
})
