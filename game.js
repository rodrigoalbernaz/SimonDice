var buttonColours = ["blue", "yellow", "red", "green"];

var gameSequence = [];
var sequenceCount = 0;

var playerSequence = [];

var playing = false;
var score = 0;
var highScore = 0;

function startGame() {
  score = 0;
  gameSequence = [];
  playerSequence = [];
  sequenceCount = 0;
  $("h1").text("A JUGAR! Puntaje: " + score);
  playing = true;
  nextSequence();
}

function gameOver() {
  makeSound("sounds/wrong.mp3");
  $("h1").text("Perdiste :( Presiona A para comenzar de nuevo. Puntaje: " + score);
  playerSequence=[];
  playing = false;
}

function restartGame() {
  score = 0;
  gameSequence = [];
  playerSequence = [];
  sequenceCount = 0;

  $("h1").text("Press A Key to Start");
  playing = false;
}


function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

function checkSequence() {

  if (checkArrays(gameSequence, playerSequence)) {
    score++;
    $("h1").text("A JUGAR! Puntaje: " + score);

    playerSequence=[];
    sequenceCount=0;
    nextSequence();
  } else {
    gameOver();
  }

}

function checkArrays(gameSeq,playerSeq){
var igual=false;
  for(var i=0;i<playerSeq.length;i++){
    if(gameSeq[i]===playerSeq[i]){
      igual=true;
    }else{
      return false;
    }
  }
  return igual;
}

$(document).keydown(function(event) {

  switch (event.key) {
    case "a":
      console.log(event.key);
      if (!playing) {
        startGame();
      }

      break;
    case "r":
      restartGame();
      break;
    default:

  }
});

//event handler click, detecta el click y dispara eventos
$(".btn").click(function(event) {

  var botonId = event.currentTarget.id;
  switch (botonId) {

    case "blue":
      animacionBoton(botonId);
      play(botonId);



      break;
    case "green":
      animacionBoton(botonId);
      play(botonId);


      break;
    case "red":
      animacionBoton(botonId);
      play(botonId);



      break;
    case "yellow":
      animacionBoton(botonId);
      play(botonId);

      break;
    default:
      console.log("Fuera del case de botones");

  }

});



function play(botonId){

  if (playing && sequenceCount < gameSequence.length) {
    playerSequence.push(botonId);
    sequenceCount++;
    if(sequenceCount==gameSequence.length){
      checkSequence();
    }
  }

}

//Selecciona un numero aleatorio entre 0 y 3 para elegir del array de botones
//y lo retorna.
function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  gameSequence.push(buttonColours[randomNumber]);
  gameSequenceAnimation();
}

function gameSequenceAnimation() {

  //Alternativa que funciona
  // gSequence.forEach((color, index) => {
  //   setTimeout(() => {
  //     animacionBoton(color);
  //   }, (index + 1) * 600);
  // });

  for (i = 0; i < gameSequence.length; ++i) {
    setDelay(i);
  }

  function setDelay(i) {
    setTimeout(function(){
      animacionBoton(gameSequence[i]);
    }, (i+1)*1000);
  }

}

//reproduce el sonido de cada boton
function makeSound(soundUrl) {

  var audio = new Audio(soundUrl);
  audio.play();

}





//animacion de presion del boton
function animacionBoton(id) {
  $("#" + id).addClass("pressed");
  setTimeout(function() {
    $("#" + id).removeClass("pressed");
  }, 100);
  makeSound("sounds/"+id+".mp3")

}
