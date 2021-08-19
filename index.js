let allPokemonInfo = [];
let allPokemonInfoSort = [];
const listPokemon = document.querySelector(".list-pokemon");

const pokeSearch = document.querySelector(".search-pokemon");
const audio = new Audio("./assets/sound/press_1.mp3");

function fetchPokemonData() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((pokemons) => {
      pokemons.results.map((pokemon) => getPokemonData(pokemon));
    });
}
fetchPokemonData();

function getPokemonData(pokemon) {
  let pokemonInfo = {
    name: pokemon.name,
    img: "",
    type: "",
  };

  let url = pokemon.url;

  fetch(url)
    .then((res) => res.json())
    .then((pokemonData) => {
      pokemonInfo.img = pokemonData.sprites.front_default;
      pokemonInfo.type = pokemonData.types[0].type.name;
      pokemonInfo.id = pokemonData.id;
      allPokemonInfo.push(pokemonInfo);

      if (allPokemonInfo.length === 151) {
        allPokemonInfoSort = allPokemonInfo
          .sort((a, b) => {
            return a.id - b.id;
          })
          .slice(0, 6);

        //console.log(allPokemonInfoSort);
        createItemList(allPokemonInfoSort);
      }
    });
}

function createItemList(pokemonsInfos) {
  for (let i = 0; i < pokemonsInfos.length; i++) {
    const itemList = document.createElement("div");
    itemList.classList.add("item-list-pokemon");
    const textItem = document.createElement("p");
    textItem.innerText = pokemonsInfos[i].name;
    const imgItem = document.createElement("img");
    imgItem.src = pokemonsInfos[i].img || "";

    itemList.appendChild(textItem);
    itemList.appendChild(imgItem);

    listPokemon.appendChild(itemList);
  }
}

pokeSearch.addEventListener("keydown", function (e) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
});
