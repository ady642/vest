<template>
  <MpInCard :class="$attrs.class">
    <slot />
  </MpInCard>
</template>

<script>
export default {
  name: 'NattoCard'
}
</script>
