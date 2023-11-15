<template>
  <wb-space gap="large">
    <wb-popup trigger="hover">
      <wb-button type="primary">鼠标移入</wb-button>
      <template #content>
        <div color="#000">浮层内容</div>
      </template>
    </wb-popup>
    <wb-popup trigger="click">
      <wb-button type="primary">鼠标点击</wb-button>
      <template #content>
        <div color="#000">浮层内容</div>
      </template>
    </wb-popup>
  </wb-space>
</template>
