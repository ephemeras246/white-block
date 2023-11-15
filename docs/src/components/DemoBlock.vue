<template>
  <div
    w="full"
    m="y-4"
    bg="$wb-c-bg-demo-content"
    flex-col
    border="px solid $wb-c-border-code"
    rounded="1"
    overflow="hidden"
  >
    <div w="full" min-h="50" p="x-10 t-10" flex="1" flex-center>
      <component :is="DemoComponent" v-if="DemoComponent" />
    </div>
    <div
      w="full"
      h="12"
      p="2"
      flex-row
      justify="end"
      gap="1"
      @click.stop="
        clickDelegate($event, 'operation-item', handleCodeOperations)
      "
    >
      <div
        v-for="item in CODE_BLOCK_OPERATIONS"
        :key="item.name"
        :data-value="item.name"
        class="operation-item"
        flex="inline"
        w="8"
        h="8"
        p="2"
        bg="hover:$wb-c-bg-copy-code-hover"
        rounded="1"
        select="none"
        transition="all duration-100 ease"
        cursor="pointer"
      >
        <i :class="item.icon" />
      </div>
    </div>
    <div
      w="full"
      :max-h="showCode ? '140' : '0'"
      bg="$wb-c-bg-demo-code"
      :border="`${showCode ? '0 t-px' : '0'} solid $wb-c-border`"
      overflow="y-auto"
      transition="all duration-300 ease-in-out"
      class="scrollable"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div p="x-6" v-html="compCode"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getHighlighter } from 'shikiji'
import { clickDelegate, copyToClipboard } from '@/utils'

defineOptions({ name: 'DemoBlock', inheritAttrs: false })

const props = defineProps({
  description: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    required: true
  },
  source: {
    type: String,
    default: ''
  }
})

// @ts-ignore
const components: Record<string, any> = import.meta.glob(
  '../../../packages/core/src/components/**/*.vue'
)
const DemoComponent =
  (await components[`../../../packages/core/src/components/${props.path}`]?.())
    ?.default ?? null
const shiki = await getHighlighter({
  themes: ['material-theme-palenight'],
  langs: ['vue']
})
const compCode = shiki.codeToHtml(decodeURIComponent(props.source), {
  lang: 'vue',
  theme: 'material-theme-palenight'
})

const showCode = ref(false)

const CODE_BLOCK_OPERATIONS = [
  { name: 'stackblitz', icon: 'i-simple-icons:stackblitz' },
  { name: 'copy', icon: 'i-mdi:content-copy' },
  { name: 'code', icon: 'i-ion:code-slash' }
]
function handleCodeOperations(dataset: Record<string, string>) {
  const { value } = dataset
  switch (value) {
    case 'code':
      showCode.value = !showCode.value
      break
    case 'copy':
      copyToClipboard(decodeURIComponent(props.source))
      break
  }
}
</script>
