let allPokemonInfo = [];
let allPokemonInfoSort = [];

const listPokemon = document.querySelector(".list-pokemon");
const pokeSearch = document.querySelector(".search-pokemon");
const audioInput = new Audio("./assets/sound/press_1.mp3");
const containerPokemon = document.querySelector(".container-pokemon");
const pokemonProfil = document.querySelector(".pokemon-profil");
const startSound = new Audio("./assets/sound/start.mp3");
const offSound = new Audio("./assets/sound/off.mp3");
const enterBackSound = new Audio("./assets/sound/enter.mp3");
const selectSound = new Audio("./assets/sound/select.mp3");
const buttonEnter = document.querySelector(".button-enter");
const buttonBack = document.querySelector(".button-back");
const cross = document.querySelector(".cross");
const input = document.querySelector("input");
const topLightCross = document.querySelector("top-light-cross");
const bottomLightCross = document.querySelector("bottom-light-cross");

buttonBack.style.pointerEvents = "none";
buttonEnter.style.pointerEvents = "none";
cross.style.pointerEvents = "none";

const colorTypes = {
  grass: "#78c850",
  ground: "#E2BF65",
  dragon: "#6F35FC",
  fire: "#F58271",
  electric: "#F7D02C",
  fairy: "#D685AD",
  poison: "#966DA3",
  bug: "#B3F594",
  water: "#6390F0",
  normal: "#D9D5D8",
  psychic: "#F95587",
  flying: "#A98FF3",
  fighting: "#C25956",
  rock: "#B6A136",
  ghost: "#735797",
  ice: "#96D9D6",
};

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
    const textItem = document.createElement("p");
    const imgItem = document.createElement("img");
    itemList.classList.add("item-list-pokemon");

    textItem.innerHTML = `#${pokemonsInfos[i].id} <span>${pokemonsInfos[i].name}</span>`;
    imgItem.src = pokemonsInfos[i].img || "";
    itemList.id = pokemonsInfos[i].id;

    itemList.appendChild(textItem);
    itemList.appendChild(imgItem);
    listPokemon.appendChild(itemList);

    profilPokemon(itemList, pokemonsInfos);
    activateList();
    navListPokemon(pokemonsInfos);
    keyboardNavProfil(pokemonsInfos);
  }
}

function displayPokemon(pokemonsInfos, pokemonTargetId) {
  const ActivePokemon = document.querySelector(".active");
  const activePokemonId = Number(ActivePokemon.id - 1);
  const idPokemon = !pokemonTargetId ? activePokemonId : pokemonTargetId;

  listPokemon.classList.add("hide");
  pokemonProfil.classList.remove("hide");

  const imgProfil = document.querySelector(".img-profil");
  const name = document.querySelector(".name-profil");
  const type = document.querySelector(".type-profil");
  imgProfil.src = pokemonsInfos[idPokemon].img || "";
  name.innerText = pokemonsInfos[idPokemon].name || "";
  type.innerText = pokemonsInfos[idPokemon].type || "";
  pokemonProfil.id = idPokemon;
  let dynamicColor = colorTypes[pokemonsInfos[idPokemon].type];
  type.style.color = dynamicColor;
}

function profilPokemon(itemList, pokemonsInfos) {
  itemList.addEventListener("click", function (e) {
    listPokemon.classList.add("hide");
    pokemonProfil.classList.remove("hide");
    const pokemonTargetId = Number(e.currentTarget.id) - 1;
    displayPokemon(pokemonsInfos, pokemonTargetId);
    const audioPokemon = new Audio(
      `./assets/sound/cries_pokemon/${itemList.id}.ogg`
    );
    soundPlay(audioPokemon);
    audioPokemon.volume = 0.06;
  });
}

function keyboardNavProfil(pokemonsInfos) {
  document.addEventListener("keydown", function (e) {
    const ActivePokemon = document.querySelector(".active");
    const lightCerclePokemon = document.querySelector(".light-cercle-pokeball");
    if (lightCerclePokemon !== null) {
      if (e.key === "Enter") {
        displayPokemon(pokemonsInfos);
        const audioPokemon = new Audio(
          `./assets/sound/cries_pokemon/${Number(ActivePokemon.id)}.ogg`
        );
        soundPlay(audioPokemon);
        audioPokemon.volume = 0.002;
      }
      if (e.key === "Backspace") {
        buttonBackReset();
      }
    }
  });
}

function activateList() {
  const firstItem = document.querySelector(".item-list-pokemon");
  firstItem.classList.add("active");
}

