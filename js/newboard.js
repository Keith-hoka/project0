
let clickedArrX = [];
let clickedArrO = [];
let clickedArr = [clickedArrX, clickedArrO];
let currentPlayer = "X";

const winning = [
  [0,1,2,3,4],
  [5,6,7,8,9],
  [10,11,12,13,14],
  [15,16,17,18,19],
  [20,21,22,23,24],
  [0,5,10,15,20],
  [1,6,11,16,21],
  [2,7,12,17,22],
  [3,8,13,18,23],
  [4,9,14,19,24],
  [0,6,12,18,24],
  [4,8,12,16,20]
];

let winRoundOfX = 0;
let winRoundOfO = 0;
let prevWinX = localStorage.getItem("roundsX");
let prevWinO = localStorage.getItem("roundsO");

$("#start-btn").click(function(){
    $("#start-btn").attr("class", "enterNameBtn-hide");
    $("form").removeClass();
    $("#newBoard-btn").attr("class", "newBoardBtn-hide");
});

$(".submitBtn").click(function(){
  const cusName = $(".name").val();
  localStorage.setItem("name", cusName);
  $("form").addClass("player-hide");
  $("#winnerx").text(`Player ${cusName} win: 0`);
  $("#winnero").text(`Player O win: 0`);
  $("#start-btn").attr("class", "enterNameBtn");
  $("#newBoard-btn").attr("class", "newBoardBtn");
});

$("#cancel-btn").click(function(){
  $("form").addClass("player-hide");
  $("#start-btn").attr("class", "enterNameBtn");
  $("#newBoard-btn").attr("class", "newBoardBtn");
});

$("#change-btn").click(function(){
  localStorage.clear();
  location.reload();
});

let name = localStorage.getItem("name");

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
    $(this).text(currentPlayer);
    if (currentPlayer === "X") {
      clickedArrX.push($(this).index());
    } else {
      clickedArrO.push($(this).index());
    }
    toggle();
    for (let i = 0; i < winning.length; i++) {
      for (let n = 0; n < clickedArr.length; n++){
        if (clickedArrO.length + clickedArrX.length < 25 && winning[i].every(elem => clickedArr[n].includes(elem))){
          if (n === 0){
            winRoundOfX = +prevWinX + 1;
            localStorage.setItem("roundsX", winRoundOfX);
            result();
            if (name === null) {
              $(".result").append(`<p>Congratulations! You win your game!</p>`);
            } else {
              $(".result").append(`<p>Congratulations! Winner is ${name}!</p>`);
            }
          } else {
            winRoundOfO = +prevWinO + 1;
            localStorage.setItem("roundsO", winRoundOfO);
            result();
            $(".result").append("<p>You lose your game. Winner is O!</p>");
          }
        }
      }
    }
    if (clickedArrO.length + clickedArrX.length === 25){
      result();
      $(".result").append("<p>It is a Tie! No one wins</p>");
    }
  });
}) ;

const toggle = function(){
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  return currentPlayer;
};

const result = function(){
  $(".grid-container").remove();
  $(".winner").remove();
  $("#start-btn").attr("class", "enterNameBtn-hide");
  $("#newBoard-btn").attr("class", "newBoardBtn-hide");
};

$("#game-btn").click(function(){
  location.reload();
});
