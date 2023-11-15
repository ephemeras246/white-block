<template>
  <div :class="propsClasses" :style="{ gap: `${gapValue}px` }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Props } from './api'

defineOptions({ name: 'WbSpace' })
const props = defineProps(Props)

const propsClasses = computed(() => {
  const result = ['wb-space']
  if (props.vertical) {
    result.push('wb-space--vertical')
  }
  if (props.align) {
    result.push(`wb-space--${props.align}`)
  }
  return result.join(' ')
})

const gapValue = computed(() => {
  let result = 0
  if (typeof props.gap === 'number') {
    result = props.gap
    return result
  }
  const defaultGaps = {
    small: 4,
    medium: 8,
    large: 16
  }
  result = defaultGaps[props.gap] || 8

  return result
})
</script>

<style>
.wb-space {
  @apply flex;
}
.wb-space--vertical {
  @apply flex-col;
}
.wb-space--start {
  @apply items-start;
}
.wb-space--center {
  @apply items-center;
}
.wb-space--end {
  @apply items-end;
}
</style>
