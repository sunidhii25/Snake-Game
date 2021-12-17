
let inputDir = { x: 0, y: 0 }; //js object
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 8, y: 2 }];
let food = { x: 5, y: 5 };
let score = 0;

// //Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

const board = document.getElementById("board");
let snakeElement;
let foodElement;

function isCollide(snake) {
  for(let i=1 ; i<snake.length ; i++){
    if(snake[i].x === snake[0].x  &&  snake[i].y === snake[0].y){
      return true;
    }
   
  }
  if(snake[0].x >= 18 || snake[0].x <=0  ){
    return true;
  }
  if(snake[0].y >= 18 || snake[0].y <=0 ){
    return true;
  }
}

function gameEngine() {
  //game ending conditions
  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    alert("Game over, Press any key to restart");
    snakeArr = [{ x: 8, y: 2 }];
    score = 0;
    scoreBox.innerHTML="Score : " + score;
  }

  // snake getting bigger by eating food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    score+=1;
    if(score>hiscoreval){
      hiscoreval=score;
      localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML="HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML="Score : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random())
    };
  }
  //moving the sanke

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;



  board.innerHTML = "";
  
  //FOOD DISPLAY
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("foodi");
  board.appendChild(foodElement);

  //display the snake
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("headd");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
}
// logic

let hiscore=localStorage.getItem("hiscore");
if(hiscore === null){
  hiscoreval=0;
  localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
  hiscoreval=JSON.parse(hiscore);
  hiscoreBox.innerHTML="HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
   inputDir = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
      console.log("Arrow up");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("Arrow down");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("Arrow left");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("Arrow right");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
