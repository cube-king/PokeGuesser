var score = 0;
var pokemon;
var pokespecies;
var flavortext;
var pokestat;
var bluramt = 16;
var guess = 1;
var randomPokemonId;
var resettime = false;
$("#pokeimage").css("filter","contrast(0%) brightness(0%) blur(" + bluramt + "px)")
$("#play").click(function () { 
    $("#test").css("transform", "translateY(-90vh)");
});

$("#faqbutton").click(function () { 
    $("#test").css("transform", "translateY(-180vh)");
});

$("#back").click(function () { 
    $("#test").css("transform", "translateY(0vh)");
}); 

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loadPokemon() { 
    $("#pokeimage").css("filter","contrast(0%) brightness(0%) blur(" + bluramt + "px)");
    randomPokemonId = randomNumber(1,1025);
    var pokejson = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
    if (!pokejson.ok) {
        throw new Error(`response status: ${pokejson.status}`);
    }
    
    pokemon = await pokejson.json();
    console.log(pokemon);

    var pokespeciesjson = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.species.name}`);
    if (!pokespeciesjson.ok) {
        throw new Error(`response status: ${pokespeciesjson.status}`);
    }
    pokespecies = await pokespeciesjson.json();
    console.log(pokespecies)

    $("#pokeimage").attr("src",pokemon.sprites.front_default);
}

function tryAgain() { 
    guess = 0;
    bluramt = 16;
    attainablescore = 1000;
    loadPokemon();
    $("#hint1").text("HP Stat: ");
    $("#hint2").text("Characteristics: ");
    $("#hint3").text("Type: ");
}

$("#guessbutton").click(async function () {
    var inputval = $("#guessinput").val();
    var attainablescore = 1000;
    if (!resettime) {
        if (inputval.toString().toLowerCase() === pokemon.name || inputval.toString().toLowerCase() === pokemon.species.name) {
            score += attainablescore;
            guess = 1;
            bluramt = 16;
            $("#pokeimage").css("filter","unset");
            resettime = true;
        } 
        else { 
            if (!bluramt == 0) {
                bluramt -= 4; 
            }
            $("#pokeimage").css("filter","contrast(0%) brightness(0%) blur(" + bluramt + "px)");
            if (guess === 1) {
                for (let i = 0; i < pokemon.stats.length; i++) {
                    if (pokemon.stats[i].stat.name === "hp") {
                        console.log("found hp stat");
                        console.log(pokemon.stats[i])
                        var pokehp = pokemon.stats[i].base_stat;
                        $("#hint1").text("HP Stat: " + pokehp); 
                    } else {
                        console.log("no hp stat");
                    }
                }
            } else if (guess === 2) { 
                for (let i = 0; i < pokespecies.flavor_text_entries.length; i++) {
                    if (pokespecies.flavor_text_entries[i].language.name === "en" && !(pokespecies.flavor_text_entries[i].flavor_text).toLowerCase().includes(pokespecies.name)) {
                        flavortext = pokespecies.flavor_text_entries[i].flavor_text.replace("\f", " ");
                        break;
                    } else {
                        console.log("desc had name");
                    }
                }
            $("#hint2").text("Flavor text: " + flavortext);
            } else if (guess === 3) {
                if (pokemon.types && pokemon.types.length > 0) {
                    $("#hint3").text("Type: " + pokemon.types[0].type.name);
                } else {
                    $("#hint3").text("Type: Unknown"); 
                }
                $("#hint3").text("Type: " + pokemon.types[0].type.name);
            } else if (guess === 4) {
                $("#pokeimage").css("filter","unset");
                resettime = true;
            }
        }
    } else {
        resettime = false;
        tryAgain();
    }
    guess += 1;
});



loadPokemon(); 