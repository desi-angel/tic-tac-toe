//Creating Player Objects
const Player = (name,markSelected) => {
    return {name,markSelected};
};

//Setting up the Game Board module
const gameBoard = (() => {
    const board = ['','','','','','','','',''];

    //push the input into array 
    const setMark = (mark,index) => {
        
    };

    //Get the input
    const getMark = (index) => {

    };

    //reset the board
    const reset = () => {
        for (let i = 0; i<board.length; i++){
            board[i] = '';
        }
    };
    return{board,setMark,getMark,reset};
})();

//Setting Display Controller Module

const displayController = (() => {
    const addPlayer = document.querySelector('.addPlayer');
    const modal = document.querySelector('.modal');
    const message = document.querySelector('.message');
    const boxes = document.querySelectorAll('.boxes');
    const mark = document.querySelectorAll('.mark');
    const start = document.querySelector('.start')

    addPlayer.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    //clicking anywhere to close the modal
    window.onclick = function(event) {
        if (event.target == modal || event.target == start) {
          modal.style.display = "none";
        }
      }

    //Create a toggle function for selected mark
    mark.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let player = e.target.parentElement;
            let current = player.getElementsByClassName("active");
             if (current.length > 0) { 
                current[0].className = current[0].className.replace(" active", "");
            }
            e.target.className += " active";
        });
    }); 

   //add functionality to boxes 
    const displayMark = () => {
        boxes.forEach(box => {
            box.addEventListener('click', (e) => {
               gameController.playRound(e.target.dataset.index);
            });
        });
    };

    const updateBoard = () => {

    };

    return {displayMark};
})();

// Setting the game controller module

const gameController =  (()=> {
    const start = document.querySelector('.start');
    const name1 = document.querySelector('#name1');
    const name2 = document.querySelector('#name2');
    const marks = document.querySelectorAll('.mark');
    let round = 1;

    start.addEventListener('click',() => {
        let players = setInputs();
        displayController.displayMark();
    } );

    const setInputs = () => {
       let selectedMark = []; 
       marks.forEach(mark => {
        if(mark.className.includes("active")){
            selectedMark.push(mark.value);
        }
       });
       const Player1 = Player(name1.value,selectedMark[0]);
       const Player2 = Player(name2.value,selectedMark[1]);
       return {Player1,Player2};
    }; 

    const playRound = (fieldset) => {
        console.log(fieldset);
    };

    const currentPlayer = () => {};

    return {playRound};
})();