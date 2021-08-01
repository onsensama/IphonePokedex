const searchPokemon = document.querySelector(".search-pokemon");
const audio = new Audio("./assets/sound/press_1.mp3");
//document.getElementById();

let pokemons = [];

function getPokemonList() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((allPokemons) => {
      //console.log("test", allPokemons);
      allPokemons.results.map((pokemon) => {
        //console.log("01", pokemon);
        //getPokemonInfos(pokemon);
      });
    });
}

getPokemonList();

// function getPokemonInfos(pokemon) {
//   let pokemonInfos = {};
//   let name = pokemon.name;
//   let url = pokemon.url;

//   fetch(url)
//     .then((res) => res.json())
//     .then((pokemonDatas) => {
//       pokemonInfos.name = name;
//       pokemonInfos.img = pokemonDatas.sprites.front_default;
//       allPokemons.push(pokemonInfos);
//     });

//   console.log("all", pokemons);
// }

searchPokemon.addEventListener("keydown", function (e) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
});
