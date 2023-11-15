<template>
  <div
    sticky
    top="0"
    z="10"
    class="WBSidebar temp-panel"
    w="$wb-w-sidebar"
    :h="focus ? 'screen' : '[calc(100vh-var(--wb-h-nav))]'"
    flex="none"
    display="none lg:block"
  >
    <t-menu
      v-model="currentActiveRoute"
      :default-expanded="allGroupKey"
      height="100%"
      @change="handleRouteChange"
    >
      <template v-for="item in data" :key="item.text">
        <t-submenu v-if="item.items" :title="item.text" :value="item.text">
          <t-menu-item
            v-for="sub in item.items"
            :key="sub.link"
            :value="withBase(sub.link)"
          >
            {{ sub.text }}
          </t-menu-item>
        </t-submenu>
        <t-menu-item v-else :value="withBase(item.link)">
          {{ item.text }}
        </t-menu-item>
      </template>
    </t-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter, withBase } from 'vitepress'
import type { PropType } from 'vue'

defineOptions({ name: 'WBSidebar' })
const props = defineProps({
  focus: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array as PropType<any>,
    default: () => []
  }
})

const { go } = useRouter()
function handleRouteChange(link: any) {
  go(link)
}

const route = useRoute()
const currentActiveRoute = ref<string>(route.path.replace('.html', ''))

watch(
  () => route.path,
  () => {
    currentActiveRoute.value = route.path
  },
  { immediate: true }
)

const allGroupKey = props.data
  .map(item => (item.items ? item.text : null))
  .filter(i => i)
</script>
