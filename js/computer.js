
let clickedArrX = [];
let clickedArrO = [];
let clickedArr = [clickedArrX, clickedArrO];
let boardArr = [0,1,2,3,4,5,6,7,8];
let currentPlayer = "X";

const winning = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

let winRoundOfX = 0;
let winRoundOfO = 0;
let prevWinX = localStorage.getItem("roundsX3");
let prevWinO = localStorage.getItem("roundsO3");

$("#start-btn").click(function(){
    $("#start-btn").attr("class", "enterNameBtn-hide");
    $("form").removeClass();
    $("#newBoard-btn").attr("class", "newBoardBtn-hide");
    $("#people-btn").attr("class", "peopleBtn-hide");
});

$(".submitBtn").click(function(){
  localStorage.clear();
  location.reload();
  const cusName = $(".name").val();
  localStorage.setItem("name3", cusName);
  $("form").addClass("player-hide");
  $("#winnerx").text(`Player ${cusName} win: 0`);
  $("#winnero").text(`Player O win: 0`);
  $("#start-btn").attr("class", "enterNameBtn");
  $("#newBoard-btn").attr("class", "newBoardBtn");
  $("#people-btn").attr("class", "peopleBtn");
});

$("#cancel-btn").click(function(){
  $("form").addClass("player-hide");
  $("#start-btn").attr("class", "enterNameBtn");
  $("#newBoard-btn").attr("class", "newBoardBtn");
  $("#people-btn").attr("class", "peopleBtn");
});

$("#change-btn").click(function(){
  localStorage.clear();
  location.reload();
});

let name = localStorage.getItem("name3");

if (prevWinX === null){
  if(name === null) {
    $("#winnerx").text(`Player X win: 0`);
  } else {
    $("#winnerx").text(`Player ${name} win: 0`);
  }
} else {
  if(name === null) {
    $("#winnerx").text(`Player X win: ${prevWinX}`);
  } else {
    $("#winnerx").text(`Player ${name} win: ${prevWinX}`);
  }
}

if (prevWinO === null){
  $("#winnero").text(`Player O win: 0`);
} else {
  $("#winnero").text(`Player O win: ${prevWinO}`);
}

$(".grid-item").each(function(){
  $(this).click(function(){
    if (currentPlayer === "X") {
      if (clickedArrX.includes($(this).index()) || clickedArrO.includes($(this).index())){
        return;
      } else {
        clickedArrX.push($(this).index());
        boardArr = boardArr.filter(item => item !== $(this).index());
        $(this).text(currentPlayer);
        computerPlay();
      }
    }
    for (let i = 0; i < winning.length; i++) {
      for (let n = 0; n < clickedArr.length; n++){
        if (clickedArrO.length + clickedArrX.length < 9 && winning[i].every(elem => clickedArr[n].includes(elem))){
          if (n === 0){
            winRoundOfX = +prevWinX + 1;
            localStorage.setItem("roundsX3", winRoundOfX);
            result();
            if (name === null) {
              $(".result").append(`<p>Congratulations! You win your game!</p>`);
              $("#win-image").attr("class", "fireworks");
            } else {
              $(".result").append(`<p>Congratulations! Winner is ${name}!</p>`);
              $("#win-image").attr("class", "fireworks");
            }
          } else {
            winRoundOfO = +prevWinO + 1;
            localStorage.setItem("roundsO3", winRoundOfO);
            result();
            $(".result").append("<p>You lose your game!</p>");
            $("#lose-image").attr("class", "rain");
          }
        }
      }
    }
    if (clickedArrO.length + clickedArrX.length === 9){
      result();
      $(".result").append("<p>It is Tie! No one wins</p>");
      $("#tie-image").attr("class", "handshake");
    }
  });
}) ;

const result = function(){
  $(".grid-container").remove();
  $(".winner").remove();
  $("#start-btn").attr("class", "enterNameBtn-hide");
  $("#newBoard-btn").attr("class", "newBoardBtn-hide");
  $("#people-btn").attr("class", "peopleBtn-hide");
};

$("#game-btn").click(function(){
  location.reload();
});

const computerPlay = function() {
  const randomIndex = Math.round(Math.random() * (boardArr.length - 1));
  if (boardArr.length > 1){
    $(`#item${boardArr[randomIndex]}`).text("O");
    clickedArrO.push(boardArr[randomIndex]);
    boardArr = boardArr.filter(item => item !== boardArr[randomIndex]);
  }
};
