
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//game variables
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 5;
let ballSpeedY = -5;

const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

//brick variable
const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10; //padding between each bricks in the grid
const brickOffsetTop = 30;//top offset of the first row from top edge of screen
const brickOffsetLeft = 30;

const bricks = [];

for(let c=0; c<brickColumnCount;c++){
    bricks[c] = [];
    for(let r=0; r<brickRowCount;r++){
        bricks[c][r] = {x:0, y:0, status:1};
    }
}

//Event listeners for paddle movement
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight"){
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key ==="Right"|| e.key==="ArrowRight"){
        rightPressed =false;
    } 
    else if (e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = false;
    }
}

//game loop
function draw() {
    ctx.clearRect(0 , 0, canvas.width, canvas.height);//clears everything on the canvas before drawing new things

    //draw bricks
    for(let c =0; c<brickColumnCount; c++){
        for( let r=0 ; r < brickRowCount; r++ ){
            if (bricks[c][r].status === 1){
                const brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                const brickY =(r *(brickHeight + brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX , brickY, brickWidth, brickHeight );
                ctx.fillStyle ="#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    //draw paddle
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    //draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    //move paddle
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX +=7;
    }
    else if (leftPressed && paddleX>0){
        paddleX -=7;
    }

    //move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //ball collision
    if(ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius){
        ballSpeedX = -ballSpeedX;
    }

    if(ballY + ballSpeedY < ballRadius){
        ballSpeedY = -ballSpeedY;
    }
    else if (ballY + ballSpeedY > canvas.height - ballRadius) {
        if( ballX >= paddleX && (ballX < paddleX + paddleWidth) ) {
            ballSpeedY = -ballSpeedY;
        }
    else{
        //Game over
        document.location.reload();
    }
}
requestAnimationFrame(draw);
}

draw();