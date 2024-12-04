<template>
  <component :is="$route.meta.layoutComponent">
    <RouterView />
  </component>
</template>
