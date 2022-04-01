<template>
  <div class="hero-wrapper">
    <v-container class="hero">
      <v-row class="hero-row">
        <v-col cols="12" sm="8" md="7" lg="6" class="hero-col">
          <h1 class="hero-title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p class="hero-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nobis
            error dicta expedita nulla repellendus maiores corporis sunt
            possimus ut?
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.hero-wrapper {
  position: relative;
  padding-top: 120px;
  padding-bottom: 120px;
  margin-bottom: 100px;
  background-image: url("../assets/hero.png");
  background-size: 100% 100%;

  .hero-col {
    position: relative;
    z-index: 2;
    color: #ffffff;
  }

  .hero-title {
    margin-top: 0;
    margin-bottom: 50px;
    font-weight: 700;
    font-size: 50px;
    line-height: 54px;
    color: #ffffff;
  }
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    content: "";
    background: rgba(40, 35, 91, 0.8);
    z-index: 1;
  }

  @media screen and (max-width: 900px) {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 70%;
    }
  }
  @media screen and (max-width: 610px) {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
