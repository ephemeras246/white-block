<template>
  <div w="full" h="[calc(100vh-4rem)]" overflow="hidden">
    <div max-w="5xl" m="x-auto" p="t-40" flex-col>
      <h1
        w="180"
        text="6xl $wb-c-text-main center"
        font="extrabold tracking-tight leading-tight"
      >
        More user friendly components for Vue
      </h1>
      <div m="t-10" flex-col gap="y-4">
        <p text="$wb-c-text-secondly">
          Inspired by
          <a
            color="$wb-c-brand"
            font="bold"
            class="hover:underline"
            href="https://tdesign.tencent.com/vue-next/overview"
          >
            TDesign
          </a>
          &
          <a
            color="$wb-c-brand"
            font="bold"
            class="hover:underline"
            href="https://tailwindcss.com/"
          >
            tailwindcss
          </a>
        </p>
        <p text="$wb-c-text-secondly">
          Implement with
          <a
            color="$wb-c-brand"
            font="bold"
            class="hover:underline"
            href="https://vitejs.dev/"
          >
            vite
          </a>
          &
          <a
            color="$wb-c-brand"
            font="bold"
            class="hover:underline"
            href="https://unocss.dev/"
          >
            unocss
          </a>
        </p>
        <p text="$wb-c-text-secondly">
          Provide
          <span color="$wb-c-text-anti" font="bold">
            efficient documentation
          </span>
          &
          <span color="$wb-c-text-anti" font="bold">
            better development experience
          </span>
        </p>
      </div>
      <div m="t-24" text="white md">
        <a
          p="x-4 l-5 y-2.5"
          rounded="full"
          bg="slate-900 hover:slate-700 dark:$wb-c-brand-2 dark:hover:$wb-c-brand"
          transition="all duration-300 ease-in-out"
          flex-center
          :href="withBase('/guide/')"
        >
          Getting started
          <i m="l-2" text="lg" class="i-mdi:arrow-right" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

defineOptions({ name: 'LayoutHome', inheritAttrs: false })
</script>
