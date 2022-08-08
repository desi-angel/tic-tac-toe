//Setting the gameboard module 
const gameBoard = (() => {
    let boxes = document.querySelectorAll('.boxes');
    let gameboard = ['o','x','o','x','o','x','o','x','o'];
    return{gameboard};
})();

//Setting the display controller module
const displayController = (() => {

   let boxes = document.querySelectorAll('.boxes');
   let marks = gameBoard.gameboard;
   let index = 0;
   //function to display the mark to the webpage
   const displayMark = (mark,box) => {
    if(box.textContent === ''){
        box.textContent = mark;
        index++;
    }
   };

   //Initialize the board
   const displayBoard = () => {
    boxes.forEach(box => {
        box.addEventListener('click',(e)=>{
    
            displayMark(marks[index],e.target);

        });
        });
   };

   //reset board
   const resetBoard = () => {
    boxes.forEach(box => {
        box.textContent = '';
    });
   }

   return{displayBoard,resetBoard};
   
})();



//Creating the game object
const game = (() => {
    
})();

//Setting factory function for players
const players = (playerName,playerMark) => {
    return {playerName,playerMark};
};

let player1 = players('Jim','X');
let player2 = players('James','o');
displayController.displayBoard();
 
//Add function to get user inputs. Populate the gameboard array accordingly