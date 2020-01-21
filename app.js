let userScore = 0;
let compScore = 0;
let drawScore = 0;
let streakAr = [];
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const drawScore_span = document.getElementById("draw-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("Rock");
const paper_div = document.getElementById("Paper");
const scissors_div = document.getElementById("Scissors");

function checkStreak(result){
  let node = document.getElementById("game-log");
  let br = document.createElement("br");
  let span  = document.createElement('span');
  let streakMsg = "";
  let txt;

  if (streakAr.length < 1) { streakAr.push(result); }
  //if last value in array = current value then streak continues
  if (result === streakAr[streakAr.length-1]) {
      streakAr.push(result);
      switch (streakAr.length-1) {
        case 5:
          streakMsg = "5 in a row? That deserves a scooby snack."
          break;
        case 10:
          streakMsg = "10 in a row! Wow. Much amaze."
          break;
        case 15:
          streakMsg = "Oh, you're still playing? 15 is good enough..."
          break;
        case 25:
          streakMsg = "Buy a ticket to Vegas already."
          break;
        case 50:
          streakMsg = "No possible way can anyone win 50 in a row..."
          break;
        case 100:
          streakMsg = "Congratulations, either you cheated or you are confirmed to be RNGesus."
      }
  }
  else {
    streakAr = [];
  }

  if (streakMsg != "") {
    txt = document.createTextNode(streakMsg);
    span.style.color = "green";
    span.appendChild(txt);
    node.appendChild(span);
    node.appendChild(br);
  }
}

function updateScroll(){
    var element = document.getElementById("game-log");
    element.scrollTop = element.scrollHeight;
}

function updateLog(result,user,comp) {
  let node = document.getElementById("game-log");
  let br = document.createElement("br");
  let picks = "";
  switch (result) {
    case "win":
      picks = user + " > " + comp + " (" + userScore + ":" + drawScore + ":" + compScore + ")";
      break;
    case "lose":
      picks = user + " < " + comp + " (" + userScore + ":" + drawScore + ":" + compScore + ")";
      break;
    default:
      picks = user + " = " + comp + " (" + userScore + ":" + drawScore + ":" + compScore + ")";
  }

  let txt = document.createTextNode(picks);
  node.appendChild(txt);
  node.appendChild(br);
  checkStreak(result);
  updateScroll();
}

function rgb(r,g,b) {
    return 'rgb(' + [(r||0),(g||0),(b||0)].join(',') + ')';
}

function getCompChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const randomNum = Math.floor(Math.random() * 3);
  return choices[randomNum];
}

function win(userChoice, compChoice) {
  const userChoice_div = document.getElementById(userChoice);
  userScore++;
  userScore_span.innerHTML = userScore;
  result_p.innerHTML = userChoice + " beats " + compChoice + ". You win!";
  result_p.style.backgroundColor = rgb(0,168,31);
  userChoice_div.classList.add('green-glow');
  updateLog("win",userChoice,compChoice);
  setTimeout(() => result_p.style.backgroundColor = rgb(41,74,125), 300);
  setTimeout(() => userChoice_div.classList.remove('green-glow'), 300);
}

function lose(userChoice, compChoice) {
  const userChoice_div = document.getElementById(userChoice);
  compScore++;
  compScore_span.innerHTML = compScore;
  result_p.innerHTML = compChoice + " beats " + userChoice + ". You lose!";
  result_p.style.backgroundColor = rgb(208,17,21);
  userChoice_div.classList.add('red-glow');
  updateLog("lose",userChoice,compChoice);
  setTimeout(() => result_p.style.backgroundColor = rgb(41,74,125), 300);
  setTimeout(() => userChoice_div.classList.remove('red-glow'), 300);
}

function draw(userChoice, compChoice) {
  const userChoice_div = document.getElementById(userChoice);
  drawScore++;
  drawScore_span.innerHTML = drawScore;
  result_p.innerHTML = compChoice + " equals " + userChoice + ". You draw!";
  result_p.style.backgroundColor = rgb(37,41,43);
  userChoice_div.classList.add('grey-glow');
  updateLog("draw",userChoice,compChoice);
  setTimeout(() => result_p.style.backgroundColor = rgb(41,74,125), 300);
  setTimeout(() => userChoice_div.classList.remove('grey-glow'), 300);
}

function game(userChoice) {
  const compChoice = getCompChoice();
  switch (userChoice + compChoice) {
    case "RockScissors":
    case "PaperRock":
    case "ScissorsPaper":
      win(userChoice,compChoice);
      break; //Win
    case "RockPaper":
    case "PaperScissors":
    case "ScissorsRock":
      lose(userChoice,compChoice);
      break; //Lose
    default:
      draw(userChoice,compChoice);
      break; //Tie
  }
}

function main() {
  rock_div.addEventListener('click', () => game("Rock"));

  paper_div.addEventListener('click', () => game("Paper"));

  scissors_div.addEventListener('click', () => game("Scissors"));
}

main();
