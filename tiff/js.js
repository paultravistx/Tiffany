let TimeSquare = 0;
let squareDataSaved = [];
var LiveScore=0;

var keyboard_Letter=["KeyE","KeyR"];
var clickedintime=false;

var oldXdata;
var oldYdata;

var nextIndex=0;

var rando=getRandomInt(0,1);
var gameSpawnTime=1000;

window.addEventListener('DOMContentLoaded', () => {
  const menuSquare = document.getElementById('squareMenu');
  const Ghostsquare = document.createElement('div');

  const boardtable = document.getElementById('boardtable');


  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  menuSquare.addEventListener('mousedown', (e) => {
 
  
    nextSquareLine.style.display = 'block';
    nextSquareLine.style.left = (e.clientX - offsetX) + 'px'; 
    nextSquareLine.style.top = (e.clientY - offsetY) + 'px'; 

    isDragging = true;
    if(offsetX)
    offsetX = e.clientX - menuSquare.getBoundingClientRect().left;
    offsetY = e.clientY - menuSquare.getBoundingClientRect().top;

    Ghostsquare.setAttribute("id", "GhostSquare");
    Ghostsquare.style.width = "50px"; 
    Ghostsquare.style.height = "50px"; 
    Ghostsquare.style.backgroundColor = "gray"; 
    Ghostsquare.style.position = "absolute";

    document.body.appendChild(Ghostsquare);

    document.addEventListener('mousemove', moveSquare);
    document.addEventListener('mouseup', onMouseUp);
  });
  function onMouseUp(e) {
    //const nextSquareLine = document.getElementById('nextSquareLine');
    //nextSquareLine.style.display = 'none';
    if (isDragging) {
      isDragging = false;
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
      

      
      document.removeEventListener('mousemove', moveSquare);
      Ghostsquare.remove();
      if(x>400&&x<800&&y>100&y<550){
      TimeSquare++;

      
      const squareData = {
        x: Math.round(x),
        y: Math.round(y),
        number: TimeSquare
      };
      squareDataSaved.push(squareData);
      boardtable.innerText=boardtable.innerText+squareData.number+","+squareData.x+","+squareData.y+"\n";
      
      const NewSquare = document.createElement('button');
      NewSquare.setAttribute("id", "square");
      NewSquare.style.left = x + "px";
      NewSquare.style.top = y + "px";
      //NewSquare.innerText = TimeSquare + "\n" + Math.round(x) + "," + Math.round(y); position and count
      NewSquare.innerText =keyboard_Letter(rando);
      document.getElementById("canvas").appendChild(NewSquare);
    }
  }
 
  }

  function moveSquare(e) {
    if (isDragging) {
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
      Ghostsquare.style.left = x + "px";
      Ghostsquare.style.top = y + "px";
    }
  }
});
const input = document.body;
const log = document.getElementById("log");

input.addEventListener("keydown", logKey);
var link;

function startCoolDown(){
  var bruh;
    setTimeout(function(){ 
        bruh = true; 
        gameSpawnTime=1000;
        return gameSpawnTime;
    }, 5000);
   
   
}

function logKey(e) {
  log.textContent = `${e.code}`;
  if(log.textContent=="KeyT" && LiveScore>=500){
    gameSpawnTime=5000;
   
    LiveScore=LiveScore-500;
    startCoolDown();
    return gameSpawnTime;
    
  }
  
}
document.getElementById("play").onclick = function() {
  clearBoard();
  createBoardWithDelay();
};

