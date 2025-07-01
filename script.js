var score = 0;
var pokemon;
var pokespecies;
var allpokemonjson;
var allpokemon;
var allspeciesjson;
var allspecies;
var pokemontotalamount = 1025;
var flavortext;
var pokestat;
var alltimescore;
var lastguess = 4;
var validinput = false;
var busy = false;
var bluramt = lastguess * 4;
var attainablescore = 1000;
var guess = 1;
var randomPokemonId;
var resettime = false;

const generations = [151, 251, 386, 493, 649, 721, 809, 905, 1025];
const backgroundurls = [
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/3760c346fc12d17ee6f29b0b7eb0dfdc738f9c71_a1tkoxq.jpeg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/913d204230dcdcb59fb9041d35bd22f1b73a78fc_7dcs9kd.jpeg",    
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/58ed458de7e351c0fcc9a8eeae11d8ca79efe9ff_q87wt7i.jpeg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/e1b70eb3d2324688695605ff4fa6e2e314673b50_saton55.jpeg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/8b223eab074beeea6000b28a2af806e70a4b9b98_lcsdtfh.jpeg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/d0133d6e2e32d46c1feb3f00d54effa6ae0a795a_du6pij3.jpeg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/588aa88cb08c55e794319298bed1c43d8cc53541_gx5ynz3.jpeg",
    "https://hc-cdn.hel1.your-objectstorage.com/s/v3/aae41fdb75e78c617542cd8936c4f837f41d0005_mvyzg0o.jpeg"
];

$("#pokeimage").css("filter", "contrast(0%) brightness(0%) blur(" + bluramt + "px)")
$("#play").click(function() {
    $("#partitioncontainer").css("transform", "translateY(-90vh)"); 
});

$("#faqbutton").click(function() {
    $("#partitioncontainer").css("transform", "translateY(-180vh)");
});

$("#themebutton").click(function() {
    $("#partitioncontainer").css("transform", "translateY(-270vh)");
});

$(".back").click(function() {
    $("#partitioncontainer").css("transform", "translateY(0vh)");
});

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loadPokemon() {
    $("#pokeimage").css("filter", "contrast(0%) brightness(0%) blur(" + bluramt + "px)");
    randomPokemonId = randomNumber(1, pokemontotalamount);
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

    $("#pokeimage").attr("src", pokemon.sprites.front_default);
}

function tryAgain() {
    guess = 1;
    bluramt = lastguess * 4; 
    attainablescore = 1000;
    loadPokemon();
    $("#hint1").text("HP Stat: ");
    $("#hint2").text("Flavor text: ");
    $("#hint3").text("Type: ");
    $("#pokeidentifier").css("visibility", "hidden");
}

$("#apply").click(function () {
    tryAgain();
})
 
$("#pokeimage").click(async function () {
    $("#pokemoncry").attr("src",pokemon.cries.latest);
    $("#pokemoncry").prop("volume", 0.4);
    $("#pokemoncry")[0].play();
})

$("#giveupbutton").click(function() { 
    resettime = true;
    $("#pokeimage").css("filter", "unset");
    $("#pokeidentifier").text("It's " + pokemon.name + "!");
    $("#pokeidentifier").css("visibility", "visible");
    $("#pokeidentifier").animate({
        opacity: "0"
    }, 3000, function () {
        $("#pokeidentifier").css("opacity", "0.7");
        $("#pokeidentifier").css("visibility", "hidden"); 
        busy = false;
    })
})

