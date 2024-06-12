import './style.css';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//Parameters for the car and road
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const laneWidth = window.innerWidth/3;
let playerLane = 1;
const carHeight = 80;
const carWidth = 40;
const gameSpeed = 10;
let score = 0;


//Class to make new car and obstacles

class Car {

    x:number;
    y:number;
    height:number;
    width:number

    constructor(x : number,y : number,width: number,height : number){
        this.x = x,
        this.y = y,
        this.height = height,
        this.width = width
    }
}

const myCar = new Car(laneWidth*playerLane + laneWidth/2-carWidth/2,canvas.height-carHeight-50,carWidth,carHeight);
const incomingCar = new Car(laneWidth + laneWidth/2-carWidth/2,0,carWidth,carHeight);
const Score = document.querySelector('.score') as HTMLElement;
// Score.innerText = `${score}`;


//Function to make player's car
function drawMyCar(){
    ctx.fillStyle = 'green';
    ctx.fillRect(myCar.x,myCar.y,myCar.width,myCar.height);
}


//Code for incomingCars............................................................
const incomingCars = [];


//Function for drawing car

// function drawIncomingCars(){
//     ctx.fillStyle = 'red';
//     ctx.fillRect(myCar.x,myCar.y-canvas.height+132,myCar.width,myCar.height);
// }

//Function for updating the incoming cars
function updateIncomingCars(){
        ctx.fillStyle = 'red';
        incomingCar.y += gameSpeed;
        ctx.fillRect(incomingCar.x,incomingCar.y,incomingCar.width,incomingCar.height);

}

//Function change incoming car lane
function changeIncomingCarLane(){
    if(incomingCar.y>canvas.height + 10){
        incomingCar.y = 0;
        incomingCar.x = laneWidth*(Math.floor(Math.random()*3))+ laneWidth/2-carWidth/2;
        score++;    
        console.log(score);
    }
}

//Function to check collision
function checkCollision() {
    if (myCar.x < incomingCar.x + incomingCar.width &&
        myCar.x + myCar.width > incomingCar.x &&
        myCar.y < incomingCar.y + incomingCar.height &&
        myCar.y + myCar.height > incomingCar.y) {
        gameOverScreen();
    }
}

//Player's car movement function 

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      movePlayerCar('left');
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      movePlayerCar('right');
    }
  });

function movePlayerCar(direction: 'left' | 'right') {
    if (direction === 'left' && playerLane > 0) {
      playerLane--;
    } else if (direction === 'right' && playerLane < 2) {
      playerLane++;
    }
    myCar.x = laneWidth * playerLane + laneWidth / 2 - carWidth / 2;
  }

//Game over screen
function gameOverScreen(){
    const gameOver = document.querySelector('.gameOver') as HTMLElement;
    gameOver.style.display = 'block';
    gameOver.addEventListener('click',() =>{
        location.reload();
    })
    canvas.style.display = 'none';

}

//Function to start the animation
function startAnimation(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawMyCar();
    // drawIncomingCars();
    updateIncomingCars();
    changeIncomingCarLane();
    checkCollision();
    requestAnimationFrame(startAnimation);
}

startAnimation();