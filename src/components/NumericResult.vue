<template>
<div>
  <h3>
    {{ n }}
  </h3>
  {{ label }}
</div>
</template>

<script>
export default {
  name: "NumericResult",
  props: {
    n: Number,
    label: String
  }
}
</script>

<style scoped>

</style>