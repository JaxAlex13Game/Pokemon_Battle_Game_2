// DOM Elements
const titleScreen = document.getElementById('title-screen');
const gameScreen = document.getElementById('game-screen');
const vsScreen = document.getElementById('vs-screen');
const victoryScreen = document.getElementById('victory-screen');
const startGameBtn = document.getElementById('start-game');
const startBattleBtn = document.getElementById('start-battle');
const continueBtn = document.getElementById('continue-btn');
const howToPlayBtn = document.getElementById('how-to-play');
const howToPlayBtnTitle = document.getElementById('how-to-play-btn');
const modal = document.getElementById('how-to-play-modal');
const closeModal = document.querySelector('.close');
const pokemon1Element = document.getElementById('pokemon1');
const pokemon2Element = document.getElementById('pokemon2');
const battleLog = document.getElementById('battle-log');

// Game state
let battleInterval = null;
let currentPokemon1 = null;
let currentPokemon2 = null;

// Helper functions
function getRandomPokemon() {
  return pokemonList[Math.floor(Math.random() * pokemonList.length)];
}

function getTwoUniquePokemon() {
  let pokemon1 = getRandomPokemon();
  let pokemon2 = getRandomPokemon();
  
  while (pokemon1.name === pokemon2.name) {
    pokemon2 = getRandomPokemon();
  }
  
  return [pokemon1, pokemon2];
}

function calculateEffectiveness(attackerTypes, defenderTypes) {
  let effectiveness = 1;
  
  attackerTypes.forEach(atkType => {
    defenderTypes.forEach(defType => {
      if (typeEffectiveness[atkType] && typeEffectiveness[atkType][defType] !== undefined) {
        effectiveness *= typeEffectiveness[atkType][defType];
      }
    });
  });

  return effectiveness;
}

function getEffectivenessMessage(effectiveness) {
  if (effectiveness === 0) return "It has no effect!";
  if (effectiveness < 1) return "It's not very effective...";
  if (effectiveness > 1) return "It's super effective!";
  return "";
}

function shouldApplyDamage(attackerTypes, defender, damage) {
  if (defender.ability === "Wonder Guard") {
    const effectiveness = calculateEffectiveness(attackerTypes, defender.types);
    return effectiveness > 1;
  }
  return true;
}

function displayPokemon(pokemon, element) {
  const img = element.querySelector(".pokemon-image");
  const name = element.querySelector(".pokemon-name");
  const types = element.querySelector(".pokemon-types");
  const hp = element.querySelector(".pokemon-hp");
  const ability = element.querySelector(".pokemon-ability") || document.createElement("p");
  
  img.src = pokemon.image;
  img.alt = pokemon.name;
  name.textContent = pokemon.name;
  hp.textContent = `HP: ${pokemon.hp}`;
  
  types.innerHTML = "";
  pokemon.types.forEach(type => {
    const typeBadge = document.createElement("span");
    typeBadge.className = `type-badge type-${type}`;
    typeBadge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    types.appendChild(typeBadge);
  });
  
  ability.className = "pokemon-ability";
  if (pokemon.ability) {
    ability.textContent = `Ability: ${pokemon.ability}`;
    if (pokemon.ability === "Wonder Guard") {
      element.classList.add("wonder-guard-effect");
    } else {
      element.classList.remove("wonder-guard-effect");
    }
  } else {
    ability.textContent = "";
    element.classList.remove("wonder-guard-effect");
  }
  
  if (!element.querySelector(".pokemon-ability")) {
    element.appendChild(ability);
  }
  
  element.classList.remove("attack-animation", "damage-animation", "victory-animation", "faint-animation");
}

// Screen functions
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  screen.classList.remove('hidden');
}

