<template>
  <HeaderIQ />
  <!-- Cards -->
  <div class="flex flex-center">
    <div class="row items-start q-gutter-xl q-py-xl">
      <q-card class="my-card round-border">
        <q-img src="~assets/sebas.png" class="cardImg img1" :ratio="0.6">
          <div class="absolute-bottom text-lg text-font-medium">
            Sebastián López
          </div>
        </q-img>

        <q-card-section class="text-font-light"
          >CEO de la empresa. Encargado de tomar las decisiones primarias de la
          empresa, contratar a personal dirigente, aceptar y realizar
          colaboraciónes y promociones. Decididor final en las propuestas para
          modificación, mejora o añadición de la empresa, tanto en productos
          como en cualidades de la misma.
        </q-card-section>
      </q-card>
      <q-card class="my-card round-border">
        <q-img src="~assets/walt3.png" class="cardImg img2" :ratio="0.6">
          <div class="absolute-bottom text-lg text-font-medium">
            Andrés Walteros
          </div>
        </q-img>

        <q-card-section class="text-font-light"
          >Director de desarrollo. Toma decisiones acerca de funciones,
          construcción y navegabilidad de la página web. Organiza el equipo para
          una evolución, progreso, avance y mejoramiento en el producto y su
          interacción con los usuarios.
        </q-card-section>
      </q-card>
      <q-card class="my-card round-border">
        <q-img src="~assets/miguel.png" class="cardImg img3" :ratio="0.6">
          <div class="absolute-bottom text-lg text-font-medium">
            Miguel Mejía
          </div>
        </q-img>

        <q-card-section class="text-font-light"
          >Director de diseño. Se encarga de aceptar y generar los diseños para
          el producto final de vistas, componentes, páginas y módulos de la
          página web. Da instrucciones a los de su campo enfocándose en
          principios como seguimiento de colores, elegancia y
          sencillez</q-card-section
        >
      </q-card>
    </div>
  </div>
  <div class="row q-mx-lg items-center">
    <q-img
      class="col-5 q-ma-lg round-border"
      src="~assets/megaiqTeam.jpeg"
      :ratio="16 / 9"
      spinner-color="primary"
      spinner-size="82px" />
    <div class="col-6 text-font-light bg-primary q-pa-lg round-border">
      Somos estudiantes del colegio San Pedro, con la técnica de programación de
      software. Nos dedicamos a esto hace ya bastantes meses y hemos aprendido
      mucho gracias a los docentes que nos han enseñado a lo largo del proceso.
      Actualmente trabajamos con la tecnología Vue Quasar 2, en la que tenemos
      ya experiencia y es un framework muy útil, pero seguimos aprendiendo sobre
      más tecnologías porque es lo que nos apasiona. <br /><br />Nos conocemos
      desde 2019 y desde entonces hemos sido buenos amigos, compartiendo gustos
      y con ganas de crear proyectos como el que están viendo ahora mismo. Cada
      uno se enfocó en una parte específica del proyecto como se puede deducir
      en la parte superior de esta pestaña, pero tratamos de coordinardos para
      que el producto final nos guste a todos. Hacemos un buen trabajo en
      equipo. <br /><br />
      Con amor para todos ustedes! 💖
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import HeaderIQ from 'src/components/Header.vue';
export default defineComponent({
  name: 'MeetUs',
  components: { HeaderIQ },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import '../css/meetus.scss';
</style>
