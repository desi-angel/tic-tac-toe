//Creating Player Objects
const Player = (name,mark) => {

    return {name,mark};
};

//Setting up the Game Board module
const gameBoard = (() => {
    const board = ['','','','','','','','',''];

    //push the input into array 
    const setMark = (mark,index) => {
        if(board.length <= 9){
            board[index] = mark; 
        }
    };

    //Get the input
    const getMark = (index) => {
        if(index>board.length) return;
        return board[index];
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
    const start = document.querySelector('.start');
    const inputs = document.querySelectorAll('input');

    addPlayer.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    //clicking anywhere to close the modal
    window.onclick = function(event) {
        if (event.target == modal || event.target == start) {
          modal.style.display = "none";
          clearModal();
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
                if (gameController.isOver || e.target.textContent !== "") return;
                gameController.playRound(parseInt(e.target.dataset.index));
                updateBoard(e.target);
            });
        });
    };
    //Displaying message
    const messageDisplay = (msg) => {
       message.textContent = msg;
    };

    const updateBoard = (box) => {
       box.textContent = gameBoard.getMark(box.dataset.index); 
    };

    //Clearing Modal on start 
    const clearModal = () => {  
        inputs.forEach(entry => {
            entry.value ='';
        });
        mark.forEach(mark => {
            if (mark.className.includes('active')){
                mark.classList.remove('active');
            }
        });
    };

    return {displayMark,messageDisplay,clearModal,updateBoard};
})();

// Setting the game controller module

const gameController =  (()=> {
    const start = document.querySelector('.start');
    const name1 = document.querySelector('#name1');
    const name2 = document.querySelector('#name2');
    const marks = document.querySelectorAll('.mark');
    let round = 1;
    let isOver = false;
    let Player1,
        Player2;

    start.addEventListener('click',() => {
        setInputs();
        randomFirstPlayer();
        displayController.displayMark();
        displayController.clearModal();
        displayController.messageDisplay(`${currentPlayer()['name']}'s turn`);

    } );

    const setInputs = () => {
       let selectedMark = []; 
       marks.forEach(mark => {
        if(mark.className.includes("active")){
            selectedMark.push(mark.value);
        }
       });
        Player1 = Player(name1.value,selectedMark[0]);
        Player2 = Player(name2.value,selectedMark[1]);
       return {Player1,Player2};
    }; 

    const playRound = (fieldset) => {
        gameBoard.setMark(currentPlayer()['mark'],fieldset);
        if(winCheck()){
                displayController.messageDisplay(`${currentPlayer()['name']} has won`);
                isOver=true;
                return;
            }
        if(round === 9){
                displayController.messageDisplay('Its a Draw');
                isOver =true;
                return;
            }

        round++;
        displayController.messageDisplay(`${currentPlayer()['name']}'s turn`);
        console.log(gameBoard.board);
       
    };

    const currentPlayer = () => {
        
        return (round%2 === 1) ? Player1:Player2;
    };
   
    const randomFirstPlayer = () =>{
        let randomNumber = Math.floor(Math.random()*2) + 1;
        if (randomNumber === 2){
            let swap = function(x){return x};
            Player2 = swap(Player1,Player1=Player2);
        }
    };

    const winCheck = () => {
        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        return winConditions
        .some((combination) => 
            combination.every(
                (index) => gameBoard.getMark(index) === currentPlayer()['mark']
            )
        );
    };

    return {playRound,currentPlayer,Player1,Player2,isOver};
})();