<template>
  <q-layout view="hHh lpR fFf">
    <!-- <HeaderIQ /> -->

    <div>
      <q-page-container>
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>
<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
// import HeaderIQ from 'src/components/Header.vue';

export default defineComponent({
  name: 'MeetUsLayout',
  // components: {
  //   HeaderIQ,
  // },
  setup() {
    const router = useRouter();
    return {
      goToHome: () => {
        router.push({ name: 'home' });
      },
    };
  },
});
</script>

<style lang="scss">
@import '../css/meetus.scss';
</style>
