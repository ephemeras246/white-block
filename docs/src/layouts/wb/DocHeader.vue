<template>
  <div relative w="full" p="r-66" h="62">
    <div
      h="full"
      max-w="$wb-w-content"
      p="x-4 md:x-14 y-12"
      m="x-auto"
      :opacity="focus ? '0' : '100'"
      transition="all duration-300"
      select="none"
    >
      <h1 m="t-17" font="!extrabold" text="!12">
        {{ data.title }}
      </h1>
      <br />
      <div text="sm $wb-c-text-secondly">{{ data.description }}</div>
    </div>
    <div
      :position="focus ? 'fixed' : 'absolute'"
      z="10"
      :top="focus ? '0' : '40'"
      :w="focus ? 'lg:[calc(100%-var(--wb-w-sidebar)-1rem)]' : 'full'"
      h="22"
      p="r-66"
      :bg="focus ? '$wb-c-bg-layer' : 'none'"
      border="0 b-px solid $wb-c-border"
      :backdrop="focus ? 'blur-md' : 'none'"
      flex-col
    >
      <div
        w="$wb-w-content"
        :p="
          focus && !frontmatter.component
            ? 'x-4 md:x-14 b-0'
            : 'x-4 md:x-14 b-4'
        "
        h="full"
        flex-row
      >
        <div
          text="6"
          font="bold"
          :opacity="focus ? '100' : '0'"
          transition="all duration-300"
          select="none"
        >
          {{ data.title }}
        </div>
        <div v-if="frontmatter.component" absolute z="12" bottom="-6" w="full">
          <div
            w="42"
            h="12"
            rounded="1.5"
            p="x-1"
            bg="gray-100 dark:slate-700"
            border="px solid $wb-c-border"
            flex-center
          >
            <t-radio-group
              default-value="demo"
              theme="dark"
              size="large"
              variant="default-filled"
              @change="(val: any) => emits('tab', val)"
            >
              <t-radio-button value="demo">示例</t-radio-button>
              <t-radio-button value="api">API</t-radio-button>
            </t-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div id="WBDocHeader" absolute bottom="11" w="full" h="0" />
    <div
      v-if="data.decoration"
      absolute
      top="16"
      right="32"
      z="10"
      h="42"
      transform="hover:scale-110"
      transition="transform duration-300 ease-in-out"
    >
      <img h="full" opacity-60 :src="data.decoration" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import type { PropType } from 'vue'

export interface DCHeaderData {
  title: string
  description: string
  decoration: string
}

defineOptions({ name: 'WBDocHeader' })
defineProps({
  focus: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object as PropType<DCHeaderData>,
    default: () => ({
      title: '标题',
      description: '描述',
      decoration: '/img/components/button.png'
    })
  }
})
const emits = defineEmits<{
  tab: [tab: string]
}>()

const { frontmatter }: any = useData()
</script>
