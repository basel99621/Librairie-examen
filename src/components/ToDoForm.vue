<script setup>
import { ref, defineEmits } from "vue";
// -- donnée réactive pour la saisie du titre
const titre = ref("");
const titreR = ref("");
const prix = ref(0);
const qtestock = ref(0);
const emit = defineEmits(["addC"]);
</script>

<template>
  <form
    id="buttonAjouter"
    @submit.prevent="$emit('addC', titre, prix, qtestock)"
  >
    <input type="text" v-model="titre" placeholder="Nom du livre" />
    <input type="text" v-model="prix" placeholder="Prix du livre" />
    <input type="text" v-model="qtestock" placeholder="La quantité en stock" />
    <input type="submit" value="Ajouter" />
  </form>
  <form class="buttonRechercher" @submit.prevent="$emit('addR', titreR)">
    <input type="text" v-model="titreR" placeholder="Livre Rechercher " />
    <input type="submit" value="Rechercher" />
  </form>
</template>

<style scoped>
</style>
