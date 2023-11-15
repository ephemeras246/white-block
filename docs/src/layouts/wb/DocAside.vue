<template>
  <div
    ref="DocAsideRef"
    w="60"
    :h="focus ? '[calc(100vh-18rem)]' : '[calc(100vh-32rem)]'"
    p="r-3"
    overflow="y-auto"
    class="wb-doc-aside scrollable"
    @click="clickDelegate($event, 'anchor-link', handleSelectLink)"
  >
    <div w="full" flex-col gap="0.5" border="0 l-px solid $wb-c-border">
      <div
        v-for="{ level, link, title } in headers"
        :key="title"
        :data-link="link"
        :class="[
          'anchor-link',
          decodeURIComponent(currentActiveHash) === link ? 'active' : ''
        ]"
        w="full"
        h="6"
        text="[0.75rem]"
        truncate
        transition="color duration-300 ease"
        :style="{ paddingLeft: `${1 + (level - minLevel) * 2}em` }"
      >
        <a :href="link">{{ title }}</a>
      </div>
    </div>
    <div
      absolute
      z="10"
      top="0"
      left="0"
      w="2px"
      h="6"
      bg="$wb-brand-color"
      transition="top duration-300 ease"
      :style="{ top: `${markerTop}px` }"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, nextTick } from 'vue'
import { throttleAndDebounce } from 'vitepress/dist/client/theme-default/support/utils'
import { getHeaders, clickDelegate } from '@/utils'

defineOptions({ name: 'WBDocAside' })

defineProps({
  focus: {
    type: Boolean,
    default: false
  }
})

const DocAsideRef = ref()
const headers = shallowRef<any[]>([])
const markerTop = ref(0)
const currentActiveHash = ref('')
let container: any = null

function setActiveLinkByHash(hash: string) {
  if (hash) {
    currentActiveHash.value = hash
    const currentHash = DocAsideRef.value.querySelector(
      `a[href="${decodeURIComponent(hash)}"]`
    )
    markerTop.value = currentHash?.parentNode.offsetTop || 0
  }
}

function getAnchorTop(anchor: any) {
  return anchor.parentElement.offsetTop + 170
}

function isAnchorActive(
  scrollTop: number,
  index: number,
  anchor: any,
  nextAnchor: any
) {
  if (index === 0 && scrollTop === 0) {
    return [true, null]
  }
  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null]
  }
  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, anchor.hash]
  }
  return [false, null]
}

function setActiveLink() {
  const anchors: any[] = [].slice.call(
    document.querySelectorAll('.wb-doc-content .header-anchor')
  )
  // container = document.getElementById('WBDocument')
  const scrollTop = container?.scrollTop || 0
  const containerHeight = container?.offsetHeight || 0
  const contentHeight = container?.scrollHeight || 0
  const isBottom = Math.abs(scrollTop + containerHeight - contentHeight) < 1

  if (isBottom && anchors.length) {
    setActiveLinkByHash(anchors[anchors.length - 1].hash)
    return
  }
  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i]
    const nextAnchor = anchors[i + 1]
    const [isActive, hash] = isAnchorActive(scrollTop, i, anchor, nextAnchor)
    if (isActive) {
      setActiveLinkByHash(hash)
      return
    }
  }
}

function handleSelectLink(dataset: Record<string, string>, animate = false) {
  if (!import.meta.env.SSR) {
    const { link } = dataset
    const id = link.split('#')[1]
    const heading = document.getElementById(decodeURIComponent(id))
    if (heading) {
      container?.scrollTo({
        top:
          heading.offsetTop > 105 ? heading.offsetTop + 265 : heading.offsetTop,
        behavior: animate ? 'smooth' : 'auto'
      })
      const { hash } = window.location
      setActiveLinkByHash(hash)
    }
  }
}

const onScroll = throttleAndDebounce(setActiveLink, 100)
const minLevel = ref(6)

if (!import.meta.env.SSR) {
  onMounted(() => {
    container = document.getElementById('WBDocument')
    headers.value = getHeaders()
    let min = 6
    headers.value.forEach(item => {
      min = Math.min(item.level, min)
    })
    minLevel.value = min
    nextTick(() => {
      handleSelectLink({ link: window.location.hash }, false)
      container?.addEventListener('scroll', onScroll)
    })
  })

  onUnmounted(() => {
    container?.removeEventListener('scroll', onScroll)
  })
}

function updateContent(api: boolean = false) {
  headers.value = getHeaders(api)
  let min = 6
  headers.value.forEach(item => {
    min = Math.min(item.level, min)
  })
  minLevel.value = min
}
defineExpose({ updateContent })
</script>