function navListPokemon(pokemonsInfos) {
  buttonEnter.addEventListener("click", function () {
    const ActivePokemon = document.querySelector(".active");
    const lightCerclePokemon = document.querySelector(".light-cercle-pokeball");
    const pokemonProfilHide = pokemonProfil.classList.value;
    if (
      lightCerclePokemon !== null &&
      pokemonProfilHide === "pokemon-profil hide"
    ) {
      console.log("test");
      displayPokemon(pokemonsInfos);
      const audioPokemon = new Audio(
        `./assets/sound/cries_pokemon/${Number(ActivePokemon.id)}.ogg`
      );
      soundPlay(audioPokemon);
      audioPokemon.volume = 0.002;
    }
  });

  buttonBack.addEventListener("click", function () {
    buttonBackReset();
  });
}

function buttonBackReset() {
  listPokemon.classList.remove("hide");
  pokemonProfil.classList.add("hide");
  let allItemList = document.querySelectorAll(".item-list-pokemon");
  for (i = 0; i < allItemList.length; i++) {
    allItemList[i].style.display = "grid";
  }
}

function keyboardUpDownList() {
  document.addEventListener("keydown", function (e) {
    const active = document.querySelector(".active");
    const nextActive = Number(active.id) + 1;
    const previousActive = Number(active.id) - 1;
    const lightCerclePokemon = document.querySelector(".light-cercle-pokeball");
    const pokemonProfilHide = pokemonProfil.classList.value;
    if (
      lightCerclePokemon !== null &&
      pokemonProfilHide === "pokemon-profil hide" &&
      active !== null
    ) {
      const nextItem = document.getElementById(nextActive);
      const previousItem = document.getElementById(previousActive);

      if (e.key === "ArrowDown") {
        scrollList(nextItem);
      } else if (e.key === "ArrowUp") {
        scrollList(previousItem);
      }

      function scrollList(item) {
        soundPlay(selectSound);
        if (item !== null) {
          active.classList.remove("active");
          item.classList.add("active");
          item.scrollIntoView();
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
  });
}
keyboardUpDownList();

function switchOnOff() {
  const buttonStart = document.querySelector(".button-start-pokedex");
  buttonStart.addEventListener("click", function () {
    const hide = document.querySelector(".hide");
    const cerclePokeball = document.querySelector(".intern-cercle-pokeball");
    const active = document.querySelector(".active");
    const firstItem = document.querySelector(".item-list-pokemon");
    const lightCerclePokemon = document.querySelector(".light-cercle-pokeball");
    let allItemList = document.querySelectorAll(".item-list-pokemon");

    if (hide !== null && lightCerclePokemon === null) {
      for (i = 0; i < allItemList.length; i++) {
        allItemList[i].style.display = "grid";
      }
      listPokemon.classList.remove("hide");
      cerclePokeball.classList.add("light-cercle-pokeball");
      active.classList.remove("active");
      pokeSearch.removeAttribute("disabled");
      firstItem.classList.add("active");
      firstItem.scrollIntoView();
      buttonBack.style.pointerEvents = "initial";
      buttonEnter.style.pointerEvents = "initial";
      cross.style.pointerEvents = "initial";

      soundPlay(startSound);
    } else if (lightCerclePokemon !== null) {
      listPokemon.classList.add("hide");
      cerclePokeball.classList.remove("light-cercle-pokeball");
      pokeSearch.setAttribute("disabled", "disabled");
      pokeSearch.value = "";
      pokemonProfil.classList.add("hide");
      soundPlay(offSound);
      buttonBack.style.pointerEvents = "none";
      buttonEnter.style.pointerEvents = "none";
      cross.style.pointerEvents = "none";
    }
  });
}
switchOnOff();

pokeSearch.addEventListener("keypress", function () {
  let allItemList = document.querySelectorAll(".item-list-pokemon");
  let allNames = document.querySelectorAll(".item-list-pokemon > p > span");
  let filter, titleValue;
  filter = pokeSearch.value.toUpperCase();

  for (i = 0; i < allItemList.length; i++) {
    titleValue = allNames[i].innerText;

    if (titleValue.toUpperCase().indexOf(filter) > -1) {
      allItemList[i].style.display = "grid";
    } else {
      allItemList[i].style.display = "none";
    }
  }
});

function sound() {
  pokeSearch.addEventListener("keydown", function (e) {
    soundPlay(audioInput);
  });
}
sound();

function soundPlay(audio) {
  audio.volume = 0.3;
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
