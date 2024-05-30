'use strict';
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const dice = document.querySelector(".dice");
const diceRoll = document.querySelector('.btn--roll');
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");
const current0EL = document.querySelector("#current--0");
const current1EL = document.querySelector("#current--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
let currentScore, scores, activePlayer, playing;

// To hide the dice image at the start of the game.
dice.classList.add("hidden");


function innit(){
    console.log('new game btn was pressed')
    currentScore = 0;
    scores = [0,0];
    activePlayer = 0;
    playing = true;
    current0EL.textContent  = 0;
    current1EL.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    dice.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player1El.classList.remove("player--active");
    player0El.classList.add("player--active");
}

innit();

function switchPlayer(){
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

//Whenever the hold button is pressed it will perform these functions.
holdBtn.addEventListener('click', function(){
    
    console.log("Hold button was pressed!");
    //adds the current score in the total score
    scores[activePlayer] += currentScore;

   
    console.log("total Score" + scores[activePlayer]);

    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore
    console.log(currentScore);
    
    if(scores[activePlayer] > 100){
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
    }else{
        switchPlayer();
    }
    
    
})


diceRoll.addEventListener('click', function(){

    //To show the dice image when the game starts
    dice.classList.remove("hidden");

    let number = Math.trunc(Math.random()*6) + 1;

    //to show the particular dice image based on the number user rolls out.
    dice.src = `dice-${number}.png`;

    console.log('Number is ' + number)
    
    if(number !== 1){
        //when the rolled out number is not one then add the number to the current score.
        currentScore += number;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else{
        //if number is 1 then the current score gets add to the total score 
        scores[activePlayer] += currentScore;
        // The total score is then printed on the screen for the current active player.
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        //The current score for the last active player becomes zero.
        currentScore= 0;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        if(scores[activePlayer] > 100){
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
        }
        
        switchPlayer();
        
    }
    

})


newBtn.addEventListener('click', innit);