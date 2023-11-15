<template>
  <div
    id="WBDocument"
    w="full"
    h="screen"
    flex="col"
    overflow="x-hidden y-auto"
    class="scrollable-main"
  >
    <VPNav border="0 b-px solid $wb-c-border" />
    <div w="full" flex>
      <Sidebar
        :data="sidebarData"
        :focus="isFocusMode"
        border="0 r-px solid $wb-c-border"
      />
      <div class="vp-doc" w="full" flex-col>
        <DocHeader
          :focus="isFocusMode"
          :data="pageInfo"
          @tab="handleTabChange"
        />
        <div relative w="full" p="md:r-66">
          <div
            max-w="$wb-w-content"
            min-h="100vh"
            :p="frontmatter.component ? '4 md:14' : 'x-4 md:x-14'"
            m="x-auto"
            class="wb-doc-content"
          >
            <Content v-show="currentTab === 'demo'" class="doc-demo" />
            <div v-show="currentTab === 'api'" class="doc-api">
              <template v-if="page.props">
                <h3 id="Props">Props</h3>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div class="api-table" v-html="JSON.parse(page.props || '')" />
              </template>
              <template v-if="page.events">
                <h3 id="Events">Events</h3>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div class="api-table" v-html="JSON.parse(page.events || '')" />
              </template>
            </div>
          </div>
          <div
            display="none md:block"
            :position="isFocusMode ? 'fixed' : 'absolute'"
            :top="isFocusMode ? '34' : '12'"
            :right="isFocusMode ? '4' : '0'"
            w="66"
          >
            <DocAside ref="DocAsideRef" :focus="isFocusMode" />
          </div>
        </div>
        <div
          v-if="isFocusMode"
          fixed
          flex-center
          right="8"
          bottom="8"
          w="11"
          h="11"
          rounded="1"
          border="px hover:2px solid $wb-c-border hover:$wb-c-border-active"
          bg="white opacity-10"
          color="$wb-c-text-secondly hover:$wb-c-text-main"
          text="7"
          cursor="pointer"
          transition="all duration-200 ease-in-out"
          @click.stop="toDocTop"
        >
          <i class="i-tdesign:backtop" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'
import VPNav from 'vitepress/dist/client/theme-default/components/VPNav.vue'
import { useIntersectionObserver } from '@/composables'
import Sidebar from '../wb/Sidebar.vue'
import DocHeader, { DCHeaderData } from '../wb/DocHeader.vue'
import DocAside from '../wb/DocAside.vue'

defineOptions({ name: 'WBDocumentPage' })
const { visible: isFocusMode } = useIntersectionObserver(
  '#WBDocument',
  '#WBDocHeader'
)

const { page, frontmatter, theme }: any = useData()
const pageInfo = computed<DCHeaderData>(() => {
  const { title = '', description = '', decoration = '' } = frontmatter.value
  return { title, description, decoration }
})

function toDocTop() {
  if (!import.meta.env.SSR) {
    document.getElementById('WBDocument')?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const currentTab = ref('demo')
const DocAsideRef = ref()
function handleTabChange(tabValue: string = 'demo') {
  currentTab.value = tabValue
  nextTick(() => {
    DocAsideRef.value?.updateContent(currentTab.value === 'api')
  })
}

const route = useRoute()
const sidebarData: any = ref([])
watch(
  () => route.path,
  () => {
    for (const link in theme.value.sidebar) {
      if (route.path.indexOf(link) > -1) {
        sidebarData.value = theme.value.sidebar[link]
        handleTabChange()
      }
    }
  },
  { immediate: true }
)
</script>
