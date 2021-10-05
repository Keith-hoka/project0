
let clickedArrX = [];
let clickedArrO = [];
let clickedArr = [clickedArrX, clickedArrO];
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
let prevWinX = localStorage.getItem("roundsX");
let prevWinO = localStorage.getItem("roundsO");

$("#start-btn").click(function(){
    $("#start-btn").attr("class", "enterNameBtn-hide");
    $("form").removeClass();
    $("#change-btn").attr("class", "changeNameBtn-hide");
});

$(".submitBtn").click(function(){
  const cusName = $(".name").val();
  localStorage.setItem("name", cusName);
  $("form").addClass("player-hide");
  $("#winnerx").text(`Player ${cusName} win: 0`);
  $("#winnero").text(`Player O win: 0`);
  $("#change-btn").attr("class", "changeNameBtn");
  $("#start-btn").attr("class", "enterNameBtn");
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
      console.log(clickedArrX);
    } else {
      clickedArrO.push($(this).index());
      console.log(clickedArrO);
    }
    toggle();
    for (let i = 0; i < winning.length; i++) {
      for (let n = 0; n < clickedArr.length; n++){
        // if (JSON.stringify(clickedArr[n].sort()) === JSON.stringify(winning[i])){
        if (clickedArrO.length + clickedArrX.length < 9 && winning[i].every(elem => clickedArr[n].includes(elem))){
          console.log(winning[i]);
          console.log(clickedArr[n]);
          if (n === 0){
            winRoundOfX = +prevWinX + 1;
            localStorage.setItem("roundsX", winRoundOfX);
            $(".grid-container").remove();
            $(".winner").remove();
            $("#start-btn").attr("class", "enterNameBtn-hide");
            if (name === null) {
              $(".result").append(`<p>Congratulations! You win your first game!</p>`);
            } else {
              $(".result").append(`<p>Congratulations! Winner is ${name}!</p>`);
            }
          } else {
            winRoundOfO = +prevWinO + 1;
            localStorage.setItem("roundsO", winRoundOfO);
            $(".grid-container").remove();
            $(".winner").remove();
            $("#start-btn").attr("class", "enterNameBtn-hide");
            $(".result").append("<p>Congratulations! Winner is O!</p>");
          }
        }
      }
    }
    if (clickedArrO.length + clickedArrX.length === 9){
            $(".grid-container").remove();
            $(".winner").remove();
            $("#start-btn").attr("class", "enterNameBtn-hide");
            $(".result").append("<p>It is a Tie! No one wins</p>");
    }
    // computerPlay($(this).index());
  });
}) ;

const toggle = function(){
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  return currentPlayer;
};

$("#game-btn").click(function(){
  location.reload();
});

// const computerPlay = function(index) {
//   const randomIndex = Math.round(Math.random() * 8);
//   if (gridArr.length > 0){
//     for (let i = 0; i < gridArr.length; i++){
//       if (index !== randomIndex) {
//         console.log(index);
//         console.log(randomIndex);
//         $(`#item${gridArr[randomIndex]}`).text("O");
//         gridArr = gridArr.filter(item => item !== randomIndex);
//         console.log(gridArr);
//       }
//     }
//
//   }
// };
