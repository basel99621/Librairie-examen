// un livre
export default class Livre {
  constructor(id, titre, qtestock, prix) {
    this._titre = titre;
    this._qtestock = qtestock;
    this._id = id;
    this._prix = prix;
    //this._id = Date.now() + Math.floor(Math.random() * 10); // génération d'un id unique
  }
  get titre() {
    return this._titre;
  }
  get id() {
    return this._id;
  }
  get qtestock() {
    return this._qtestock;
  }
  get prix() {
    return this._prix;
  }

  // modifier le texte
  set titre(titre) {
    this._titre = titre;
  }
  pourAfficher() {
    return ` Le titre : ${this._titre}  La quantité en stock : ${this._qtestock} Le prix : ${this._prix} €`;
  }
  augmenter() {
    return (this._qtestock += 1);
  }
  diminuer() {
    return (this._qtestock -= 1);
  }
}
