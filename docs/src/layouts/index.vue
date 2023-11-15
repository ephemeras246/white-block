<template>
  <ClientOnly>
    <Suspense>
      <div class="wb-layout" w="full" h="screen" bg="$wb-c-bg">
        <NotFound v-if="pageData.isNotFound" />
        <div
          v-else-if="frontmatter.page === 'Home'"
          bg="[url(/img/bg_hero.jpg)] dark:[url(/img/bg_hero_dark.jpg)] no-repeat cover"
        >
          <VPNav />
          <HomePage />
        </div>
        <DocPage v-else />
      </div>
    </Suspense>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { watchEffect } from 'vue'
import NotFound from 'vitepress/dist/client/theme-default/NotFound.vue'
import VPNav from 'vitepress/dist/client/theme-default/components/VPNav.vue'
import DocPage from './pages/Document.vue'
import HomePage from './pages/Home.vue'

defineOptions({ name: 'WbLayout', inheritAttrs: false })

const { page: pageData, frontmatter, isDark } = useData()

if (!import.meta.env.SSR) {
  watchEffect(() => {
    document.documentElement.setAttribute(
      'theme-mode',
      isDark.value ? 'dark' : 'light'
    )
  })
}
</script>
