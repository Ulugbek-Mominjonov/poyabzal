<template>
  <h2 class="section-title">{{ content }}</h2>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.section-title {
  font-weight: 700;
  font-size: 35px;
  line-height: 50px;
  color: #181818;
}
</style>
