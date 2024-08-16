<template>
  <Disqus :shortname="shortname" :identifier="identifier" :url="url" :language="language" :title="title" />
</template>

<script>

export default {
  name: 'Comments',
  computed: {
    identifier() {
      return this.$page.key
    },
    url() {
      return `https://${this.$themeConfig.domain}${this.$page.path}`
    },
    language() {
      return this.$lang
    },
    title() {
      return this.$page.title
    },
    shortname() {
      return 'houk'
    }
  }
}
</script>

<style lang="stylus">

</style>