function createBoardWithDelay() {
  clearBoard();
  let index = 0;
  const interval = setInterval(() => {
    if (index >= squareDataSaved.length) {
      clearInterval(interval);
      return;
    }
    
    const square = squareDataSaved[index];
    const futuresquare = squareDataSaved[index+1];
    const NewSquare = document.createElement('button');
    NewSquare.setAttribute("id", "squareLive");
    NewSquare.style.left = square.x + "px";
    NewSquare.style.top = square.y + "px";
    NewSquare.innerText = keyboard_Letter[rando]

    const nextSquare = squareDataSaved[nextIndex];
    const line = document.createElement('div');
    line.setAttribute("id", "nextSquareLine");
    
    line.style.position = 'absolute';
    line.style.left = futuresquare.x + 'px';
    line.style.top = futuresquare.y + 'px';
    line.style.width = 120+ 'px';
    line.style.height = 120+ 'px';
    line.classList.remove('clicksquare'); // reset animation
    void line.offsetWidth; // trigger reflow
    line.classList.add('clicksquare'); // start animation
    line.style.outlineColor='red';
    document.getElementById("canvas").appendChild(line);
  
    // Add timeout to remove the square after 1 second
    let OutLineSquarewidth = 80;
    let OutLineSquareheight = 80;

    var OutLineSquare = document.createElement('button');

    let fadingInterval = setInterval(() => {
      OutLineSquare.setAttribute("id", "GhostSquareOutline");
      OutLineSquare.style.left = square.x + "px";
      OutLineSquare.style.top = square.y + "px";
      OutLineSquareheight = OutLineSquareheight - 1;
      OutLineSquarewidth = OutLineSquarewidth - 1;
      OutLineSquare.style.height = (OutLineSquareheight) + 'px';
      OutLineSquare.style.width = (OutLineSquarewidth) + 'px';

      document.getElementById("canvas").appendChild(OutLineSquare);

      let currentColor = getComputedStyle(NewSquare).backgroundColor;
      let rgbValues = currentColor.match(/\d+/g);
      let newColor = `rgb(${rgbValues[0] - 5},${rgbValues[1] - 5},${rgbValues[2] - 5})`;
      NewSquare.style.backgroundColor = newColor;

    }, 50); // Adjust the speed of color change here
    
    
    
    //nextIndex++;
    
    setTimeout(() => {
      clearInterval(fadingInterval);
      updateGameSpeed();

      if (clickedintime == false) {
       // OutLineSquare.style.backgroundColor = "red";
      }
      clickedintime = false;
      
      NewSquare.remove();
      line.remove();
    

      OutLineSquare.remove();
    }, gameSpawnTime);//how long you have to click until it goes away
    
    NewSquare.onclick = function () {
      NewSquare.remove();
      
   
      
      console.log(NewSquare.style.left,NewSquare.style.top)
      if(log.textContent==keyboard_Letter[rando]){
        LiveScore = LiveScore + 100;
        showPopup(NewSquare.style.left,NewSquare.style.top); // Call the function to show the popup
        
      }
      else{
        LiveScore = LiveScore - 100;

      }
      rando=getRandomInt(0,1);

      
      document.getElementById("LiveScore").innerText = LiveScore;
      //(fadingInterval); // Stop the fading process
      NewSquare.style.backgroundColor = "lime";
      //OutLineSquare.style.backgroundColor = "lime";
      clickedintime = true;
   
      line.remove();
    };

    document.getElementById("canvas").appendChild(NewSquare);

    // Create a line connecting the current square with the next square

    index++;
  }, 1000);

}




function clearBoard() {
  document.querySelectorAll('#canvas button').forEach(square => square.remove());
  TimeSquare = 0;
}

document.getElementById("randomMenu").onclick = function() {

  for(i=1;i<100;i++){
    const squareData = {
    x: getRandomInt(400,800),
    y: getRandomInt(100,500),
    number: i
  };
  
  squareDataSaved.push(squareData);
  //console.log('log')
};
createBoardWithDelay();
}
function getRandomInt(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showPopup(a,b) {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
  popup.classList.add('popup-show');
  popup.style.left= a;
  popup.style.top= b;

  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('popup-show');
  }, 250);
}
function updateGameSpeed(){
  const gamespeed = document.getElementById('gameSpeed');
  gamespeed.innerText=gameSpawnTime;

}

