<script>
import Tabbed from '@/components/Tabbed';
import Tab from '@/components/Tabbed/Tab';

export default {
  name: 'Detail',

  components: {
    Tab,
    Tabbed
  },

  props: {
    mode: {
      type:     String,
      required: true,
    },
    value: {
      type:     Object,
      required: true,
    }
  },

  data() {
    return {};
  },

  computed: {
    username() {
      return this.value.username;
    },
  }
};
</script>

<template>
  <Tabbed v-bind="$attrs" class="mt-15" :side-tabs="true">
    <Tab name="basics" :label="t('harvester.vmPage.detail.tabs.basics')" class="bordered-table">
      <div class="row mb-15">
        <div class="col span-4">
          <div class="labeled-input view">
            <label>
              {{ t('harvester.userPage.username') }}
            </label>
            <div>
              {{ username }}
            </div>
          </div>
        </div>
      </div>
    </Tab>
  </Tabbed>
</template>

<style lang="scss">

</style>
