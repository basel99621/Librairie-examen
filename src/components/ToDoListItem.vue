<script setup>
import { defineEmits, defineProps } from "vue";
const props = defineProps(["livre"]);
const emit = defineEmits(["deleteC", "augmenter", "diminuer"]);

const diminuer = () => {
  emit("diminuer", props.livre);
};
const augmenter = () => {
  emit("augmenter", props.livre);
};
</script>

<template>
  <li>
    <div class="book">
      <h2>Titire : {{ livre._titre }}</h2>
      <h2>La quantité : {{ livre._qtestock }}</h2>
      <h2>Le prix : {{ livre._prix }} €</h2>
    </div>
    <!-- cette fois en param du handler 
          on n'utilise pas l'index dans le tableau
          mais directement l'id du livre
          {{ livre.pourAfficher() }}
    -->

    <div class="buttonBas">
      <button @click="$emit('deleteC', livre.id)">Supprimer</button>
      <!-- cette fois sen param du handler 
          on n'utilise pas l'index dans la tableau 
          mais directement la chose à modifier
    -->
      <button type="button" @click="diminuer">-</button>
      <span class="qt">{{ livre._qtestock }}</span>
      <button type="button" @click="augmenter">+</button>
    </div>
  </li>
</template>

<style>
.book {
  height: 250px;
  width: 200px;
  border: indigo solid;
  text-align: center;
}
.qt {
  border: solid;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex; /* afficher les livres en tant que flex container */
  flex-wrap: wrap; /* permettre à la ligne de se casser pour les écrans plus petits */
  justify-content: center; /* centrer les livres horizontalement sur la page */
}
li {
  margin: 10px; /* ajouter un peu d'espace entre les livres */
}
.buttonBas {
  list-style: none;
  padding: 10px;
  display: flex; /* afficher les livres en tant que flex container */
  flex-wrap: wrap; /* permettre à la ligne de se casser pour les écrans plus petits */
  justify-content: center; /* centrer les livres horizontalement sur la page */
  display: flex;
}
</style>
