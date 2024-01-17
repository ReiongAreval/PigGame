'use strict';

//Declaration elements of HTML
const btnNewGame=document.querySelector(`.btn--new`);
const btnRoll=document.querySelector(`.btn--roll`);
const btnHold=document.querySelector(`.btn--hold`);
const diceElement=document.querySelector(`.dice`);
const current0Element=document.getElementById(`current--0`);
const current1Element=document.getElementById(`current--1`);
const score0Element=document.getElementById(`score--0`);
const score1Element=document.getElementById(`score--1`);
const player0Element=document.querySelector(`.player--0`);
const player1Element=document.querySelector(`.player--1`);

//Declaration variables of control
const scoreHolder=[0,0];
let diceNumber=0;
let currentScore=0;
let currentPlayer=0;

//Declaration fuctions above all the program
function startingConditions(){
    for (let i = 0; i < scoreHolder.length; i++){
        scoreHolder[i]=0;
    }
    score0Element.textContent=scoreHolder[0];
    score1Element.textContent=scoreHolder[1];
    document.querySelector(`.player--${currentPlayer}`).classList.remove(`player--winner`);
    currentPlayer=0;
    currentScore=0;
    diceElement.classList.add(`hidden`);
    player0Element.classList.add(`player--active`);
    player1Element.classList.remove(`player--active`);
    btnHold.disabled=false;
    btnRoll.disabled=false;
}

function randomDice(){
    diceNumber=Math.trunc((Math.random()*6)+1 );
    diceElement.classList.remove(`hidden`);
    diceElement.src=`dice-${diceNumber}.png`;
    return diceNumber;
}

function addToCurrentScore(randomDice){
    if (randomDice !== 1){
        currentScore += randomDice;
        document.getElementById(`current--${currentPlayer}`).textContent=currentScore;
    } else switchPlayers();;
}

function switchPlayers(){
    currentScore=0;
    document.getElementById(`current--${currentPlayer}`).textContent=currentScore;
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    player0Element.classList.toggle(`player--active`);
    player1Element.classList.toggle(`player--active`);
}

function addToHoldScore(){
    scoreHolder[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent=scoreHolder[currentPlayer];
    if (scoreHolder[currentPlayer] >= 10){
        document.querySelector(`.player--${currentPlayer}`).classList.add(`player--winner`);
        currentScore=0;
        document.getElementById(`current--${currentPlayer}`).textContent=currentScore;
        btnHold.disabled=true;
        btnRoll.disabled=true;
        diceElement.classList.add(`hidden`);
    }else switchPlayers();
}

//Triggers/Event Listeners
btnRoll.addEventListener(`click` , function(){
    addToCurrentScore(randomDice());
})

btnHold.addEventListener(`click` , function(){
    addToHoldScore();
})

btnNewGame.addEventListener(`click` , function(){
    startingConditions();
})

startingConditions();