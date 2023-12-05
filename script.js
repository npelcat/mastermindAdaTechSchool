/**
 * BIENVENUE AU MASTER MIND !
 */

const input = document.getElementById("userSuggest");
const button = document.getElementById("send");
const tableauInfo = document.getElementById("arrayResponse");
const test = document.getElementById("displayTest");
const lives = document.getElementById("lives");

const MAX_LIVES = 10;
const POSSIBLE_COLORS = ["blue", "red", "yellow", "green", "white", "black"];
const secretToFind = ["blue", "red", "yellow", "white"];

function areColorsValid(colorsPropositionArray) {
  for (let index = 0; index < colorsPropositionArray.length; index++) {
    const colorLowerCase = colorsPropositionArray[index].toLowerCase();
    if (!POSSIBLE_COLORS.includes(colorLowerCase)) {
      return false;
    }
  }
  return true;
}

function isRightColorAtTheRightPlace(colorsPropositionArray, secretToFind) {
  let goodSpot = 0;
  let badSpot = 0;

  for (let index = 0; index < colorsPropositionArray.length; index++) {
    if (colorsPropositionArray[index] === secretToFind[index]) {
      // bonne place
      goodSpot++; // goodSpot += 1 // goodSpot = goodSpot + 1
    } else if (secretToFind.includes(colorsPropositionArray[index])) {
      // ailleurs
      badSpot++;
    }
  }
  return [goodSpot, badSpot];
  // return (goodSpot === secretToFind.length)
}

let userLives = MAX_LIVES;

function onButtonClick() {
  const inputValue = input.value;
  console.log(inputValue);
  const colorsArray = inputValue.split(",");
  console.log(colorsArray);

  if (!areColorsValid(colorsArray)) {
    tableauInfo.innerHTML =
      "Une ou plusieurs couleurs ne sont pas dans la liste.";
    return false;
  }
  const [goodSpot, badSpot] = isRightColorAtTheRightPlace(
    colorsArray,
    secretToFind
  );
  // const goodSpot = result[0]
  // const badSpot = result[1]

  if (goodSpot === secretToFind.length) {
    tableauInfo.innerHTML = "<strong>VICTOIRE !</strong>";
  } else {
    userLives -= 1;
    lives.innerHTML = `Essai(s) restant(s) : ${userLives}`;
    if (userLives === 0) {
      tableauInfo.innerHTML = "<strong>GAME OVER</strong>";
      button.removeEventListener("click", onButtonClick);
      return false; // manipulera le dom
    }
    tableauInfo.innerHTML = `<strong>Essaye encore !</strong> <br/>
    Couleur(s) bien placée(s) : ${goodSpot} <br/>
    Couleurs(s) présentes mais mal placée(s) : ${badSpot}`;
    test.innerHTML += `${inputValue}<br/>`;
  }
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  onButtonClick();
});
