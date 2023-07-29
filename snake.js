//board
let blockSize = 25;
let rows = 20;
let colums = 20;
let board;
let context;

let score = 0;

const gulpSound = new Audio("gulp.mp3");

//head snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5; //snake will start at index[5,5] on the board
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];

//food
let foodX;
let foodY;
function placeFood(){
    foodX = Math.floor(Math.random() * colums) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

//game over
let gameOver = false;


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = colums * blockSize;
    context = board.getContext("2d"); 

    placeFood();
    document.addEventListener("keyup", changeDirecion);
    
    setInterval(update, 1000/10); //100 miliseconds
}


function update(){
    if (gameOver){
        context.fillStyle = "white";
        context.font = "50px Verdana"
        context.fillText("Game Over!", board.width / 6.5, board.height / 2);

        return;
    }
    //updare for board
    context.fillStyle="black"; //change color of the pen to black
    context.fillRect(0, 0, board.width, board.height);

    //update for food
    context.fillStyle="purple"; //change color of the
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    //when snake collide with food
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        gulpSound.play();
    }
    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    //update for snake
    context.fillStyle="pink"; //color of snake
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize); // snake size = 1 block size
    for(let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //update for score
        // function drawScore(){
        //     context.fillStyle = "white";
        //     context.font = "20px Verdana";
        //     context.fillText("Score " + score, board.width-50,10);
        // }

    //Game over condition snake go out of bound
    if(snakeX < 0 || snakeY < 0 || snakeX > colums*blockSize || snakeY > rows*blockSize){
        gameOver = true;
    }
    //Game over condition snake bite itself
    for(let i=0; i<snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
        } 
    }

}

//change direction of snacke
function changeDirecion(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != -1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != 1){
        velocityX = 1;
        velocityY = 0;
    }
}



