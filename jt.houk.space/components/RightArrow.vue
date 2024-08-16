<template>
  <router-link class="right-arrow" :to="link">{{ text }} <span class="move">→</span></router-link>
</template>

<script>
export default {
  name: 'RightArrow',
  props: {
    actionLink: {
      type: String
    },
    actionText: {
      type: String
    }
  },
  computed: {
    link() {
      return this.url || this.$frontmatter.actionLink || '/articles/'
    },
    text() {
      return this.name || this.$frontmatter.actionText || 'Articles'
    }
  }
}
</script>

<style lang="css" scoped>
.right-arrow {
  text-align: right;
  align-self: center;
  font-size: 1.5em;
  color: var(--text-color);
}

.right-arrow:hover {
  color: var(--text-color);
}

.move {
  position: absolute;
  top: 5px;
  padding-left: 12px;
  animation: move 1s ease-in-out infinite;
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>