//Query Selectors
const imageContainer = document.querySelector(".image-container");
const centered = document.querySelector(".centered");
const buttons = document.querySelectorAll("button");

//API
let endPoint = "https://api.tumblr.com/v2/tagged?tag=";
const apiKey = "&api_key=aYJeKngGNVnOCFwbecDgz9JRJaEvixAIQFHI8ivrEDwdkRxaAP";

//Initialiser
let randomTags = ["Art", "Fruits", "GIF", "Landscape"];
let btnColors = ["btn-primary", "btn-success", "btn-danger", "btn-seconday"];
let randomTag;
let movesMade = 0;
let status = false;

/** Randomising the Tags */

function randomiseTag() {
  randomNum = Math.floor(Math.random() * randomTags.length);
  randomTag = randomTags[randomNum];
  getTaggedPhoto(randomTag);
}

/** Requesting for the Photos from the Tumblr API */
function getTaggedPhoto(randomTag) {
  fetch(`${endPoint}${randomTag}${apiKey}`)
    .then(function(resp) {
      if (!resp.ok) {
        alert(
          "Hey, something went wrong. Please contact your local Developer Team"
        );
        return;
      }
      return resp.json();
    })
    .then(function(res) {
      const items = res.response;
      for (let item of items) {
        /*removing the photos that returned 
        undefined without the URL*/
        if (item.photos !== undefined) {
          /* === alt size (not used) === */
          //const altSizes = item.photos[0].alt_sizes;
          //const imgSrc = altSizes[altSizes.length - 1].url;

          const imgSrc = item.photos[0].original_size.url;
          const div = document.createElement("div");
          div.classList.add(
            "m-2",
            "text-center",
            "border",
            "border-success",
            "col-lg-2",
            "col-md-4",
            "col-sm-6"
          );
          const img = document.createElement("img");
          img.src = imgSrc;
          div.appendChild(img);
          centered.appendChild(div);
        }
      }
    })
    .catch(function(err) {
      alert(
        "Sorry the Tumblr API is currently down, please try again in a couple hours",
        err
      );
    });
}

/** Reusable Shuffling Function */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Reassign the buttonsInfo with the Shuffling Function */
function redoBtn() {
  shuffle(btnColors);
  shuffle(randomTags);
  console.log(randomTags);
}

/** Adding the words to the randomised btns */
function randomBtn() {
  console.log(buttons);
  for (let i = 0; i < buttons.length; i++) {
    // for (let color of btnColors) {
    buttons[i].classList.add(btnColors[i]);
    buttons[i].innerHTML = randomTags[i];
    // }
  }
}

/** Check for Win or Lose */
function checkTag() {
  if (event.target.innerHTML === randomTag && movesMade < 2) {
    alert("You Won");

    for (let btn of buttons) {
      if (!btn.className.includes("disabled")) {
        btn.classList.add("disabled");
      }
    }
    movesMade++;
  }
  if (event.target.innerHTML !== randomTag && movesMade === 1) {
    alert("You Lose");
    for (let btn of buttons) {
      if (!btn.className.includes("disabled")) {
        btn.classList.add("disabled");
      }
    }

    movesMade++;
  }

  if (event.target.innerHTML !== randomTag && movesMade === 0) {
    alert("Try Again, you have one last try");
    event.target.classList.add("disabled");
    movesMade++;
  }
}

/** Initialise */
function initialise() {
  redoBtn();
  randomBtn();
  randomiseTag();
}

/** Restart the Game */
function reset() {
  initialise();
  movesMade = 0;
}

initialise();

console.log(randomTag);
console.log(movesMade);
