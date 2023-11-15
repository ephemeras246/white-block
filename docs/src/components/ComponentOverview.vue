<template>
  <div class="component-overview" w="full" flex="col" gap="3">
    <template v-for="item in componentData" :key="item.title">
      <div v-if="item.children.length" w="full">
        <div flex-row>
          <h3 :id="item.title">{{ item.title }}</h3>
        </div>
        <div m="t-4" flex="row wrap" items="center" gap="4">
          <a v-for="sub in item.children" :key="sub.name" :href="sub.link">
            <div
              w="54"
              h="61.5"
              p="3"
              bg="$wb-c-bg-card"
              rounded="1.5"
              text="sm $wb-c-text-secondly hover:$wb-c-text-main"
            >
              <div
                w="full"
                h="full"
                p="4"
                bg="$wb-c-bg"
                rounded="1.5"
                flex-col
                items="start"
                shadow="hover:lg"
                cursor="pointer"
                transform="hover:translate-y-[-1px]"
                transition="all duration-300 ease-in-out"
              >
                <div w="40" h="40" m="b-2" rounded="1.5">
                  <img :src="withBase(sub.image)" />
                </div>
                <div>
                  {{ sub.text }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

defineOptions({ name: 'WBComponentOverview' })

function generateComponentData() {
  const category = [
    {
      title: '基础',
      components: ['button', 'popup']
    },
    {
      title: '布局',
      components: ['space']
    }
  ]
  // TODO: 改为扫描 core/src 目录生成
  const components = [
    {
      name: 'button',
      text: 'Button 按钮',
      link: withBase('/components/button'),
      image: '/img/components/button.png'
    },
    {
      name: 'space',
      text: 'Space 间距',
      link: withBase('/components/space'),
      image: '/img/components/space.png'
    },
    {
      name: 'popup',
      text: 'popup 弹出层',
      link: withBase('/components/popup'),
      image: '/img/components/popup.png'
    }
  ]
  const result: any = []
  for (const cate of category) {
    const list: any = []
    cate.components?.forEach(comp => {
      const data = components.find(item => item.name === comp)
      if (data) {
        list.push(data)
      }
    })
    result.push({
      title: cate.title,
      children: list
    })
  }

  return result
}
const componentData = generateComponentData()
</script>
