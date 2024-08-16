<template>
  <router-link class="card" :to="url" >
    <section>
      <header><h2 class="card__title">{{name}}</h2></header>
      <div class="card__content" :style="backgroundImageStyle"></div>
    </section>
  </router-link>
</template>
<script>
export default {
  name: 'Card',
  props: {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      default: 'https://jt.houk.space/logo.png'
    }
  },
  computed: {
    backgroundImageStyle() {
      return `background-image: url(${this.imageUrl});`
    }
  },
}
</script>
<style lang="scss" scoped>

.card {
  .card__title {
    color: var(--text-color);
    transition: all 0.1s ease-in-out;
  }
  .card__content {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top, center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    height: 12rem;
    max-width: 90vw;
    text-align: center;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.15);
    transition: all 0.1s ease-in-out;
  }
  &:hover {
    .card__title {
      color: var(--accent-color);
    }
    .card__content {
      transform: scale(1.01);
      box-shadow: 3px 3px 5px rgba(0,0,0,0.15);
    }
  }
}

</style>