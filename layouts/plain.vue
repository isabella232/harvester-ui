<script>
import PureHeader from '@/components/nav/PureHeader';
import Footer from '@/components/nav/Footer';

export default {

  components: {
    PureHeader,
    Footer,
  },

  middleware: ['authenticated'],

  head() {
    const theme = this.$store.getters['prefs/theme'];

    return {
      bodyAttrs: { class: `theme-${ theme } overflow-hidden dashboard-body` },
      title:     this.$store.getters['i18n/t']('nav.title'),
    };
  },

};
</script>

<template>
  <div class="dashboard-root">
    <PureHeader />

    <main>
      <nuxt class="outlet" />
      <Footer />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .dashboard-root {
    display: grid;
    height: 100vh;

    grid-template-areas:
      "header"
      "main";

    grid-template-columns: auto;
    grid-template-rows:    var(--header-height) auto;

    > HEADER {
      grid-area: header;
    }
  }

  MAIN {
    grid-area: main;
    overflow: auto;

    .outlet {
      padding: 20px 20px 70px 20px;
      min-height: 100%;
      margin-bottom: calc(-1 * var(--footer-height) - 1px);
    }

    FOOTER {
      background-color: var(--nav-bg);
      height: var(--footer-height);
    }
  }
</style>
