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

export interface TestExercise extends BaseExercise {
  type: 'test'
  questions: Array<{
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }>
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
  category?: string
}
