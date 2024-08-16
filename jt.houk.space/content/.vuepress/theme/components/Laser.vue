<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" viewBox="0 385 1920 310" class="svg-laser">
    <g transform="matrix(0.08 -1.37 29.42 1.65 1016.9 588.76)" id="1ee6a4d9-12ea-40ba-9ab1-7118d494bbee"  >
      <polygon class="svg-laser__bottom" style="stroke: rgb(0,0,0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  points="-37.43,32.41 0,-32.41 37.43,32.41 " />
    </g>
    <g transform="matrix(0 -1.34 29.47 0 960 540)"  >
      <polygon class="svg-laser__middle" style="stroke: rgb(0,0,0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  points="-37.43,32.41 0,-32.41 37.43,32.41 " />
    </g>
    <g transform="matrix(-0.07 -1.34 29.43 -1.55 1019.76 490.75)"  >
      <polygon class="svg-laser__top" style="stroke: rgb(0,0,0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  points="-37.43,32.41 0,-32.41 37.43,32.41 " />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Laser'
}
</script>

<style lang="scss" scoped>
  
  
  .svg-laser {
    height: fit-content;
    width: 100%;
    filter: opacity(0.8) saturate(1) drop-shadow(1px 1px 1px #222);
    transition: transform 0.03s linear;
    .svg-laser__top {
      fill: var(--red);
    }
    .svg-laser__middle {
      fill: var(--green);
    }
    .svg-laser__bottom {
      fill: var(--blue);
    }
    &:hover,
    &:active {
      filter: saturate(3) drop-shadow(1px 1px 1px #222);
      transform: scaleY(1.1);
      .svg-laser__top {
        animation: animateTop 3s linear infinite;
      }
      .svg-laser__middle {
        animation: animateMiddle 3s linear infinite;
      }
      .svg-laser__bottom {
        animation: animateBottom 3s linear infinite;
      }
    }
  }

  @keyframes animateTop {
    0% { fill: var(--red); }
    25% { fill: var(--green); }
    75% { fill: var(--blue); }
    100% { fill: var(--red); }
  }
  @keyframes animateMiddle {
    0% { fill: var(--green); }
    25% { fill: var(--blue); }
    75% { fill: var(--red); }
    100% { fill: var(--green); }
  }
  @keyframes animateBottom {
    0% { fill: var(--blue); }
    25% { fill: var(--red); }
    75% { fill: var(--green); }
    100% { fill: var(--blue); }
  }
</style>