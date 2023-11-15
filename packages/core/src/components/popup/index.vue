<template>
  <div class="wb-popup">
    <div ref="TriggerRef">
      <slot />
    </div>
    <teleport :to="props.attach">
      <div style="position: absolute; top: 0px; left: 0px; width: 100%">
        <div
          v-show="showTooltip"
          ref="PopperRef"
          p="x-2 y-1"
          bg="#fff"
          shadow="md"
          rounded="1"
        >
          <slot name="content" />
          <!-- My tooltip -->
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import { Props, Emits } from './api'
import { on, off } from '../../utils'

defineOptions({ name: 'WbPopup' })
const props = defineProps(Props)
defineEmits<Emits>()

const TriggerRef = ref()
const PopperRef = ref()
let popper: any = null
const showTooltip = ref(false)

function eventHandler(elm: Element) {
  const offs: Array<() => void> = []
  return {
    add(type: string, listener: any) {
      if (!type) return
      on(elm, type, listener)
      offs.push(() => {
        off(elm, type, listener)
      })
    },
    clean() {
      offs.forEach(handler => handler?.())
      offs.length = 0
    }
  }
}
function show() {
  showTooltip.value = true
  popper.update()
}
function hide() {
  showTooltip.value = false
  popper.update()
}

const TRIGGER_SHOW: any = {
  hover: 'mouseenter',
  focus: 'focusin',
  contextmenu: 'contextmenu',
  click: 'click'
}
const TRIGGER_HIDE: any = {
  hover: 'mouseleave',
  focus: 'focusout'
}

onMounted(() => {
  popper = createPopper(TriggerRef.value, PopperRef.value, {
    placement: props.placement as any,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: () => [0, 4]
        }
      }
    ]
  })
  const triggerHandler = eventHandler(TriggerRef.value)
  triggerHandler.clean()
  // PopperRef.value?.addEventListener('mouseenter', () => {
  //   showTooltip.value = true
  //   popper.update()
  // })
  // PopperRef.value?.addEventListener('mouseleave', () => {
  //   showTooltip.value = false
  //   popper.update()
  // })
  triggerHandler.add(TRIGGER_SHOW[props.trigger], (ev: MouseEvent) => {
    // if (props.disabled) return
    if (ev.type === 'contextmenu') {
      ev.preventDefault()
    }
    if (
      (ev.type === 'click' || ev.type === 'contextmenu') &&
      showTooltip.value
    ) {
      hide()
      return
    }
    show()
  })
  triggerHandler.add(TRIGGER_HIDE[props.trigger], () => {
    hide()
  })
})

function onDocumentMouseDown(ev: MouseEvent) {
  if (PopperRef.value.contains(ev.target as Node)) {
    return
  }
  if (TriggerRef.value.contains(ev.target as Node)) {
    return
  }
  hide()
}

watch(
  () => showTooltip.value,
  (visible: boolean) => {
    if (visible) {
      on(document, 'mousedown', onDocumentMouseDown)
      return
    }
    off(document, 'mousedown', onDocumentMouseDown)
  }
)
</script>

<style></style>
