<template>
  <h3>Liste des livres</h3>
  <ToDoForm @addC="handlerAdd" @addR="rechercheLivres"></ToDoForm>
  <ul>
    <ToDoListItem
      v-for="livre of listeL"
      :key="livre.id"
      :livre="livre"
      @deleteC="handlerDelete"
      @augmenter="handlerAugmenter"
      @diminuer="handlerDiminuer"
    />
  </ul>
</template>

<script setup>
import { reactive, onMounted, defineExpose } from "vue";
import ToDoListItem from "./ToDoListItem.vue";
import ToDoForm from "./ToDoForm.vue";
import Livre from "../Livre";

const listeL = reactive([]);

// -- l'url de l'API
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/3/livres";

// -- handler pour supprimer un livre à partir de son id
function handlerDelete(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id du livre à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}
// -- handler pour ajouter un nouveau livre à partir de son titre
function handlerAdd(titre, prix, qtestock) {
  console.log(titre, prix, qtestock);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // --  le titre du noiuveau livre est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ titre: titre, qtestock: qtestock, prix: prix }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}

// -- req AJAX pour récupérer les livres
//    et les stocker dans le state listeC
function getLivres() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // -- vider la liste des choses
      listeL.splice(0, listeL.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Livre
      //  et l'ajouter dans la liste listeL
      dataJSON.forEach((v) =>
        listeL.push(new Livre(v.id, v.titre, v.qtestock, v.prix))
      );
    })
    .catch((error) => console.log(error));
}

// -- appel de la req AJAX une fois après la création de l'instance
onMounted(() => {
  getLivres();
});

function rechercheLivres(titre) {
  console.log("Je recherche !!!!!!", titre);
  // - l'url (la route) pour la recherche de livres n'est pas la même
  const urlLivres =
    "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/3/livres?search=";
  const fetchOptions = { method: "GET" };
  // récupérer la valeur saisie dans la zone de texte

  // --- la valeur saisie doit être ajoutée à la fin de l'URL
  fetch(urlLivres + titre, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // -- vider la liste des livres
      listeL.splice(0, listeL.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Livre
      //  et l'ajouter dans la liste listeL
      dataJSON.forEach((v) =>
        listeL.push(new Livre(v.id, v.titre, v.qtestock, v.prix))
      );
    })
    .catch((error) => console.log(error));
}

function handlerAugmenter(livre) {
  console.log({ ...livre });
  livre.augmenter();
  console.log({ ...livre });
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/3/livres";
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: livre.id,
      titre: livre.titre,
      prix: livre.prix,
      qtestock: livre.qtestock,
    }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}

// -- handler pour diminuer la quantité de stock d'un livre à partir de son id
function handlerDiminuer(livre) {
  livre.diminuer();
  if (livre.qtestock === 0) {
    handlerDelete(livre.id);
  }
  console.log({ ...livre });
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/3/livres";
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: livre.id,
      titre: livre.titre,
      prix: livre.prix,
      qtestock: livre.qtestock,
    }),
  };
  // -- l'id du livre à modifier doit être
  //  ajouté à la fin de l'url
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}

// -- appel de la fonction defineExpose pour exposer les propriétés handlerAugmenter et handlerDiminuer
defineExpose({ handlerAugmenter, handlerDiminuer });

// ... code existant ...
</script>