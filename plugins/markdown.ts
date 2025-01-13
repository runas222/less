import { marked } from 'marked'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      markdown: (content: string) => marked.parse(content)
    }
  }
})
