// Add this at the beginning of your script.js

// Title Screen Functionality
const titleScreen = document.getElementById("title-screen");
const gameScreen = document.getElementById("game-screen");
const startGameBtn = document.getElementById("start-game");
const howToPlayBtnTitle = document.getElementById("how-to-play-btn");

startGameBtn.addEventListener("click", () => {
  titleScreen.style.display = "none";
  gameScreen.style.display = "block";
  
  // Initialize game with random Pokémon
  const [initialPokemon1, initialPokemon2] = getTwoUniquePokemon();
  currentPokemon1 = { ...initialPokemon1 };
  currentPokemon2 = { ...initialPokemon2 };
  displayPokemon(currentPokemon1, pokemon1Element);
  displayPokemon(currentPokemon2, pokemon2Element);
});

howToPlayBtnTitle.addEventListener("click", () => {
  modal.style.display = "block";
});

// The rest of your existing JavaScript code remains the same...
// Type effectiveness chart
const typeEffectiveness = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
};

// Pokémon data
// Sample Pokémon data
const pokemonList = [
  { name: "Bulbasaur", hp: 68, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif" },
  { name: "Ivysaur", hp: 97, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ivysaur.gif" },
  { name: "Venusaur", hp: 134, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur.gif" },
  { name: "Charmander", hp: 65, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif" },
  { name: "Charmeleon", hp: 95, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/charmeleon.gif" },
  { name: "Charizard", hp: 129, types: ["fire", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif" },
  { name: "Squirtle", hp: 61, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif" },
  { name: "Wartortle", hp: 84, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/wartortle.gif" },
  { name: "Blastoise", hp: 131, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/blastoise.gif" },
  { name: "Caterpie", hp: 55, types: ["bug"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/caterpie.gif"},
  { name: "Metapod", hp: 65, types: ["bug"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/metapod.gif"},
  { name: "Butterfree", hp: 84, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/butterfree.gif"},
  { name: "Weedle", hp: 43, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/weedle.gif"},
  { name: "Kakuna", hp: 51, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/kakuna.gif"},
  { name: "Beedrill", hp: 83, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/beedrill.gif"},
  { name: "Pidgey", hp: 55, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgey.gif"},
  { name: "Pidgeotto", hp: 78, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgeotto.gif"},
  { name: "Pidgeot", hp: 118, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgeot.gif"},
  { name: "Rattata", hp: 51, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/rattata.gif"},
  { name: "Raticate", hp: 78, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/raticate.gif"},
  { name: "Spearow", hp: 58, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/spearow.gif"},
  { name: "Fearow", hp: 106, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/fearow.gif"},
  { name: "Ekans", hp: 61, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ekans.gif"},
  { name: "Arbok", hp: 86, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/arbok.gif"},
  { name: "Pikachu", hp: 56, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif"},
  { name: "Pikachu(Female)", hp: 56, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu-f.gif"},
  { name: "Raichu", hp: 94, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/raichu.gif"},
  { name: "Raichu(Female)", hp: 94, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/raichu-f.gif"},
  { name: "Sandshrew", hp: 61, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/sandshrew.gif"},
  { name: "Sandslash", hp: 90, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/sandslash.gif"},
  { name: "Nidoran(Female)", hp: 64, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/nidoran-f.gif"},
  { name: "Nidorina", hp: 88, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/nidorina.gif"},
  { name: "Nidoqueen", hp: 114, types: ["poison", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/nidoqueen.gif"},
  { name: "Nidoran(Male)", hp: 62, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/nidoran-m.gif"},
  { name: "Nidorino", hp: 90, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/nidorino.gif"},
  { name: "Nidoking", hp: 116, types: ["poison", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/nidoking.gif"},
  { name: "Clefairy", hp: 81, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/clefairy.gif"},
  { name: "Clefable", hp: 128, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/clefable.gif"},
  { name: "Vulpix", hp: 61, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/vulpix.gif"},
  { name: "Ninetales", hp: 90, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ninetales.gif"},
  { name: "Jigglypuff", hp: 118, types: ["normal", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/jigglypuff.gif" },
  { name: "Wigglytuff", hp: 150, types: ["normal", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/wigglytuff.gif" },
  { name: "Zubat", hp: 53, types: ["poison", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/zubat.gif"},
  { name: "Golbat", hp: 83, types: ["poison", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/golbat.gif"},
  { name: "Oddish", hp: 61, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/oddish.gif"},
  { name: "Gloom", hp: 81, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/gloom.gif"},
  { name: "Vileplume", hp: 102, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/vileplume.gif"},
  { name: "Paras", hp: 54, types: ["bug", "grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/paras.gif"},
  { name: "Parasect", hp: 76, types: ["bug", "grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/parasect.gif"},
  { name: "Venonat", hp: 79, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/venonat.gif"},
  { name: "Venomoth", hp: 101, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/venomoth.gif"},
  { name: "Diglett", hp: 42, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/diglett.gif"},
  { name: "Dugtrio", hp: 66, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/dugtrio.gif"},
  { name: "Meowth", hp: 59, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/meowth.gif" },
  { name: "Persian", hp: 83, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/persian.gif" },
  { name: "Psyduck", hp: 67, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/psyduck.gif" },
  { name: "Golduck", hp: 102, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/golduck.gif" },
  { name: "Mankey", hp: 69, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/mankey.gif"},
  { name: "Primeape", hp: 97, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/primeape.gif"},
  { name: "Growlithe", hp: 66, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/growlithe.gif"},
  { name: "Arcanine", hp: 113, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/arcanine.gif" },
  { name: "Poliwag", hp: 70, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/poliwag.gif"},
  { name: "Poliwhirl", hp: 91, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/poliwhirl.gif"},
  { name: "Poliwrath", hp: 121, types: ["water", "fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/poliwrath.gif"},
  { name: "Abra", hp: 50, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/abra.gif"},
  { name: "Kadabra", hp: 70, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/kadabra.gif" },
  { name: "Alakazam", hp: 90, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/alakazam.gif" },
  { name: "Machop", hp: 85, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/machop.gif" },
  { name: "Machoke", hp: 95, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/machoke.gif" },
  { name: "Machamp", hp: 125, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/machamp.gif" },
  { name: "Bellsprout", hp: 74, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/bellsprout.gif"},
  { name: "Weepinbell", hp: 94, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/weepinbell.gif"},
  { name: "Victreebel", hp: 112, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/victreebel.gif"},
  { name: "Tentacool", hp: 73, types: ["water", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/tentacool.gif"},
  { name: "Tentacruel", hp: 106, types: ["water", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/tentacruel.gif"},
  { name: "Geodude", hp: 75, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/geodude.gif"},
  { name: "Graveler", hp: 88, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/graveler.gif"},
  { name: "Golem", hp: 103, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/golem.gif"},
  { name: "Ponyta", hp: 69, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ponyta.gif"},
  { name: "Rapidash", hp: 87, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/rapidash.gif"},
  { name: "Slowpoke", hp: 124, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/slowpoke.gif"},
  { name: "Slowbro", hp: 140, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/slowbro.gif"},
  { name: "Magnemite", hp: 51, types: ["electric", "steel"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/magnemite.gif"},
  { name: "Magneton", hp: 76, types: ["electric", "steel"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/magneton.gif"},
  { name: "Farfetch'd", hp: 82, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/farfetchd.gif"},
  { name: "Doduo", hp: 67, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/doduo.gif"},
  { name: "Dodrio", hp: 90, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/dodrio.gif"},
  { name: "Seel", hp: 74, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/seel.gif"},
  { name: "Dewgong", hp: 122, types: ["water", "ice"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/dewgong.gif"},
  { name: "Grimer", hp: 108, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/grimer.gif"},
  { name: "Muk", hp: 126, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/muk.gif"},
  { name: "Shellder", hp: 62, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/shellder.gif"},
  { name: "Cloyster", hp: 84, types: ["water", "ice"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/cloyster.gif"},
  { name: "Gastly", hp: 62, types: ["ghost", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/gastly.gif" },
  { name: "Haunter", hp: 79, types: ["ghost", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/haunter.gif" },
  { name: "Gengar", hp: 95, types: ["ghost", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/gengar.gif" },
  { name: "Onix", hp: 64, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/onix.gif"},
  { name: "Drowzee", hp: 74, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/drowzee.gif"},
  { name: "Hypno", hp: 113, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/hypno.gif"},
  { name: "Krabby", hp: 63, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/krabby.gif"},
  { name: "Kingler", hp: 86, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/kingler.gif"},
  { name: "Voltorb", hp: 73, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/voltorb.gif"},
  { name: "Electrode", hp: 92, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/electrode.gif"},
  { name: "Exeggcute", hp: 81, types: ["grass", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/exeggcute.gif"},
  { name: "Exeggutor", hp: 112, types: ["grass", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/exeggutor.gif"},
  { name: "Cubone", hp: 68, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/cubone.gif"},
  { name: "Marowak", hp: 91, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/marowak.gif"},
  { name: "Hitmonlee", hp: 81, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/hitmonlee.gif"},
  { name: "Hitmonchan", hp: 84, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/hitmonchan.gif"},
  { name: "Lickitung", hp: 117, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/lickitung.gif"},
  { name: "Koffing", hp: 64, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/koffing.gif"},
  { name: "Weezing", hp: 88, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/weezing.gif"},
  { name: "Rhyhorn", hp: 102, types: ["ground", "rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/rhyhorn.gif"},
  { name: "Rhydon", hp: 134, types: ["ground", "rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/rhydon.gif"},
  { name: "Chansey", hp: 227, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/chansey.gif"},
  { name: "Tangela", hp: 79, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/tangela.gif"},
  { name: "Kangaskhan", hp: 118, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/kangaskhan.gif"},
  { name: "Horsea", hp: 57, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/horsea.gif"},
  { name: "Seadra", hp: 87 ,types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/seadra.gif"},
  { name: "Goldeen", hp: 54, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/goldeen.gif"},
  { name: "Seaking", hp: 97, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/seaking.gif"},
  { name: "Staryu", hp: 64, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/staryu.gif"},
  { name: "Starmie", hp: 84, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/starmie.gif"},
  { name: "Mr. Mime", hp: 69, types: ["psychic", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/mr-mime.gif"},
  { name: "Scyther", hp: 83, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/scyther.gif"},
  { name: "Jynx", hp: 93, types: ["ice", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/jynx.gif"},
  { name: "Electabuzz", hp: 85, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/electabuzz.gif"},
  { name: "Magmar", hp: 90, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/magmar.gif"},
  { name: "Pinsir", hp: 87, types: ["bug"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/pinsir.gif"},
  { name: "Tauros", hp: 103, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/tauros.gif"},
  { name: "Magikarp", hp: 45, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/magikarp.gif"},
  { name: "Magikarp(Female)", hp: 45, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/magikarp-f.gif"},
  { name: "Gyrados", hp: 123, types: ["water", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/gyarados.gif" },
  { name: "Gyrados(Female)", hp: 123, types: ["water", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/gyarados-f.gif" },
  { name: "Lapras", hp: 150, types: ["water", "ice"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/lapras.gif"},
  { name: "Ditto", hp: 79, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ditto.gif"},
  { name: "Eevee", hp: 86, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif" },
  { name: "Eevee(Female)", hp: 86, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/eevee-f.gif" },
  { name: "Vaporeon", hp: 135, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/vaporeon.gif"},
  { name: "Jolteon", hp: 86, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/jolteon.gif"},
  { name: "Flareon", hp: 99, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/flareon.gif"},
  { name: "Porygon", hp: 94, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/porygon.gif"},
  { name: "Omanyte", hp: 70, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/omanyte.gif"},
  { name: "Omastar", hp: 100, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/omastar.gif"},
  { name: "Kabuto", hp: 62, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/kabuto.gif"},
  { name: "Kabutops", hp: 90, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/kabutops.gif"},
  { name: "Aerodactyl", hp: 102, types: ["rock", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/aerodactyl.gif"},
  { name: "Snorlax", hp: 182, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/snorlax.gif" },
  { name: "Articuno", hp: 124, types: ["ice", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/articuno.gif"},
  { name: "Zapdos", hp: 121, types: ["electric", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/zapdos.gif"},
  { name: "Moltres", hp: 123, types: ["fire", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/moltres.gif"},
  { name: "Dratini", hp: 76, types: ["dragon"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/dratini.gif"},
  { name: "Dragonair", hp: 94, types: ["dragon"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/dragonair.gif"},
  { name: "Dragonite", hp: 118, types: ["dragon", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/dragonite.gif" },
  { name: "Mewtwo", hp: 136, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/mewtwo.gif" },
  { name: "Mew", hp: 134, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/mew.gif" },
  { name: "Chikorita", hp: 70, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/chikorita.gif"},
  { name: "Bayleef", hp: 92, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/bayleef.gif" },
  { name: "Meganium", hp: 112, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/meganium.gif" },
  { name: "Cyndaquil", hp: 61, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/cyndaquil.gif" },
  { name: "Quilava", hp: 91, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/quilava.gif" },
  { name: "Typhlosion", hp: 108, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/typhlosion.gif" },
  { name: "Totodile", hp: 67, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/totodile.gif" },
  { name: "Croconaw", hp: 97, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/croconaw.gif" },
  { name: "Feraligatr", hp: 119, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/feraligatr.gif"},
  { name: "Sentret", hp: 66, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/sentret.gif"},
  { name: "Furret", hp: 100, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/furret.gif"},
  { name: "Hoothoot", hp: 74, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/hoothoot.gif"},
  { name: "Noctowl", hp: 124, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/noctowl.gif"},
  { name: "Ledyba", hp: 68, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ledyba.gif"},
  { name: "Ledian", hp: 86, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ledian.gif"},
  { name: "Spinarak", hp: 78, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/spinarak.gif"},
  { name: "Ariados", hp: 87, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ariados.gif"},
  { name: "Crobat", hp: 105, types: ["poison", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/crobat.gif"},
  { name: "Chinchou", hp: 81, types: ["water", "electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/chinchou.gif"},
  { name: "Lanturn", hp: 133, types: ["water", "electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/lanturn.gif"},
  { name: "Pichu", hp: 53, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/pichu.gif"},
  { name: "Cleffa", hp: 66, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/cleffa.gif"},
  { name: "Igglybuff", hp: 99, types: ["normal", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/igglybuff.gif"},
  { name: "Togepi", hp: 63, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/togepi.gif"},
  { name: "Togetic", hp: 87, types: ["fairy", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/togetic.gif"},
  { name: "Natu", hp: 54, types: ["psychic", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/natu.gif"},
  { name: "Xatu", hp: 92, types: ["psychic", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/xatu.gif"},
  { name: "Mareep", hp: 87, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/mareep.gif"},
  { name: "Flaaffy", hp: 103, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/flaaffy.gif"},
  { name: "Ampharos", hp: 124, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ampharos.gif"},
  { name: "Bellossom", hp: 106, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/bellossom.gif"},
  { name: "Marill", hp: 75, types: ["water", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/marill.gif"},
  { name: "Azumarill", hp: 108, types: ["water", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/azumarill.gif"},
  { name: "Sudowoodo", hp: 105, types: ["rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/sudowoodo.gif"},
  { name: "Sudowoodo(Female)", hp: 105, types: ["rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/sudowoodo-f.gif"},
  { name: "Politoed", hp: 124, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/politoed.gif"},
  { name: "Hoppip", hp: 51, types: ["grass", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/hoppip.gif"},
  { name: "Skiploom", hp: 77, types: ["grass", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/skiploom.gif"},
  { name: "Jumpluff", hp: 99, types: ["grass", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/jumpluff.gif"},
  { name: "Aipom", hp: 63, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/aipom.gif" },
  { name: "Aipom(Female)", hp: 63, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/aipom-f.gif" },
  { name: "Sunkern", hp: 47, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/sunkern.gif" },
  { name: "Sunflora", hp: 97, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/sunflora.gif"},
  { name: "Yanma", hp: 95, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/yanma.gif"},
  { name: "Wooper", hp: 60, types: ["water", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/wooper.gif"},
  { name: "Quagsire", hp: 102, types: ["water", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/quagsire.gif"},
  { name: "Espeon", hp: 99, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/espeon.gif"},
  { name: "Umbreon", hp: 130, types: ["dark"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/umbreon.gif"},
  { name: "Murkrow", hp: 85, types: ["dark", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/murkrow.gif"},
  { name: "Murkrow(Female)", hp: 85, types: ["dark", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/murkrow-f.gif"},
  { name: "Slowking", hp: 157, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/slowking.gif"},
  { name: "Misdreavus", hp: 66, types: ["ghost"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/misdreavus.gif"},
  { name: "Unown-A", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-a.gif"},
  { name: "Unown-B", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-b.gif"},
  { name: "Unown-C", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-c.gif"},
  { name: "Unown-D", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-d.gif"},
  { name: "Unown-E", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-e.gif"},
  { name: "Unown-F", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-f.gif"},
  { name: "Unown-G", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-g.gif"},
  { name: "Unown-H", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-h.gif"},
  { name: "Unown-I", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-i.gif"},
  { name: "Unown-J", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-j.gif"},
  { name: "Unown-K", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-k.gif"},
  { name: "Unown-L", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-l.gif"},
  { name: "Unown-M", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-m.gif"},
  { name: "Unown-N", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-n.gif"},
  { name: "Unown-O", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-o.gif"},
  { name: "Unown-P", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-p.gif"},
  { name: "Unown-Q", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-q.gif"},
  { name: "Unown-R", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-r.gif"},
  { name: "Unown-S", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-s.gif"},
  { name: "Unown-T", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-t.gif"},
  { name: "Unown-U", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-u.gif"},
  { name: "Unown-V", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-v.gif"},
  { name: "Unown-W", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-w.gif"},
  { name: "Unown-X", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-x.gif"},
  { name: "Unown-Y", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-y.gif"},
  { name: "Unown-Z", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-z.gif"},
  { name: "Unown-!", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-!.gif"},
  { name: "Unown-?", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/unown-?.gif"},
  { name:  "Wobbuffet", hp: 202, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/wobbuffet.gif"},
  { name:  "Wobbuffet(Female)", hp: 202, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/wobbuffet-f.gif"},
  { name: "Girafarig", hp: 101, types: ["normal", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/girafarig.gif" },
  { name: "Girafarig(Female)", hp: 101, types: ["normal", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/girafarig-f.gif" },
  { name: "Pineco", hp: 57, types: ["bug"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/pineco.gif" },
  { name: "Forretress", hp: 100, types: ["bug", "steel"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/forretress.gif" },
  { name: "Dunsparce", hp: 123, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/dunsparce.gif" },
  { name: "Gligar", hp: 80, types: ["ground", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/gligar.gif"},
  { name: "Gligar(Female)", hp: 80, types: ["ground", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/gligar-f.gif"},
  { name: "Steelix", hp: 145, types: ["steel", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/steelix.gif"},
  { name: "Steelix(Female)", hp: 145, types: ["steel", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/steelix-f.gif"},
  { name: "Snubbull", hp: 78, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/snubbull.gif"},
  { name: "Granbull", hp: 122, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/granbull.gif" },
  { name: "Qwilfish", hp: 75, types: ["water", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/quilfish.gif"},
  { name: "Scizor", hp: 143, types: ["bug", "steel"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/scizor.gif"},
  { name: "Scizor(Female)", hp: 143, types: ["bug", "steel"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/scizor-f.gif"},
  { name: "Shuckle", hp: 119, types: ["bug", "rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/shuckle.gif"},
  { name: "Heracross", hp: 129, types: ["bug", "fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/heracross.gif"},
  { name: "Heracross(Female)", hp: 129, types: ["bug", "fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/heracross-f.gif"},
  { name: "Sneasel", hp: 79, types: ["dark", "ice"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/sneasel.gif"},
  { name: "Sneasel(Female)", hp: 79, types: ["dark", "ice"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/sneasel-f.gif"},
  { name: "Teddiursa", hp: 73, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/teddiursa.gif"},
  { name: "Ursaring", hp: 116, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ursaring.gif" },
  { name: "Slugma", hp: 75, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/slugma.gif" },
  { name: "Magcargo", hp: 125, types: ["fire", "rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/macargo.gif" },
  { name: "Swinub", hp: 85, types: ["ice", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/swinub.gif"},
  { name: "Piloswine", hp: 135, types: ["ice", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/piloswine.gif"},
  { name: "Corsola", hp: 90, types: ["water", "rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/corsola.gif"},
  { name: "Remoraid", hp: 65, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/remoraid.gif"},
  { name: "Octillery", hp: 122, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/octillery.gif"},
  { name: "Delibird", hp: 77, types: ["ice", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/delibird.gif"},
  { name: "Mantine", hp: 124, types: ["water", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/mantine.gif"},
  { name: "Skarmory", hp: 132, types: ["steel", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/skarmory.gif"},
  { name: "Houndour", hp: 67, types: ["dark", "fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/houndour.gif"},
  { name: "Houndoom", hp: 138, types: ["dark", "fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/houndoom.gif"},
  { name: "Houndoom(Female)", hp: 138, types: ["dark", "fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/houndoom-f.gif"},
  { name: "Kingdra", hp: 166, types: ["water", "dragon"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/kingdra.gif"},
  { name: "Phanpy", hp: 116, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/phanpy.gif"},
  { name: "Donphan", hp: 195, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/donphan.gif"},
  { name: "Donphan(Female)", hp: 195, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/donphan-f.gif"},
  { name: "Porygon2", hp: 137, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/porygon2.gif"},
  { name: "Stantler", hp: 95, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/stantler.gif"},
  { name: "Smeargle", hp: 66, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/smeargle.gif"},
  { name: "Tyrogue", hp: 52, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/tyrogue.gif"},
  { name: "Hitmontop", hp: 97, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/hitmontop.gif"},
  { name: "Smoochum", hp: 64, types: ["ice", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/smoochum.gif"},
  { name: "Elekid", hp: 76, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/elekid.gif"},
  { name: "Magby", hp: 91, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/magby.gif"},
  { name: "Miltank", hp: 138, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/miltank.gif"},
  { name: "Blissey", hp: 255, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/blissey.gif"},
  { name: "Raikou", hp: 168, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/raikou.gif" },
  { name: "Entei", hp: 151, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/entei.gif" },
  { name: "Suicune", hp: 178, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/suicune.gif" },
  { name: "Larvitar", hp: 105, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/larvitar.gif"},
  { name: "Pupitar", hp: 124, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/pupitar.gif"},
  { name: "Tyranitar", hp: 200, types: ["rock", "dark"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/tyranitar.gif"},
  { name: "Lugia", hp: 280, types: ["psychic", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/lugia.gif"},
  { name: "Ho-oh", hp: 206, types: ["fire", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/ho-oh.gif"},
  { name: "Celebi", hp: 183, types: ["grass", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/normal/celebi.gif"},
  { name: "Bulbasaur(Shiny)", hp: 68, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/bulbasaur.gif" },
  { name: "Ivysaur(Shiny)", hp: 97, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ivysaur.gif" },
  { name: "Venusaur(Shiny)", hp: 134, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/venusaur.gif" },
  { name: "Charmander(Shiny)", hp: 65, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/charmander.gif" },
  { name: "Charmeleon(Shiny)", hp: 95, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/charmeleon.gif" },
  { name: "Charizard(Shiny)", hp: 129, types: ["fire", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/charizard.gif" },
  { name: "Squirtle(Shiny)", hp: 61, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/squirtle.gif" },
  { name: "Wartortle(Shiny)", hp: 84, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/wartortle.gif" },
  { name: "Blastoise(Shiny)", hp: 131, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/blastoise.gif" },
  { name: "Caterpie(Shiny)", hp: 55, types: ["bug"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/caterpie.gif"},
  { name: "Metapod(Shiny)", hp: 65, types: ["bug"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/metapod.gif"},
  { name: "Butterfree(Shiny)", hp: 84, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/butterfree.gif"},
  { name: "Weedle(Shiny)", hp: 43, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/weedle.gif"},
  { name: "Kakuna(Shiny)", hp: 51, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/kakuna.gif"},
  { name: "Beedrill(Shiny)", hp: 83, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/beedrill.gif"},
  { name: "Pidgey(Shiny)", hp: 55, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/pidgey.gif"},
  { name: "Pidgeotto(Shiny)", hp: 78, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/pidgeotto.gif"},
  { name: "Pidgeot(Shiny)", hp: 118, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/pidgeot.gif"},
  { name: "Rattata(Shiny)", hp: 51, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/rattata.gif"},
  { name: "Raticate(Shiny)", hp: 78, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/raticate.gif"},
  { name: "Spearow(Shiny)", hp: 58, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/spearow.gif"},
  { name: "Fearow(Shiny)", hp: 106, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/fearow.gif"},
  { name: "Ekans(Shiny)", hp: 61, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ekans.gif"},
  { name: "Arbok(Shiny)", hp: 86, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/arbok.gif"},
  { name: "Pikachu(Shiny)", hp: 56, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/pikachu.gif"},
  { name: "Pikachu(Female-Shiny)", hp: 56, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/pikachu-f.gif"},
  { name: "Raichu(Shiny)", hp: 94, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/raichu.gif"},
  { name: "Raichu(Female-Shiny)", hp: 94, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/raichu-f.gif"},
  { name: "Sandshrew(Shiny)", hp: 61, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/sandshrew.gif"},
  { name: "Sandslash(Shiny)", hp: 90, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/sandslash.gif"},
  { name: "Nidoran(Female)(Shiny)", hp: 64, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidoran-f.gif"},
  { name: "Nidorina(Shiny)", hp: 88, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidorina.gif"},
  { name: "Nidoqueenv", hp: 114, types: ["poison", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidoqueen.gif"},
  { name: "Nidoran(Male)(Shiny)", hp: 62, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidoran-m.gif"},
  { name: "Nidorino(Shiny)", hp: 90, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidorino.gif"},
  { name: "Nidoking(Shiny)", hp: 116, types: ["poison", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidoking.gif"},
  { name: "Clefairy(Shiny)", hp: 81, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/clefairy.gif"},
  { name: "Clefable(Shiny)", hp: 128, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/clefable.gif"},
  { name: "Vulpix(Shiny)", hp: 61, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/vulpix.gif"},
  { name: "Ninetales(Shiny)", hp: 90, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ninetales.gif"},
  { name: "Jigglypuff(Shiny)", hp: 118, types: ["normal", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/jigglypuff.gif" },
  { name: "Wigglytuff(Shiny)", hp: 150, types: ["normal", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/wigglytuff.gif" },
  { name: "Zubat(Shiny)", hp: 53, types: ["poison", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/zubat.gif"},
  { name: "Golbat(Shiny)", hp: 83, types: ["poison", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/golbat.gif"},
  { name: "Oddish(Shiny)", hp: 61, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/oddish.gif"},
  { name: "Gloom(Shiny)", hp: 81, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/gloom.gif"},
  { name: "Vileplume(Shiny)", hp: 102, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/vileplume.gif"},
  { name: "Paras(Shiny)", hp: 54, types: ["bug", "grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/paras.gif"},
  { name: "Parasect(Shiny)", hp: 76, types: ["bug", "grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/parasect.gif"},
  { name: "Venonat(Shiny)", hp: 79, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/venonat.gif"},
  { name: "Venomoth(Shiny)", hp: 101, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/venomoth.gif"},
  { name: "Diglett(Shiny)", hp: 42, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/diglett.gif"},
  { name: "Dugtrio(Shiny)", hp: 66, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/dugtrio.gif"},
  { name: "Meowth(Shiny)", hp: 59, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/meowth.gif" },
  { name: "Persian(Shiny)", hp: 83, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/persian.gif" },
  { name: "Psyduck(Shiny)", hp: 67, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/psyduck.gif" },
  { name: "Golduck(Shiny)", hp: 102, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/golduck.gif" },
  { name: "Mankey(Shiny)", hp: 69, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/mankey.gif"},
  { name: "Primeape(Shiny)", hp: 97, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/primeape.gif"},
  { name: "Growlithe(Shiny)", hp: 66, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/growlithe.gif"},
  { name: "Arcanine(Shiny)", hp: 113, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/arcanine.gif" },
  { name: "Poliwag(Shiny)", hp: 70, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/poliwag.gif"},
  { name: "Poliwhirl(Shiny)", hp: 91, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/poliwhirl.gif"},
  { name: "Poliwrath(Shiny)", hp: 121, types: ["water", "fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/poliwrath.gif"},
  { name: "Abra(Shiny)", hp: 50, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/abra.gif"},
  { name: "Kadabra(Shiny)", hp: 70, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/kadabra.gif" },
  { name: "Alakazam(Shiny)", hp: 90, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/alakazam.gif" },
  { name: "Machop(Shiny)", hp: 85, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/machop.gif" },
  { name: "Machoke(Shiny)", hp: 95, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/machoke.gif" },
  { name: "Machamp(Shiny)", hp: 125, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/machamp.gif" },
  { name: "Bellsprout(Shiny)", hp: 74, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/bellsprout.gif"},
  { name: "Weepinbell(Shiny)", hp: 94, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/weepinbell.gif"},
  { name: "Victreebel(Shiny)", hp: 112, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/victreebel.gif"},
  { name: "Tentacool(Shiny)", hp: 73, types: ["water", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/tentacool.gif"},
  { name: "Tentacruel(Shiny)", hp: 106, types: ["water", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/tentacruel.gif"},
  { name: "Geodude(Shiny)", hp: 75, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/geodude.gif"},
  { name: "Graveler(Shiny)", hp: 88, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/graveler.gif"},
  { name: "Golem(Shiny)", hp: 103, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/golem.gif"},
  { name: "Ponyta(Shiny)", hp: 69, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ponyta.gif"},
  { name: "Rapidash(Shiny)", hp: 87, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/rapidash.gif"},
  { name: "Slowpoke(Shiny)", hp: 124, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/slowpoke.gif"},
  { name: "Slowbro(Shiny)", hp: 140, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/slowbro.gif"},
  { name: "Magnemite(Shiny)", hp: 51, types: ["electric", "steel"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/magnemite.gif"},
  { name: "Magneton(Shiny)", hp: 76, types: ["electric", "steel"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/magneton.gif"},
  { name: "Farfetch'd(Shiny)", hp: 82, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/farfetchd.gif"},
  { name: "Doduo(Shiny)", hp: 67, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/doduo.gif"},
  { name: "Dodrio(Shiny)", hp: 90, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/dodrio.gif"},
  { name: "Seel(Shiny)", hp: 74, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/seel.gif"},
  { name: "Dewgong(Shiny)", hp: 122, types: ["water", "ice"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/dewgong.gif"},
  { name: "Grimer(Shiny)", hp: 108, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/grimer.gif"},
  { name: "Muk(Shiny)", hp: 126, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/muk.gif"},
  { name: "Shellder(Shiny)", hp: 62, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/shellder.gif"},
  { name: "Cloyster(Shiny)", hp: 84, types: ["water", "ice"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/cloyster.gif"},
  { name: "Gastly(Shiny)", hp: 62, types: ["ghost", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/gastly.gif" },
  { name: "Haunter(Shiny)", hp: 79, types: ["ghost", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/haunter.gif" },
  { name: "Gengar(Shiny)", hp: 95, types: ["ghost", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/gengar.gif" },
  { name: "Onix(Shiny)", hp: 64, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/onix.gif"},
  { name: "Drowzee(Shiny)", hp: 74, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/drowzee.gif"},
  { name: "Hypno(Shiny)", hp: 113, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/hypno.gif"},
  { name: "Krabby(Shiny)", hp: 63, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/krabby.gif"},
  { name: "Kingler(Shiny)", hp: 86, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/kingler.gif"},
  { name: "Voltorb(Shiny)", hp: 73, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/voltorb.gif"},
  { name: "Electrode(Shiny)", hp: 92, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/electrode.gif"},
  { name: "Exeggcute(Shiny)", hp: 81, types: ["grass", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/exeggcute.gif"},
  { name: "Exeggutor(Shiny)", hp: 112, types: ["grass", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/exeggutor.gif"},
  { name: "Cubone(Shiny)", hp: 68, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/cubone.gif"},
  { name: "Marowak(Shiny)", hp: 91, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/marowak.gif"},
  { name: "Hitmonlee(Shiny)", hp: 81, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/hitmonlee.gif"},
  { name: "Hitmonchan(Shiny)", hp: 84, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/hitmonchan.gif"},
  { name: "Lickitung(Shiny)", hp: 117, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/lickitung.gif"},
  { name: "Koffing(Shiny)", hp: 64, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/koffing.gif"},
  { name: "Weezing(Shiny)", hp: 88, types: ["poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/weezing.gif"},
  { name: "Rhyhorn(Shiny)", hp: 102, types: ["ground", "rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/rhyhorn.gif"},
  { name: "Rhydon(Shiny)", hp: 134, types: ["ground", "rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/rhydon.gif"},
  { name: "Chansey(Shiny)", hp: 227, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/chansey.gif"},
  { name: "Tangela(Shiny)", hp: 79, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/tangela.gif"},
  { name: "Kangaskhan(Shiny)", hp: 118, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/kangaskhan.gif"},
  { name: "Horsea(Shiny)", hp: 57, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/horsea.gif"},
  { name: "Seadra(Shiny)", hp: 87 ,types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/seadra.gif"},
  { name: "Goldeen(Shiny)", hp: 54, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/goldeen.gif"},
  { name: "Seaking(Shiny)", hp: 97, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/seaking.gif"},
  { name: "Staryu(Shiny)", hp: 64, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/staryu.gif"},
  { name: "Starmie(Shiny)", hp: 84, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/starmie.gif"},
  { name: "Mr. Mime(Shiny)", hp: 69, types: ["psychic", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/mr-mime.gif"},
  { name: "Scyther(Shiny)", hp: 83, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/scyther.gif"},
  { name: "Jynx(Shiny)", hp: 93, types: ["ice", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/jynx.gif"},
  { name: "Electabuzz(Shiny)", hp: 85, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/electabuzz.gif"},
  { name: "Magmar(Shiny)", hp: 90, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/magmar.gif"},
  { name: "Pinsir(Shiny)", hp: 87, types: ["bug"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/pinsir.gif"},
  { name: "Tauros(Shiny)", hp: 103, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/tauros.gif"},
  { name: "Magikarp(Shiny)", hp: 45, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/magikarp.gif"},
  { name: "Magikarp(Female-Shiny)", hp: 45, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/magikarp-f.gif"},
  { name: "Gyrados(Shiny)", hp: 123, types: ["water", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/gyarados.gif" },
  { name: "Gyrados(Female-Shiny)", hp: 123, types: ["water", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/gyarados-f.gif" },
  { name: "Lapras(Shiny)", hp: 150, types: ["water", "ice"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/lapras.gif"},
  { name: "Ditto(Shiny)", hp: 79, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ditto.gif"},
  { name: "Eevee(Shiny)", hp: 86, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/eevee.gif" },
  { name: "Eevee(Female-Shiny)", hp: 86, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/eevee-f.gif" },
  { name: "Vaporeon(Shiny)", hp: 135, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/vaporeon.gif"},
  { name: "Jolteon(Shiny)", hp: 86, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/jolteon.gif"},
  { name: "Flareon(Shiny)", hp: 99, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/flareon.gif"},
  { name: "Porygon(Shiny)", hp: 94, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/porygon.gif"},
  { name: "Omanyte(Shiny)", hp: 70, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/omanyte.gif"},
  { name: "Omastar(Shiny)", hp: 100, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/omastar.gif"},
  { name: "Kabuto(Shiny)", hp: 62, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/kabuto.gif"},
  { name: "Kabutops(Shiny)", hp: 90, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/kabutops.gif"},
  { name: "Aerodactyl(Shiny)", hp: 102, types: ["rock", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/aerodactyl.gif"},
  { name: "Snorlax(Shiny)", hp: 182, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/snorlax.gif" },
  { name: "Articuno(Shiny)", hp: 124, types: ["ice", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/articuno.gif"},
  { name: "Zapdos(Shiny)", hp: 121, types: ["electric", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/zapdos.gif"},
  { name: "Moltres(Shiny)", hp: 123, types: ["fire", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/moltres.gif"},
  { name: "Dratini(Shiny)", hp: 76, types: ["dragon"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/dratini.gif"},
  { name: "Dragonair(Shiny)", hp: 94, types: ["dragon"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/dragonair.gif"},
  { name: "Dragonite(Shiny)", hp: 118, types: ["dragon", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/dragonite.gif" },
  { name: "Mewtwo(Shiny)", hp: 136, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/mewtwo.gif" },
  { name: "Mew(Shiny)", hp: 134, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/mew.gif" },
  { name: "Chikorita(Shiny)", hp: 70, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/chikorita.gif"},
  { name: "Bayleef(Shiny)", hp: 92, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/bayleef.gif" },
  { name: "Meganium(Shiny)", hp: 112, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/meganium.gif" },
  { name: "Cyndaquil(Shiny)", hp: 61, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/cyndaquil.gif" },
  { name: "Quilava(Shiny)", hp: 91, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/quilava.gif" },
  { name: "Typhlosion(Shiny)", hp: 108, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/typhlosion.gif" },
  { name: "Totodile(Shiny)", hp: 67, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/totodile.gif" },
  { name: "Croconaw(Shiny)", hp: 97, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/croconaw.gif" },
  { name: "Feraligatr(Shiny)", hp: 119, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/feraligatr.gif"},
  { name: "Sentret(Shiny)", hp: 66, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/sentret.gif"},
  { name: "Furret(Shiny)", hp: 100, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/furret.gif"},
  { name: "Hoothoot(Shiny)", hp: 74, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/hoothoot.gif"},
  { name: "Noctowl(Shiny)", hp: 124, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/noctowl.gif"},
  { name: "Ledyba(Shiny)", hp: 68, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ledyba.gif"},
  { name: "Ledian(Shiny)", hp: 86, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ledian.gif"},
  { name: "Spinarak(Shiny)", hp: 78, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/spinarak.gif"},
  { name: "Ariados(Shiny)", hp: 87, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ariados.gif"},
  { name: "Crobat(Shiny)", hp: 105, types: ["poison", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/crobat.gif"},
  { name: "Chinchou(Shiny)", hp: 81, types: ["water", "electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/chinchou.gif"},
  { name: "Lanturn(Shiny)", hp: 133, types: ["water", "electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/lanturn.gif"},
  { name: "Pichu(Shiny)", hp: 53, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/pichu.gif"},
  { name: "Cleffa(Shiny)", hp: 66, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/cleffa.gif"},
  { name: "Igglybuff(Shiny)", hp: 99, types: ["normal", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/igglybuff.gif"},
  { name: "Togepi(Shiny)", hp: 63, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/togepi.gif"},
  { name: "Togetic(Shiny)", hp: 87, types: ["fairy", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/togetic.gif"},
  { name: "Natu(Shiny)", hp: 54, types: ["psychic", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/natu.gif"},
  { name: "Xatu(Shiny)", hp: 92, types: ["psychic", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/xatu.gif"},
  { name: "Mareep(Shiny)", hp: 87, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/mareep.gif"},
  { name: "Flaaffy(Shiny)", hp: 103, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/flaaffy.gif"},
  { name: "Ampharos(Shiny)", hp: 124, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ampharos.gif"},
  { name: "Bellossom(Shiny)", hp: 106, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/bellossom.gif"},
  { name: "Marill(Shiny)", hp: 75, types: ["water", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/marill.gif"},
  { name: "Azumarill(Shiny)", hp: 108, types: ["water", "fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/azumarill.gif"},
  { name: "Sudowoodo(Shiny)", hp: 105, types: ["rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/sudowoodo.gif"},
  { name: "Sudowoodo(Female-Shiny)", hp: 105, types: ["rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/sudowoodo-f.gif"},
  { name: "Politoed(Shiny)", hp: 124, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/politoed.gif"},
  { name: "Hoppip(Shiny)", hp: 51, types: ["grass", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/hoppip.gif"},
  { name: "Skiploom(Shiny)", hp: 77, types: ["grass", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/skiploom.gif"},
  { name: "Jumpluff(Shiny)", hp: 99, types: ["grass", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/jumpluff.gif"},
  { name: "Aipom(Shiny)", hp: 63, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/aipom.gif" },
  { name: "Aipom(Female-Shiny)", hp: 63, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/aipom-f.gif" },
  { name: "Sunkern(Shiny)", hp: 47, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/sunkern.gif" },
  { name: "Sunflora(Shiny)", hp: 97, types: ["grass"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/sunflora.gif"},
  { name: "Yanma(Shiny)", hp: 95, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/yanma.gif"},
  { name: "Wooper(Shiny)", hp: 60, types: ["water", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/wooper.gif"},
  { name: "Quagsire(Shiny)", hp: 102, types: ["water", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/quagsire.gif"},
  { name: "Espeon(Shiny)", hp: 99, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/espeon.gif"},
  { name: "Umbreon(Shiny)", hp: 130, types: ["dark"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/umbreon.gif"},
  { name: "Murkrow(Shiny)", hp: 85, types: ["dark", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/murkrow.gif"},
  { name: "Murkrow(Female-Shiny)", hp: 85, types: ["dark", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/murkrow-f.gif"},
  { name: "Slowking(Shiny)", hp: 157, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/slowking.gif"},
  { name: "Misdreavus(Shiny)", hp: 66, types: ["ghost"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/misdreavus.gif"},
  { name: "Unown-A(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-a.gif"},
  { name: "Unown-B(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-b.gif"},
  { name: "Unown-C(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-c.gif"},
  { name: "Unown-D(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-d.gif"},
  { name: "Unown-E(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-e.gif"},
  { name: "Unown-F(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-f.gif"},
  { name: "Unown-(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-g.gif"},
  { name: "Unown-H(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-h.gif"},
  { name: "Unown-I(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-i.gif"},
  { name: "Unown-J(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-j.gif"},
  { name: "Unown-K(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-k.gif"},
  { name: "Unown-L(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-l.gif"},
  { name: "Unown-M(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-m.gif"},
  { name: "Unown-N(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-n.gif"},
  { name: "Unown-O(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-o.gif"},
  { name: "Unown-P(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-p.gif"},
  { name: "Unown-Q(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-q.gif"},
  { name: "Unown-R(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-r.gif"},
  { name: "Unown-S(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-s.gif"},
  { name: "Unown-T(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-t.gif"},
  { name: "Unown-U(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-u.gif"},
  { name: "Unown-V(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-v.gif"},
  { name: "Unown-W(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-w.gif"},
  { name: "Unown-X(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-x.gif"},
  { name: "Unown-Y(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-y.gif"},
  { name: "Unown-Z(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-z.gif"},
  { name: "Unown-!(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-em.gif"},
  { name: "Unown-?(Shiny)", hp: 64, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown-qm.gif"},
  { name:  "Wobbuffet(Shiny)", hp: 202, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/wobbuffet.gif"},
  { name:  "Wobbuffet(Female-Shiny)", hp: 202, types: ["psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/wobbuffet-f.gif"},
  { name: "Girafarig(Shiny)", hp: 101, types: ["normal", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/girafarig.gif" },
  { name: "Girafarig(Female-Shiny)", hp: 101, types: ["normal", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/girafarig-f.gif" },
  { name: "Pineco(Shiny)", hp: 57, types: ["bug"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/pineco.gif" },
  { name: "Forretress(Shiny)", hp: 100, types: ["bug", "steel"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/forretress.gif" },
  { name: "Dunsparce(Shiny)", hp: 123, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/dunsparce.gif" },
  { name: "Gligar(Shiny)", hp: 80, types: ["ground", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/gligar.gif"},
  { name: "Gligar(Female-Shiny)", hp: 80, types: ["ground", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/gligar-f.gif"},
  { name: "Steelix(Shiny)", hp: 145, types: ["steel", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/steelix.gif"},
  { name: "Steelix(Female-Shiny)", hp: 145, types: ["steel", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/steelix-f.gif"},
  { name: "Snubbull(Shiny)", hp: 78, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/snubbull.gif"},
  { name: "Granbull(Shiny)", hp: 122, types: ["fairy"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/granbull.gif" },
  { name: "Qwilfish(Shiny)", hp: 75, types: ["water", "poison"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/quilfish.gif"},
  { name: "Scizor(Shiny)", hp: 143, types: ["bug", "steel"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/scizor.gif"},
  { name: "Scizor(Female-Shiny)", hp: 143, types: ["bug", "steel"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/scizor-f.gif"},
  { name: "Shuckle(Shiny)", hp: 119, types: ["bug", "rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/shuckle.gif"},
  { name: "Heracross(Shiny)", hp: 129, types: ["bug", "fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/heracross.gif"},
  { name: "Heracross(Female-Shiny)", hp: 129, types: ["bug", "fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/heracross-f.gif"},
  { name: "Sneasel(Shiny)", hp: 79, types: ["dark", "ice"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/sneasel.gif"},
  { name: "Sneasel(Female-Shiny)", hp: 79, types: ["dark", "ice"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/sneasel-f.gif"},
  { name: "Teddiursa(Shiny)", hp: 73, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/teddiursa.gif"},
  { name: "Ursaring(Shiny)", hp: 116, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ursaring.gif" },
  { name: "Slugma(Shiny)", hp: 75, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/slugma.gif" },
  { name: "Magcargo(Shiny)", hp: 125, types: ["fire", "rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/macargo.gif" },
  { name: "Swinub(Shiny)", hp: 85, types: ["ice", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/swinub.gif"},
  { name: "Piloswine(Shiny)", hp: 135, types: ["ice", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/piloswine.gif"},
  { name: "Corsola(Shiny)", hp: 90, types: ["water", "rock"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/corsola.gif"},
  { name: "Remoraid(Shiny)", hp: 65, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/remoraid.gif"},
  { name: "Octillery(Shiny)", hp: 122, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/octillery.gif"},
  { name: "Delibird(Shiny)", hp: 77, types: ["ice", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/delibird.gif"},
  { name: "Mantine(Shiny)", hp: 124, types: ["water", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/mantine.gif"},
  { name: "Skarmory(Shiny)", hp: 132, types: ["steel", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/skarmory.gif"},
  { name: "Houndour(Shiny)", hp: 67, types: ["dark", "fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/houndour.gif"},
  { name: "Houndoom(Shiny)", hp: 138, types: ["dark", "fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/houndoom.gif"},
  { name: "Houndoom(Female-Shiny)", hp: 138, types: ["dark", "fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/houndoom-f.gif"},
  { name: "Kingdra(Shiny)", hp: 166, types: ["water", "dragon"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/kingdra.gif"},
  { name: "Phanpy(Shiny)", hp: 116, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/phanpy.gif"},
  { name: "Donphan(Shiny)", hp: 195, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/donphan.gif"},
  { name: "Donphan(Female-Shiny)", hp: 195, types: ["ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/donphan-f.gif"},
  { name: "Porygon2(Shiny)", hp: 137, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/porygon2.gif"},
  { name: "Stantler(Shiny)", hp: 95, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/stantler.gif"},
  { name: "Smeargle(Shiny)", hp: 66, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/smeargle.gif"},
  { name: "Tyrogue(Shiny)", hp: 52, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/tyrogue.gif"},
  { name: "Hitmontop(Shiny)", hp: 97, types: ["fighting"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/hitmontop.gif"},
  { name: "Smoochum(Shiny)", hp: 64, types: ["ice", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/smoochum.gif"},
  { name: "Elekid(Shiny)", hp: 76, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/elekid.gif"},
  { name: "Magby(Shiny)", hp: 91, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/magby.gif"},
  { name: "Miltank(Shiny)", hp: 138, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/miltank.gif"},
  { name: "Blissey(Shiny)", hp: 255, types: ["normal"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/blissey.gif"},
  { name: "Raikou(Shiny)", hp: 168, types: ["electric"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/raikou.gif" },
  { name: "Entei(Shiny)", hp: 151, types: ["fire"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/entei.gif" },
  { name: "Suicune(Shiny)", hp: 178, types: ["water"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/suicune.gif" },
  { name: "Larvitar(Shiny)", hp: 105, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/larvitar.gif"},
  { name: "Pupitar(Shiny)", hp: 124, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/pupitar.gif"},
  { name: "Tyranitar(Shiny)", hp: 200, types: ["rock", "dark"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/tyranitar.gif"},
  { name: "Lugia(Shiny)", hp: 280, types: ["psychic", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/lugia.gif"},
  { name: "Ho-oh(Shiny)", hp: 206, types: ["fire", "flying"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/ho-oh.gif"},
  { name: "Celebi(Shiny)", hp: 183, types: ["grass", "psychic"], image: "https://img.pokemondb.net/sprites/black-white/anim/shiny/celebi.gif"},
]; 

// DOM Elements
const pokemon1Element = document.getElementById("pokemon1");
const pokemon2Element = document.getElementById("pokemon2");
const startBattleButton = document.getElementById("start-battle");
const battleLog = document.getElementById("battle-log");

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

function displayPokemon(pokemon, element) {
  const img = element.querySelector(".pokemon-image");
  const name = element.querySelector(".pokemon-name");
  const types = element.querySelector(".pokemon-types");
  const hp = element.querySelector(".pokemon-hp");
  
  img.src = pokemon.image;
  img.alt = pokemon.name;
  name.textContent = pokemon.name;
  hp.textContent = `HP: ${pokemon.hp}`;
  
  // Clear previous types
  types.innerHTML = "";
  
  // Add new type badges
  pokemon.types.forEach(type => {
    const typeBadge = document.createElement("span");
    typeBadge.className = `type-badge type-${type}`;
    typeBadge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    types.appendChild(typeBadge);
  });
  
  // Remove all animation classes
  element.classList.remove("attack-animation", "damage-animation", "victory-animation", "faint-animation");
}

function simulateBattle(pokemon1, pokemon2) {
  // Reset battle log
  battleLog.innerHTML = "";
  
  // Disable start button
  startBattleButton.disabled = true;
  
  // Reset Pokémon display
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
    
    // Calculate damage with type effectiveness
    const baseDamage = Math.floor(Math.random() * 10) + 1;
    const effectiveness = calculateEffectiveness(attacker.types, defender.types);
    const damage = Math.max(1, Math.floor(baseDamage * effectiveness));
    
    defender.hp -= damage;
    
    // Update HP display
    defenderElement.querySelector(".pokemon-hp").textContent = `HP: ${Math.max(0, defender.hp)}`;
    
    // Log the attack
    let logMessage = `${attacker.name} attacks! `;
    logMessage += getEffectivenessMessage(effectiveness);
    logMessage += ` ${defender.name} takes ${damage} damage! (${defender.hp > 0 ? defender.hp : 0} HP left)<br>`;
    battleLog.innerHTML += logMessage;
    battleLog.scrollTop = battleLog.scrollHeight;
    
    // Animations
    attackerElement.classList.add("attack-animation");
    defenderElement.classList.add("damage-animation");
    
    // Remove animations after they complete
    setTimeout(() => {
      attackerElement.classList.remove("attack-animation");
      defenderElement.classList.remove("damage-animation");
      
      // Check if defender fainted
      if (defender.hp <= 0) {
        defenderElement.classList.add("faint-animation");
        endBattle(pokemon1, pokemon2);
      }
    }, 500);
    
    // Switch roles for next turn
    [attacker, defender] = [defender, attacker];
    [attackerElement, defenderElement] = [defenderElement, attackerElement];
    
  }, 1500); // 1.5 seconds between turns
}

function endBattle(pokemon1, pokemon2) {
  clearInterval(battleInterval);
  battleInterval = null;
  
  const winner = pokemon1.hp > 0 ? pokemon1 : pokemon2;
  const winnerElement = winner === pokemon1 ? pokemon1Element : pokemon2Element;
  
  battleLog.innerHTML += `<strong>${winner.name} wins the battle!</strong><br>`;
  battleLog.scrollTop = battleLog.scrollHeight;
  
  winnerElement.classList.add("victory-animation");
  
  // Re-enable start button
  startBattleButton.disabled = false;
}
// Add this to your existing JavaScript code, right before the event listeners section

// How to Play Modal functionality
const howToPlayBtn = document.getElementById("how-to-play");
const modal = document.getElementById("how-to-play-modal");
const span = document.getElementsByClassName("close")[0];

howToPlayBtn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// The rest of your existing JavaScript code remains the same...
// Event listeners
startBattleButton.addEventListener("click", () => {
  // Stop any ongoing battle
  if (battleInterval) {
    clearInterval(battleInterval);
    battleInterval = null;
  }
  
  // Get new Pokémon
  const [pokemon1, pokemon2] = getTwoUniquePokemon();
  
  // Reset their HP
  const originalPokemon1 = pokemonList.find(p => p.name === pokemon1.name);
  const originalPokemon2 = pokemonList.find(p => p.name === pokemon2.name);
  
  currentPokemon1 = { ...originalPokemon1 };
  currentPokemon2 = { ...originalPokemon2 };
  
  // Start battle
  simulateBattle(currentPokemon1, currentPokemon2);
});

// Initialize with random Pokémon
const [initialPokemon1, initialPokemon2] = getTwoUniquePokemon();
currentPokemon1 = { ...initialPokemon1 };
currentPokemon2 = { ...initialPokemon2 };
displayPokemon(currentPokemon1, pokemon1Element);
displayPokemon(currentPokemon2, pokemon2Element);
