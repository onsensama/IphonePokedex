let allPokemonInfo = [];
let allPokemonInfoSort = [];

const listPokemon = document.querySelector(".list-pokemon");
const pokeSearch = document.querySelector(".search-pokemon");
const audioInput = new Audio("./assets/sound/press_1.mp3");
const containerPokemon = document.querySelector(".container-pokemon");

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
    id: "",
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
        allPokemonInfoSort = allPokemonInfo.sort((a, b) => {
          return a.id - b.id;
        });

        createItemList(allPokemonInfoSort);
      }
    });
}

function createItemList(pokemonsInfos) {
  for (let i = 0; i < pokemonsInfos.length; i++) {
    const itemList = document.createElement("div");
    itemList.classList.add("item-list-pokemon");
    const textItem = document.createElement("p");
    textItem.innerText = `#${pokemonsInfos[i].id} ${pokemonsInfos[i].name}`;
    const imgItem = document.createElement("img");
    imgItem.src = pokemonsInfos[i].img || "";
    itemList.id = pokemonsInfos[i].id;

    itemList.appendChild(textItem);
    itemList.appendChild(imgItem);

    listPokemon.appendChild(itemList);

    const firstItem = document.querySelector(".item-list-pokemon");
    firstItem.classList.add("active");

    itemList.addEventListener("click", function (e) {
      listPokemon.classList.add("hide");
      console.log(containerPokemon);
      // const active = document.querySelector(".active");

      //   if (active !== null) {
      //     active.classList.remove("active");
      //   }
      //   e.currentTarget.classList.add("active");
    });
  }
}

function keyboardNagigation() {
  document.addEventListener("keydown", function (e) {
    const active = document.querySelector(".active");
    const nextActive = Number(active.id) + 1;
    const previousActive = Number(active.id) - 1;
    const hide = document.querySelector(".hide");
    const lightCerclePokemon = document.querySelector(".light-cercle-pokeball");
    const audioPokemon = new Audio(
      `./assets/sound/cries_pokemon/${nextActive}.ogg`
    );
    audioPokemon.volume = 0.1;

    if (e.key === "ArrowDown" && hide === null && lightCerclePokemon !== null) {
      if (active !== null) {
        const nextItem = document.getElementById(nextActive);
        soundPlay(audioPokemon);
        if (nextItem !== null) {
          active.classList.remove("active");
          nextItem.classList.add("active");
          listPokemon.focus();
          const bottomLightActive = document.querySelector(
            ".bottom-light-cross"
          );
          bottomLightActive.classList.add("light-active");
          setTimeout(() => {
            bottomLightActive.classList.remove("light-active");
          }, 100);
        }
      }
    }
    if (e.key === "ArrowUp" && hide === null && lightCerclePokemon !== null) {
      if (active !== null) {
        const previousItem = document.getElementById(previousActive);
        if (previousItem !== null) {
          active.classList.remove("active");
          previousItem.classList.add("active");
          listPokemon.focus();
          const topLightActive = document.querySelector(".top-light-cross");
          topLightActive.classList.add("light-active");
          setTimeout(() => {
            topLightActive.classList.remove("light-active");
          }, 100);
        }
      }
    }
  });
}
keyboardNagigation();

function SwitchOnOff() {
  const buttonStart = document.querySelector(".button-start-pokedex");
  buttonStart.addEventListener("click", function (e) {
    const hide = document.querySelector(".hide");
    const cerclePokeball = document.querySelector(".intern-cercle-pokeball");
    const active = document.querySelector(".active");
    const firstItem = document.querySelector(".item-list-pokemon");
    const lightCerclePokemon = document.querySelector(".light-cercle-pokeball");

    if (hide !== null && lightCerclePokemon === null) {
      listPokemon.classList.remove("hide");
      cerclePokeball.classList.add("light-cercle-pokeball");
      active.classList.remove("active");
      firstItem.classList.add("active");
      firstItem.tabIndex = 0;
      firstItem.focus();
    } else if (lightCerclePokemon !== null) {
      listPokemon.classList.add("hide");
      cerclePokeball.classList.remove("light-cercle-pokeball");
    }
  });
}
SwitchOnOff();

function sound() {
  pokeSearch.addEventListener("keydown", function (e) {
    soundPlay(audioInput);
  });
}
sound();

function soundPlay(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function displayPokemon() {}
