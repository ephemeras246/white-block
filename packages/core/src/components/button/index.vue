<template>
  <div :class="propsClasses">
    <slot v-if="$slots.prefix || loading" name="prefix">
      <i v-if="loading" class="i-mingcute:loading-fill animate-spin" />
    </slot>
    <slot v-if="(text || $slots.default) && !loading">
      {{ text }}
    </slot>
    <slot v-if="$slots.suffix" name="suffix" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Props, Emits } from './api'

defineOptions({ name: 'WbButton' })
defineEmits<Emits>()
const props = defineProps(Props)

const propsClasses = computed(() => {
  const result = ['wb-button']
  if (props.block) {
    result.push('wb-button--block')
  }
  if (props.type === 'primary') {
    result.push('wb-button--primary')
  }
  if (['circle', 'rounded'].includes(props.shape)) {
    result.push('wb-button--rounded')
  }
  if (props.size === 'small') {
    result.push('wb-button--small')
  } else if (props.size === 'large') {
    result.push('wb-button--large')
  }
  if (props.loading || props.disabled) {
    result.push('wb-button--disabled')
  }
  return result.join(' ')
})
</script>

<style>
.wb-button {
  @apply h-8.5 p-x-3 bg-$wb-comp-bg-color border-(px solid $wb-comp-bg-color) rounded-$wb-radius-default shadow-sm color-$wb-text-color-primary text-3.5 align-top flex-inline items-center justify-center cursor-pointer select-none antialiased transition-(all duration-200)
    hover:(bg-$wb-comp-bg-color-hover border-$wb-comp-bg-color-hover)
    active:(bg-$wb-comp-bg-color-actived border-$wb-comp-bg-color-actived);
}
.wb-button--primary {
  @apply bg-$wb-brand-color color-$wb-brand-color-anti border-$wb-brand-color
    hover:(bg-$wb-brand-color-hover color-$wb-brand-color-anti border-$wb-brand-color-hover)
    active:(bg-$wb-brand-color-actived border-$wb-brand-color-actived);
}
.wb-button--block {
  @apply w-full;
}
.wb-button--rounded {
  @apply rounded-full;
}
.wb-button--small {
  @apply h-7 p-x-2 text-3;
}
.wb-button--large {
  @apply h-10 p-x-4 text-4;
}
.wb-button--disabled {
  @apply bg-$wb-comp-bg-color color-$wb-text-color-disabled border-$wb-comp-bg-color cursor-not-allowed
  hover:(bg-$wb-comp-bg-color color-$wb-text-color-disabled border-$wb-comp-bg-color)
  active:(bg-$wb-comp-bg-color color-$wb-text-color-disabled border-$wb-comp-bg-color);
}
.wb-button--primary.wb-button--disabled {
  @apply bg-$wb-brand-color-disabled color-$wb-brand-color-anti border-$wb-brand-color-disabled cursor-not-allowed
  hover:(bg-$wb-brand-color-disabled color-$wb-brand-color-anti border-$wb-brand-color-disabled)
  active:(bg-$wb-brand-color-disabled color-$wb-brand-color-anti border-$wb-brand-color-disabled);
}
</style>
