# PokeGuesser - PokeAPI utilizing guessing game  

PokeGuesser is a game in the spirit of "Who's That Pokemon"! It utilizes PokeAPI's sprites as well as Pokemon info to make a comprehensive hint list and blurred image / silhouette! I've had a lot of fun making this project for Hack Club's 2025 "Summer of Making", and this'll be the first project I've completed.  

PokeGuesser was intended for 16:9 aspect ratio screens, but may be updated in the future to accomodate for phones and tablets / non-standard devices. It should still work to a varying degree in Landscape Mode on most tablets (especially iPads).

---  

## PokeGuesser has features such as  

- Difficulty support

- Dynamic hints based on HP, type, and flavor text  

- Images and sprites

- Cries / audio files

- Answer validity / typo checking

- Generation selection

- CSS animations and beautiful layout  

- Theming and customization

- Score persistance

and more to come!

Gameplay focuses on guessing Pokemon by either the name of the specific Pokemon or the name of the Pokemon species. Each guess is checked against a list of Pokemon and Pokemon species to ensure that any accidental inputs aren't registered. As well, indication of Pokemon input validity is displayed on the screen - if it's not a valid Pokemon, "Not a valid Pokemon." will be displayed on screen (makes sense). However, if it's valid but incorrect, "Nope - try again!" is displayed. Finally, if it's valid and correct, the Pokemon's picture is resaturated, unblurred, and its name pops up in front of its picture!  

PokeGuesser is powered by JQuery and Fetch API / PokeAPI at its core!
