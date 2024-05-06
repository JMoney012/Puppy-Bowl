// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2404-FTB-ET-WEB-FT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;


/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch (API_URL);
    const result = await response.json();
        console.log(result);
    return result.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};



/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    console.log(API_URL + "/" + playerId)
    const response = await fetch (API_URL + "/" + playerId);
    return await response.json();
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

// fetchSinglePlayer(4208).then((response) => {
//   console.log(response.data.player);
// });



// /**
//  * Adds a new player to the roster via the API.
//  * @param {Object} playerObj the player to add
//  * @returns {Object} the player returned by the API
//  */
// const addNewPlayer = async (playerObj) => {
//   try {
//     // TODO
//   } catch (err) {
//     console.error("Oops, something went wrong with adding that player!", err);
//   }
// };



// /**
//  * Removes a player from the roster via the API.
//  * @param {number} playerId the ID of the player to remove
//  */
// const removePlayer = async (playerId) => {
//   try {
//     // TODO
//   } catch (err) {
//     console.error(
//       `Whoops, trouble removing player #${playerId} from the roster!`,
//       err
//     );
//   }
// };



/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
function renderAllPlayers (playerList) {
  const wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = "";
  fetchAllPlayers().then((response) => {
      response.forEach((i) => {
          renderSinglePlayer(i);
      })
  })
};



/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
function renderSinglePlayer (player) {
  const wrapper = document.getElementById("wrapper");
  const ele = document.createElement('div');
  const nameEle = document.createElement('name');
  const idEle = document.createElement('id');
  const imageEle = document.createElement('img');
  const breedEle = document.createElement('breed');
  const statusEle  = document.createElement('element');
  const teamIdEle = document.createElement('teamId');

  imageEle.setAttribute("alt", player.name);
  imageEle.setAttribute("src", player.imageUrl);


  nameEle.innerHTML = player.name;
  idEle.innerHTML = player.id;
  imageEle.innerHTML = player.imageUrl;
  breedEle.innerHTML = player.breed;
  statusEle.innerHTML = player.status;
  teamIdEle.innerHTML = player.team;

  const info = document.createElement('button');
  info.innerHTML = "More Info";
  ele.appendChild(imageEle);
  ele.appendChild(nameEle);
  ele.appendChild(idEle);
  ele.appendChild(breedEle);
  ele.appendChild(statusEle);
  ele.appendChild(teamIdEle);
  ele.appendChild(info);


  wrapper.appendChild(ele);
  info.addEventListener("click", () => {
    wrapper.innerHTML = "";
    renderSinglePlayer(player);
  });
}; 



/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
function renderNewPlayerForm () {
const form = document.getElementById('new-player-form');

var inputName = document.createElement('input');
inputName.label = "Puppy Name";
inputName.type = 'puppyName';
inputName.name = 'puppyId';
inputName.placeholder = 'Puppy Name';

var inputBreed = document.createElement('input');
inputBreed.type = 'puppyType';
inputBreed.name = 'puppyBreed';
inputBreed.placeholder = 'Puppy Breed';

var inputImg = document.createElement('input');
inputImg.type = 'puppyPic';
inputImg.imageUrl = 'puppyLink';
inputImg.placeholder = 'Puppy Picture';

var buttonSubmit = document.createElement('input');
buttonSubmit.type = 'submit';
buttonSubmit.value = 'Submit';

form.appendChild(inputName);
form.appendChild(inputBreed);
form.appendChild(inputImg);
form.appendChild(buttonSubmit);
};



/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};


// This script will be run using Node when testing, so here we're doing a quick
// // check to see if we're in Node or the browser, and exporting the functions
// // we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    // addNewPlayer,
    // removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}


