const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const spriteContainer = document.getElementById("sprite-container");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

pokemonId.style.display = "none";
pokemonName.style.display = "none";
weight.style.display = "none";
height.style.display = "none";
const fetchData = async () => {
  try {
    const searchInputOrId = searchInput.value.toLowerCase();
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInputOrId}`
    );
    const data = await res.json();
    pokemonId.style.display = "flex";
    pokemonName.style.display = "flex";
    weight.style.display = "flex";
    height.style.display = "flex";
    pokemonName.innerText = `${data.name.toUpperCase()}`;
    pokemonId.innerText = `#${data.id}`;
    weight.innerText = `Weight: ${data.weight}`;
    height.innerText = `Height: ${data.height}`;
    spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;
    // Stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Types
    types.innerHTML = data.types
      .map(
        (item) =>
          `<span class="type ${item.type.name}">${item.type.name}</span>`
      )
      .join("");
  } catch (err) {
    resetDisplay();
    alert("Pokémon not found");
    console.error(err);
  }
};

const resetDisplay = () => {
  pokemonId.style.display = "none";
  pokemonName.style.display = "none";
  weight.style.display = "none";
  height.style.display = "none";
  spriteContainer.innerHTML = "";
  pokemonId.textContent = "";
  pokemonName.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
  types.innerHTML = "";
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData();
});
// Note: Pokémon names should be in lowercase, have special characters
// removed, and be dash separated. Also, if the Pokémon has either ♀ or ♂
// as part of its name, the format is