function showVsScreen(pokemon1, pokemon2) {
  document.getElementById('vs-pokemon1-img').src = pokemon1.image;
  document.getElementById('vs-pokemon1-name').textContent = pokemon1.name;
  document.getElementById('vs-pokemon2-img').src = pokemon2.image;
  document.getElementById('vs-pokemon2-name').textContent = pokemon2.name;
  
  showScreen(vsScreen);
  
  setTimeout(() => {
    showScreen(gameScreen);
    simulateBattle(pokemon1, pokemon2);
  }, 3000);
}

function showVictoryScreen(winner) {
  document.getElementById('winner-img').src = winner.image;
  document.getElementById('winner-name').textContent = winner.name;
  showScreen(victoryScreen);
}

// Battle functions
function simulateBattle(pokemon1, pokemon2) {
  battleLog.innerHTML = "";
  startBattleBtn.disabled = true;
  
  displayPokemon(pokemon1, pokemon1Element);
  displayPokemon(pokemon2, pokemon2Element);

  let attacker = pokemon1;
  let defender = pokemon2;
  let attackerElement = pokemon1Element;
  let defenderElement = pokemon2Element;

  battleInterval = setInterval(() => {
    if (pokemon1.hp <= 0 || pokemon2.hp <= 0) {
      endBattle(pokemon1, pokemon2);
      return;
    }

    const baseDamage = Math.floor(Math.random() * 10) + 1;
    const effectiveness = calculateEffectiveness(attacker.types, defender.types);
    const damage = Math.max(1, Math.floor(baseDamage * effectiveness));
    
    let attackMessage = `${attacker.name} attacks! `;
    
    if (shouldApplyDamage(attacker.types, defender, damage)) {
      defender.hp -= damage;
      attackMessage += `${getEffectivenessMessage(effectiveness)} ${defender.name} takes ${damage} damage! (${Math.max(0, defender.hp)} HP left)`;
    } else {
      attackMessage += `${defender.name}'s Wonder Guard blocked the attack!`;
    }

    battleLog.innerHTML += attackMessage + "<br>";
    battleLog.scrollTop = battleLog.scrollHeight;
    defenderElement.querySelector(".pokemon-hp").textContent = `HP: ${Math.max(0, defender.hp)}`;

    attackerElement.classList.add("attack-animation");
    defenderElement.classList.add("damage-animation");

    setTimeout(() => {
      attackerElement.classList.remove("attack-animation");
      defenderElement.classList.remove("damage-animation");
      
      if (defender.hp <= 0) {
        defenderElement.classList.add("faint-animation");
        endBattle(pokemon1, pokemon2);
      } else {
        [attacker, defender] = [defender, attacker];
        [attackerElement, defenderElement] = [defenderElement, attackerElement];
      }
    }, 500);
  }, 1500);
}

function endBattle(pokemon1, pokemon2) {
  clearInterval(battleInterval);
  battleInterval = null;
  startBattleBtn.disabled = false;

  const winner = pokemon1.hp > 0 ? pokemon1 : pokemon2;
  setTimeout(() => showVictoryScreen(winner), 1000);
}

// Event listeners
startGameBtn.addEventListener("click", () => {
  const [pokemon1, pokemon2] = getTwoUniquePokemon();
  currentPokemon1 = { ...pokemon1 };
  currentPokemon2 = { ...pokemon2 };
  showVsScreen(currentPokemon1, currentPokemon2);
});

startBattleBtn.addEventListener("click", () => {
  if (battleInterval) clearInterval(battleInterval);
  const [pokemon1, pokemon2] = getTwoUniquePokemon();
  currentPokemon1 = { ...pokemon1 };
  currentPokemon2 = { ...pokemon2 };
  showVsScreen(currentPokemon1, currentPokemon2);
});

continueBtn.addEventListener("click", () => {
  showScreen(gameScreen);
});

howToPlayBtn.addEventListener("click", () => {
  modal.classList.remove('hidden');
});

howToPlayBtnTitle.addEventListener("click", () => {
  modal.classList.remove('hidden');
});

closeModal.addEventListener("click", () => {
  modal.classList.add('hidden');
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.classList.add('hidden');
  }
});

// Initialize game
showScreen(titleScreen);
