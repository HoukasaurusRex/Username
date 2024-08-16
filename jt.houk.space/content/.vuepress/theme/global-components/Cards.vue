<template>
  <main class="cards">
    <slot name="top"/>
    <div v-for="(page, index) in pages">
      <Card
        :name="page.title"
        :url="page.path"
        :imageUrl="page.frontmatter.screenshots[0].url"
      />
    </div>
  </main>
</template>

<script>
import Card from '@theme/components/Card.vue'

export default {
  name: 'Cards',
  components: { Card },
  computed: {
    pages() {
      return this.$site.pages
        .filter(page => page.path.includes(this.$page.path))
        .filter(page => page.title)
        .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    }
  }
}
</script>

<style lang="scss" scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-auto-rows: auto;
  grid-gap: 2rem;
}
</style>