$("#guessbutton").click(function() {
    validinput = false;
    var inputval = $("#guessinput").val();
    if (!busy) {
        if (!resettime) {
            for (let i = 0; i < allpokemon.results.length; i++) {
                if (allpokemon.results[i].name === inputval.toString().toLowerCase()) {
                    validinput = true;
                    break;
                }
            }
            for (let i = 0; i < allspecies.results.length; i++) {
                if (allspecies.results[i].name === inputval.toString().toLowerCase()) {
                    validinput = true;
                    break;
                }
            }
            if (validinput) {
                if (inputval.toString().toLowerCase() === pokemon.name || inputval.toString().toLowerCase() === pokemon.species.name) {
                    $("#pointslabel").animate({
                        fontSize:"20",
                    }, 200, function () { 
                        $("#pointslabel").animate({
                            fontSize:"16",
                        }, 200) 
                    });  
                    console.log("correct!");
                    score += attainablescore;
                    localStorage.setItem("score", Number(alltimescore) + attainablescore);
                    $("#atslabel").text("Your all-time / total score: " + alltimescore);
                    $("#pointslabel").text("Points: " + score);
                    $("#pokeimage").css("filter", "unset");
                    $("#pokeidentifier").text("It's " + pokemon.name + "!");
                    $("#pokeidentifier").css("visibility", "visible");
                    $("#pokeidentifier").animate({
                        opacity: "0"
                    }, 3000, function () {
                        $("#pokeidentifier").css("opacity", "0.7");
                        $("#pokeidentifier").css("visibility", "hidden"); 
                        busy = false;
                    })
                    resettime = true;
                } else {
                    attainablescore -= 125;
                    if (!bluramt == 0) {
                        bluramt -= 4;
                    }
                    $("#pokeimage").css("filter", "contrast(0%) brightness(0%) blur(" + bluramt + "px)");
                    if (guess != lastguess) {
                        console.log("wrong and not last")
                        busy = true;
                        $("#pokeidentifier").text("Nope - try again!");
                        $("#pokeidentifier").css("visibility", "visible");
                        $("#pokeidentifier").css("opacity", "0.7");
                        $("#pokeidentifier").animate({
                            opacity: "0"
                        }, 2000, function () {
                            $("#pokeidentifier").css("opacity", "0.7");
                            $("#pokeidentifier").css("visibility", "hidden");
                            busy = false;
                        })
                    }
                    if (guess === lastguess) {
                        $("#pokeimage").css("filter", "unset");
                        resettime = true;
                        $("#pokeidentifier").text("It's " + pokemon.name + "!");
                        $("#pokeidentifier").css("visibility", "visible");
                    } else if (guess === 1) {
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
                    } 
                }
                guess += 1;
            }
            else { 
                busy = true; 
                $("#pokeidentifier").text("Not a valid Pokemon."); 
                $("#pokeidentifier").css("visibility", "visible");
                $("#pokeidentifier").animate({
                    opacity: "0"
                }, 2000, function () {
                    $("#pokeidentifier").css("opacity", "0.7");
                    $("#pokeidentifier").css("visibility", "hidden"); 
                    busy = false;
                })
            }

        } else {
            resettime = false;
            tryAgain();
        }
    }
});

async function getAllPokemon() {
    allpokemonjson = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000`);
    allspeciesjson = await fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=100000`)
    if (!allpokemonjson.ok || !allspeciesjson.ok) {
        throw new Error(`response status: ${allpokemonjson.status}, ${allspeciesjson.status}`);
    }
    allpokemon = await allpokemonjson.json();
    allspecies = await allspeciesjson.json();
    console.log(allpokemon);
    console.log(allspecies);
}

function updateBGColor() {
    $("#content").css("background","repeating-conic-gradient(" + $("#primarycolor").val() +" 0% 25%, " + $("#secondarycolor").val() + " 25% 50%)");
    $("#content").css("background-size","100px 100px");
}

$(".colorchange").change(function () {
    localStorage.setItem("primarycolor",$("#primarycolor").val());
    localStorage.setItem("secondarycolor",$("#secondarycolor").val());
    updateBGColor(); 
});

$("#imagetheme").change(function () {
    $("#game").css("--url", "url("+backgroundurls[$("#imagetheme").val()]+")");
    console.log($("#imagetheme").val());
    localStorage.setItem("tilingimg", $("#imagetheme").val())
});  

$("#generation").change(function () { 
    pokemontotalamount = generations[$(this).val() - 1];
    console.log(pokemontotalamount);
});

$("#difficulty").change(function () {  
    if ($(this).val() == "easy") {
        lastguess = 5; 
    } else if ($(this).val() == "medium") { 
        lastguess = 4; 
    } else if ($(this).val() == "hard") {
        lastguess = 3;
    } else if ($(this).val() == "oneshot") { 
        lastguess = 2; 
    }  
    bluramt = lastguess * 4;
    $("#pokeimage").css("filter", "contrast(0%) brightness(0%) blur(" + bluramt + "px)");
})

function loadThemePrefs() {
    if (localStorage.getItem("primarycolor") !== null || localStorage.getItem("secondarycolor") !== null) {
        $("#content").css("background","repeating-conic-gradient(" + localStorage.getItem("primarycolor") +" 0% 25%, " + localStorage.getItem("secondarycolor") + " 25% 50%)");
        $("#content").css("background-size","100px 100px");
    }
    if (localStorage.getItem("tilingimg") !== null) {
        $("#game").css("--url", "url("+backgroundurls[Number(localStorage.getItem("tilingimg"))]+")");
        $("#imagetheme").children().eq(Number(localStorage.getItem("tilingimg"))).attr('selected', 'selected');
    } else {
        $("#imagetheme").children().eq(3).attr('selected', 'selected');
    }
}

if (localStorage.getItem("score") !== null) {
    alltimescore = localStorage.getItem("score");
    console.log("score found! " + Number(alltimescore));
} else {
    localStorage.setItem("score", "0");
}

$("#atslabel").text("Your all-time / total score: " + alltimescore);

loadThemePrefs();
getAllPokemon();
loadPokemon();