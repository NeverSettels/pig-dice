function Game () {
  this.playerOne = {};
  this.playerTwo = {};
  this.dice = 0;
}

function Player (name) {
  this.name = name;
  this.totalScore = 0;
  this.roundScore = 0;
}

Player.prototype.getDice = function () {
  return Math.floor(Math.random() * (6)) + 1;
}
Player.prototype.setScore = function(){
  var roll = this.getDice()
  console.log(roll)
  if(roll === 1){
    this.roundScore = 0
  }else {
    return this.roundScore += roll;
  }
}

$(document).ready(function() {
  var newGame = new Game ();
  console.log(newGame)
  $("#nameInput").submit(function(event) {
    event.preventDefault();
    newGame.playerOne = new Player($("#playerOne").val());
    console.log(newGame)
    newGame.playerTwo = new Player($("#playerTwo").val());
    $('#roll').removeClass('no-display')
    
    
  });
  $("#roll").submit(function(event) {
    event.preventDefault();
    newGame.playerOne.setScore();
    console.log(newGame)
    
  })


})