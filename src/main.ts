import "./style.css"

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lane = canvas.width / 3;
const carWidth = 40;
const carHeight = 80;
let carLane = 1; // This starts the car in the middle(0,1,2 respective lanes)

class Car {

    x: number;
    y: number;
    height: number;
    width: number;

  constructor(x: number, y: number, width: number, height: number) {
    x = this.x;
    y = this.y;
    height = this.height;
    width = this.width;
  }
}

const myCar = new Car(lane * carLane + lane / 2 - carWidth / 2, canvas.height - carHeight - 20, carWidth, carHeight);

function drawPlayerCar() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(myCar.x, myCar.y, myCar.width, myCar.height);
}

let obstacles = [];

function drawObstacles() {
  ctx.fillStyle = 'red';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawPlayerCar();
  drawObstacles();

  requestAnimationFrame(animate);
}

animate();






