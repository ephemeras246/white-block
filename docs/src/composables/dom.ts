import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getElementBySelector } from '../utils'

export function useIntersectionObserver(
  container: string | HTMLElement,
  target: string | HTMLElement
) {
  const visible = ref(false)
  // eslint-disable-next-line no-unused-vars,no-shadow
  let handler = (visible: boolean) => {}
  // eslint-disable-next-line no-unused-vars,no-shadow
  function onChange(handlerFn: (visible: boolean) => void) {
    handler = handlerFn
  }

  let observer: IntersectionObserver | null
  onMounted(() => {
    if (!import.meta.env.SSR) {
      const containerDOM = getElementBySelector(container)
      const targetDOM = getElementBySelector(target)

      observer = new IntersectionObserver(
        records => {
          visible.value = !records[0].isIntersecting
          handler(visible.value)
        },
        { threshold: [0], root: containerDOM }
      )
      observer.observe(targetDOM as HTMLElement)
    }
  })

  onBeforeUnmount(() => {
    observer = null
  })

  return { visible, onChange }
}
