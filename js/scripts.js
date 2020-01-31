//Back-end Logic
function Game () {
  this.playerOne = {};
  this.playerTwo = {};
  this.turn = 1;
  this.winner = ''
}
Game.prototype.checkWin = function(){
  if (this.playerOne.totalScore >= 50){
    this.winner=`${this.playerOne.name} Wins`
  } else if (this.playerTwo.totalScore >= 50){
    this.winner=`${this.playerTwo.name} Wins`
  }
}

function Player (name) {
  this.name = name;
  this.totalScore = 0;
  this.roundScore = 0;
}

Player.prototype.endTurn = function (game) {
  this.totalScore += this.roundScore
  game.checkWin();
  game.turn++
  this.roundScore = 0
  
  console.log(game)
}
Player.prototype.getRoll = function () {
  return Math.floor(Math.random() * (6)) + 1;
}
Player.prototype.setScore = function(game){
  var roll = this.getRoll()
  console.log(roll)
  if(roll === 1){
    this.roundScore = 0
    this.endTurn(game)
  }else {
     this.roundScore += roll;
      }
}
// UI Logic 

$(document).ready(function() {
  var newGame = new Game ();
  console.log(newGame)
  $("#nameInput").submit(function(event) {
    event.preventDefault();
    newGame.playerOne = new Player($("#playerOne").val());
    newGame.playerTwo = new Player($("#playerTwo").val());
    $('.buttons').removeClass('no-display') 
    $('#nameInput').addClass('no-display')
    $('#turn').text(`Turn: ${newGame.turn} ${newGame.playerOne.name}'s turn`)
  });

  $(".buttons").on('click', '#roll' ,function(event) {
    event.preventDefault();
    if(newGame.turn%2 != 0){
    newGame.playerOne.setScore(newGame);
    $('#turn').text(`Turn: ${newGame.turn} ${newGame.playerOne.name}'s turn`)
      
  }else {
    $('#turn').text(`Turn: ${newGame.turn} ${newGame.playerTwo.name}'s turn`)
    newGame.playerTwo.setScore(newGame);
  }
  })
  $(".buttons").on('click', '#hold' ,function(event) {  
    event.preventDefault();
    if(newGame.turn%2 != 0){
    newGame.playerOne.endTurn(newGame)
    $('#turn').text(`Turn: ${newGame.turn} ${newGame.playerTwo.name}'s turn`)
    }else{
    newGame.playerTwo.endTurn(newGame)
    $('#turn').text(`Turn: ${newGame.turn} ${newGame.playerOne.name}'s turn`)
    }
  })
})