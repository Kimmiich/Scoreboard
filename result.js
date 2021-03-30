
//Hämta och skapa fält och knapp för att lägga till spelare
const addingFormPlayer = document.getElementById("addingFormPlayer");
addingFormPlayer.insertAdjacentHTML("afterbegin", `<input type='text' placeholder='New player' id='input'><button id='addBtn'>+ ADD</button>`)
const input = document.getElementById("input");

//Hämta och skapa ul för spelare
const main = document.getElementById("main");
main.insertAdjacentHTML("beforeend", "<ul id='playerList'></ul>")
const playerList = document.getElementById("playerList");

//Function för att skriva ut spelare
function printPlayers() {
    playerList.innerHTML = "";

    if (localStorage.getItem("localPlayers")) {
        getPlayers = JSON.parse(localStorage.getItem("localPlayers"))
        sortByScore(getPlayers);

        for (let player in getPlayers) {
            playerList.insertAdjacentHTML("beforeend", `<li id="${player}"><h2>${getPlayers[player].uName}</h2><h3>Score: ${getPlayers[player].score}</h3>
            <button class="plusBtn">+</button>
            <button class="minusBtn">-</button></li>`)
        };
        localStorage.setItem("localPlayers", JSON.stringify(getPlayers));
    };
};

//Event listener som lyssnar efter evt.target 
main.addEventListener("click", (evt) => {
    let doPlayer = evt.target.parentNode.id;
    let doScore = evt.target.classList.value;

    let playersArray = JSON.parse(localStorage.getItem("localPlayers"))
    //Om evt target stämmer med variabeln plussa score, annars minska score
    if (doScore == "plusBtn"){
        playersArray[doPlayer].score ++
    } else if (doScore =="minusBtn") {
        playersArray[doPlayer].score --
    };

    localStorage.setItem("localPlayers", JSON.stringify(playersArray));

    //Printa ut den nya listan
    printPlayers();
});

//Event listener för att lägga till användare
document.getElementById("addBtn").addEventListener("click", () => {
    addToLocal();
    printPlayers();
});

//Funktion för att lägga till spelare
function addToLocal() {
    let newPlayer = {uName: input.value, score: 0}

    let getSavedArray = JSON.parse(localStorage.getItem("localPlayers"));
    getSavedArray.push(newPlayer);
    localStorage.setItem("localPlayers", JSON.stringify(getSavedArray));
    printPlayers();
};

//Funktion som sorterar spelare efter score
function sortByScore(players){
    players.sort((a, b) => {
        if (a.score > b.score){return -1};
    });
};

// Initiera local om den är tom 
if (localStorage.getItem("localPlayers") == null) {
    let players = [{uName: "Kimmie", score: 0},
    {uName: "Mathilda", score: 0}];
    localStorage.setItem("localPlayers", JSON.stringify(players));
};

//Kör sidan
    printPlayers();


