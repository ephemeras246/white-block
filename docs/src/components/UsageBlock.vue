<template>
  <div
    w="full"
    m="y-4"
    bg="$wb-c-bg-content"
    border="px solid $wb-c-border"
    rounded="1"
    overflow="hidden"
  >
    <div
      w="full"
      h="12"
      bg="$wb-c-bg-card"
      border="0 b-px solid $wb-c-border"
      flex-row
    >
      <div flex="1" h="full" p="x-4" flex-row>{{ component }}</div>
      <div w="60" h="full" border="0 l-px solid $wb-c-border" p="x-4" flex-row>
        Options
      </div>
    </div>
    <div w="full" h="80" bg="$wb-c-bg-demo-content" flex-row>
      <div flex="1" h="full" flex-center>
        <component
          :is="UsageComponent"
          v-bind="{ ...propsData, ...changedProps }"
          v-if="UsageComponent"
        />
      </div>
      <div w="60" h="full" border="0 l-px solid $wb-c-border" overflow-y="auto">
        <div p="3" m="b-3" border="0 b-px solid $wb-c-border">
          <div
            v-for="item in propsOptions.toggle"
            :key="item.name"
            h="10"
            flex
            justify="between"
            items="center"
          >
            {{ item.name }}
            <t-switch
              :default-value="item.value"
              size="small"
              @change="(e: any) => changeProps(item.name, e)"
            />
          </div>
        </div>
        <div p="3">
          <div
            v-for="item in propsOptions.select"
            :key="item.name"
            h="10"
            flex
            justify="between"
            items="center"
          >
            {{ item.name }}
            <t-select
              size="small"
              w="30"
              :options="item.options.map((i: string) => ({ label: i, value: i}))"
              :default-value="item.value"
              @change="(e: any) => changeProps(item.name, e)"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      w="full"
      h="12"
      p="2"
      border="0 t-px solid $wb-c-border"
      bg="$wb-c-bg-demo-content"
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
      overflow="y-auto"
      bg="$wb-c-bg-demo-code"
      transition="all duration-300 ease-in-out"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div p="x-6" v-html="compCode"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { getHighlighter } from 'shikiji'
import { clickDelegate, copyToClipboard } from '@/utils'

defineOptions({ name: 'UsageBlock', inheritAttrs: false })

const props = defineProps({
  component: {
    type: String,
    required: true
  },
  options: {
    type: String,
    default: '{"toggle": [], "select": []}'
  },
  data: {
    type: String,
    default: '{}'
  }
})

const propsOptions = JSON.parse(decodeURIComponent(props.options))
const propsData = JSON.parse(decodeURIComponent(props.data))

// @ts-ignore
const components: Record<string, any> = import.meta.glob(
  '../../../packages/core/src/components/**/*.vue'
)
const UsageComponent =
  (
    await components[
      `../../../packages/core/src/components/${props.component}/index.vue`
    ]?.()
  )?.default ?? null

const componentAttrs = ref('')
function changeCode(data: Record<string, any>) {
  const result: string[] = []
  for (const key in data) {
    if (typeof data[key] === 'boolean') {
      if (data[key]) {
        result.push(key)
      }
    } else if (typeof data[key] === 'string') {
      // eslint-disable-next-line no-continue
      if (propsData[key] && propsData[key] === data[key]) continue
      result.push(`${key}="${data[key]}"`)
    } else {
      result.push(`:${key}="${data[key]}"`)
    }
  }
  componentAttrs.value = result.join(' ')
}

const changedProps: any = ref({})
function changeProps(prop: string, value: any) {
  changedProps.value[prop] = value

  changeCode(changedProps.value)
}

const shiki = await getHighlighter({
  themes: ['material-theme-palenight', 'material-theme'],
  langs: ['vue']
})

const compCode = computed(() =>
  shiki.codeToHtml(
    `<template>
  <wb-${props.component} ${componentAttrs.value} />
</template>`,
    {
      lang: 'vue',
      theme: 'material-theme'
    }
  )
)

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
      // TODO: 复制提示
      if (!import.meta.env.SSR) {
        copyToClipboard(`<template>
  <wb-${props.component} ${componentAttrs.value} />
</template>`)
      }
      break
  }
}
</script>
