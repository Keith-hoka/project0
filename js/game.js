
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
  [2,4,6]
];
let winRoundOfX = 0;
let winRoundOfO = 0;
let prevWinX = localStorage.getItem("roundsX");
let prevWinO = localStorage.getItem("roundsO");

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
        if (JSON.stringify(clickedArr[n].sort()) === JSON.stringify(winning[i])){
          if (n === 0){
            console.log("winner is X");
            $(".grid-container").remove();
            $(".result").append("<p>Congratulations! Winner is X!</p>");
            winRoundOfX = +prevWinX + 1;
            console.log(winRoundOfX);
            localStorage.setItem("roundsX", winRoundOfX);
            console.log(winRoundOfX);
          } else {
            console.log("winner is O");
            $(".grid-container").remove();
            $(".result").append("<p>Congratulations! Winner is O!</p>");
            winRoundOfO = prevWinO + 1;
            localStorage.setItem("roundsO", winRoundOfO);
            console.log(winRoundOfO);
          }
        } else if (clickedArrO.length + clickedArrX.length === 9){
          console.log("It is a tie!");
          $(".grid-container").remove();
          $(".result").append("<p>It is a Tie! No one wins</p>");
        }
      }
    }
    // computerPlay($(this).index());
  });
});

const toggle = function(){
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  return currentPlayer;
};

$("button").click(function(){
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
