export interface BaseExercise {
  id: string
  type: 'reading' | 'test' | 'practice' | 'video'
  title: string
  description?: string
}

export interface ReadingExercise extends BaseExercise {
  type: 'reading'
  content: string
  keyPoints: string[]
  examples?: string[]
}

export interface TestQuestion {
  id: string
  question: string
  questionType: 'single' | 'multiple' | 'text'
  options?: string[]
  correctAnswers: number[] // Для single/multiple вопросов (обязательное поле)
  correctTextAnswer?: string // Для текстовых вопросов
  explanation: string
  points: number
  timeLimit?: number // В секундах, если есть ограничение по времени
  hint?: string
}

export interface TestExercise extends BaseExercise {
  type: 'test'
  passingScore: number // Минимальный балл для прохождения
  maxAttempts?: number // Максимальное количество попыток
  timeLimit?: number // Общее время на тест в минутах
  showResults?: 'immediate' | 'after_completion' | 'manual'
  questions: TestQuestion[]
  shuffleQuestions?: boolean
  shuffleAnswers?: boolean
  showCorrectAnswers?: boolean
  allowRetry?: boolean
}

export interface PracticeExercise extends BaseExercise {
  type: 'practice'
  task: string
  solution?: string
  hints?: string[]
}

export interface VideoExercise extends BaseExercise {
  type: 'video'
  videoUrl: string
  duration: number
  transcript?: string
  keyMoments?: Array<{
    time: number
    title: string
  }>
}

export type Exercise = ReadingExercise | TestExercise | PracticeExercise | VideoExercise

export interface ExerciseProgress {
  exerciseId: string
  courseId: string
  lessonId: string
  completed: boolean
  score?: number
  attempts?: number
  lastAttemptAt?: Date
}

export interface CourseProgress {
  completedLessons: number
  totalLessons: number
  lastAccessed?: Date
  score?: number
}

export interface CourseCategory {
  id: string
  name: string
  icon?: string
  color?: string
}

export interface CourseTag {
  id: string
  name: string
}

export interface CourseLevel {
  id: string
  name: 'Начинающий' | 'Средний' | 'Продвинутый'
  description?: string
}

export interface Lesson {
  id: number
  title: string
  content: string
  exercises?: Exercise[]
}

export interface Course {
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
  category?: CourseCategory
  tags?: CourseTag[]
  level?: CourseLevel
  requirements?: string[]
  duration?: number // in minutes
  createdAt?: Date
  updatedAt?: Date
  author?: {
    name: string
    avatar?: string
    bio?: string
  }
  progress?: CourseProgress
}
