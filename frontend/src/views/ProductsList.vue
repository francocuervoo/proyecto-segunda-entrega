<template>
  <Title>Listado de todos los productos</Title>
  <Subtitle>
    Se visualizan todos los productos que se encuentran en el archivo del BE con
    el nombre "productos.json"
  </Subtitle>
  <form class="ml-12 mr-12" @submit.prevent="searchProducts">
    <ButtonPrimary @click="searchProducts"> VER PRODUCTOS </ButtonPrimary>
  </form>
</template>

<script>
import axios from "axios";
import Title from "@/components/elements/Title";
import Subtitle from "@/components/elements/Subtitle";
import ButtonPrimary from "@/components/elements/ButtonPrimary";

//const url = process.env.VUE_APP_URL + "/api/productos/";
const url = "http://localhost:8080/api/productos";

export default {
  components: {
    Title,
    Subtitle,
    ButtonPrimary,
  },
  data: () => ({}),
  methods: {
    searchProducts() {
      axios
        .get(url)
        .then((response) => {
          console.log("hola", response);
        })
        .catch(() => {
          console.log("no llegue");
        });
    },
  },
};
</script>
