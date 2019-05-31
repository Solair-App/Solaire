class Parcours {
  constructor(name, description, thématique, langue, durée, difficulté) {
    this.name = name;
    this.description = description;
    this.thématique = thématique;
    this.langue = langue;
    this.durée = durée;
    this.difficulté = difficulté;
  }
console(){
  console.log(this.name)
}
}

export default Parcours
