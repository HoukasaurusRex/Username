<template>
  <CThemeProvider class="child-theme-post" >
    <!-- <CReset /> -->
    <Notification />
    <Post />
  </CThemeProvider>
</template>

<script>
import { CThemeProvider, CReset } from '@chakra-ui/vue'
import Post from '@parent-theme/layouts/Post.vue'
import Notification from '@theme/components/Notification.vue'

export default {
  name: 'ChakraPost',
  components: {
    CThemeProvider,
    CReset,
    Post,
    Notification
  }
}
</script>
