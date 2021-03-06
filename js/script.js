// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions

var gameScore;
 

 	var canvas = document.getElementById("the_canvas");
 // get 2D context for this canvas
var context = canvas.getContext("2d");
	    // Total Frames
 
 
 
 
// Reading Level Information from a file
  var readJSONFromURL = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };

    xhr.send();
  };

  readJSONFromURL('./data/myPoints.json', function (err, data) {
    if (err != null) {
      console.error(err);
    } else {
      var text = data["score"];
      gameScore = text;
	 console.log("score :", gameScore);
    }
  });
  

function onPageLoad()
{
	console.log("should resize");
	setName();
	context.scale(.25,.25);
	window.innerWidth = window.outerWidth;
	window.innerHeight = window.outerHeight;
	
	'use strict';
	if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service_worker.js');
			   console.log("register function");
    }
	console.log("try to fetch manifest");
}

function onIndexLoad()
{
	
	'use strict';
	if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service_worker.js');
			   console.log("register function");
    }

}
function updateScore() {
    document.getElementById("Points").innerHTML = gameScore;

}
	
	var rawString = window.location.search;
	var search = rawString.split("=");
	console.log(search[0]);
	console.log(search[1]);
    var frames = 6;

    // Current Frame
    var currentFrame = 0;

	var enemyMoving = false;
	var sprite1 = new Image();
	var sprite = new Image();
    sprite.src = "./img/coolSprites.png"; // Frames 1 to 6
	sprite1.src = "./img/1to6.png";






function enemySwitch(){
	enemyMoving = !enemyMoving;
	gameobjects[0].health = 100;
	console.log("switch");
	
}

function setName(){
	
	console.log("setName");
	document.getElementById("Name").innerHTML = search[1];
    console.log("Weapon Selected");
}


function GameObject(name, img, health) {
    this.name = name;
    this.img = img;
    this.health = localStorage.getItem("health");
	console.log(health);
    this.x = 0;
    this.y = 0;
	
}

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input;
}
 
  var initial = new Date().getTime();
  var currentFrame = 0;
  
  var current; // current time

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var player = new GameObject("Player", sprite, 100);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [player, new GameObject("NPC", sprite1, 100)];

// Process keyboard input event
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);

    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37:
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39:
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None"); //No Input
    }
    // console.log("Gamer Input :" + gamerInput.action);
}

function moveLeft(){
	
	gamerInput = new GamerInput("Left");
	console.log("left");
	
}

function moveRight(){
	
	gamerInput = new GamerInput("Right");
	console.log("right");
	gamerInput = new gamerInput("none");
}


function moveUp(){
	
	
	 gamerInput = new GamerInput("Up");
	console.log("up");
}

function moveDown(){
	
	
	 gamerInput = new GamerInput("Down");
	console.log("down");
}


function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
	updateScore();
	
	
    for (i = 0; i < gameobjects.length; i++) {

        if (gamerInput.action === "Up") {
			gameobjects[0].y += -1;
            console.log("Up");
        }
		else if (gamerInput.action === "Down") {
               
                gameobjects[0].y += 1;
                console.log("Down");
            }
		else if (gamerInput.action === "Right") {
               
                gameobjects[0].x += 1;
                console.log("Right");
				
            }
		else if (gamerInput.action === "Left") {
               
                gameobjects[0].x += -1;
                console.log("Left");
            }
		

        if (gameobjects[i].health >= 1) {
            
            // console.log("Health :" + gameobjects[i].health);
          

        } else {
            console.log(gameobjects[i].name + " at X: " + gameobjects[i].x + "  Y: " + gameobjects[i].y + " looks like its not alive :'(");
        }
		
		if (enemyMoving)
		{
		
		if (gameobjects[0].x > gameobjects[1].x)
		{
			gameobjects[1].x +=0.5;
		}
		else if (gameobjects[0].x < gameobjects[1].x)
		{
			gameobjects[1].x -=0.5;
		}
		else if (gameobjects[0].y < gameobjects[1].y)
		{
			gameobjects[1].y -=0.5;
		}
		else if (gameobjects[0].y > gameobjects[1].y)
		{
			gameobjects[1].y +=0.5;
		}
		
	
		
		if (gameobjects[0].x < gameobjects[1].x + 256 &&
			gameobjects[0].x + 256 > gameobjects[1].x &&
			gameobjects[0].y < gameobjects[1].y + 256 &&
			gameobjects[0].y + 256 > gameobjects[1].y) {
				gameobjects[0].health--;
				localStorage.setItem("health", gameobjects[0].health);
				console.log(localStorage.getItem("health"));
				gameobjects[1].x = Math.floor(Math.random() * 1400);
				gameobjects[1].y = Math.floor(Math.random() * 600);
			}
		}
    }
}


function weaponSelection() {
	console.log("weaponSelect");
  var selection = document.getElementById("equipment").value;
  console.log(selection);
  var active = document.getElementById("active");
  console.log(active);
  if (active.checked == true) {
    document.getElementById("HUD").innerHTML = selection + " active ";
    console.log("Weapon Active");
  } else {
    document.getElementById("HUD").innerHTML = selection + " selected ";
    console.log("Weapon Selected");
  }
}



// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");
	
	



    // Sprite
   
	
    for (i = 0; i < gameobjects.length; i++) {
        if (gameobjects[i].health > 0) {
            // console.log("Image :" + gameobjects[i].img);
        }
    }
	
	
	context.clearRect(0, 0, canvas.width * 4, canvas.height * 4);
	context.drawImage(gameobjects[0].img, (sprite.width / 6) * currentFrame, 0, 100, 100, gameobjects[0].x, gameobjects[0].y, 256, 256);
    context.drawImage(gameobjects[1].img, (sprite.width / 6) * currentFrame, 0, 100, 100, gameobjects[1].x, gameobjects[1].y, 256, 256);	
	animate();
	
   var width = 100;
   var height = 20;
   var max = 100;
  

  // Draw the background
  context.fillStyle = "#000000";
 
  context.fillRect(0, 0, width, height);

  // Draw the fill
  context.fillStyle = "#00FF00";
  var fillVal = Math.min(Math.max(gameobjects[0].health / max, 0), 1);
  context.fillRect(0, 0, fillVal * width, height);
	
}




var options = [{
    "text": "This is a selection box",
    "value": "No Weapon",
    "selected": true
  },
  {
    "text": "Pistol",
    "value": "Handgun"
  },
  {
    "text": "Rifle",
    "value": "Sniper Rifle"
  },
  {
    "text": "shotgun",
    "value": "Pump-action shotgun"
  }
];

var selectBox = document.getElementById('equipment');

for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}



function animate() {
	
	
	
    current = new Date().getTime(); // update current
    if (current - initial >= 500) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 
	console.log(currentFrame);
}

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

function reportWindowSize() {
 // window.innerWidth = window.outerWidth;
 // window.innerHeight = window.outerHeight;
 // the_canvas.height = window.innerHeight - 500;
  context.scale(.25,.25);
  console.log("window resized");
}


// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);
window.addEventListener('resize', reportWindowSize);
