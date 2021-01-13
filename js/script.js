// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions


 


    var frames = 6;

    // Current Frame
    var currentFrame = 0;


	var enemyMove = true;
	var sprite = new Image();
    sprite.src = "./img/coolSprites.png"; // Frames 1 to 6



function toggleEnemy(){
		enemyMove = !enemyMove;	
	}





function GameObject(name, img, health) {
    this.name = name;
    this.img = sprite;
    this.health = health;
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
var player = new GameObject("Player", "./img/coolSprites.png", 100);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [player, new GameObject("NPC", "coolSprites.png", 100)];

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

function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
    for (i = 0; i < gameobjects.length; i++) {

        if (gamerInput.action === "Up") {
            gameobjects[i].health = 100;
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
	
		if (enemyMove === true)
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
			
			if (gameobjects[0].y === gameobjects[1].y && gameobjects[0].x === gameobjects[1].x)
			{
				gameobjects[1].x = 0;
				gameobjects[1].y = 0;
				gameobjects[0].health--;
			}
		}
		
    }
}

	
// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");
	
	
	
	var canvas = document.getElementById("the_canvas");
    // get 2D context for this canvas
    var context = canvas.getContext("2d");
	    // Total Frames


    // Sprite
   
	
    for (i = 0; i < gameobjects.length; i++) {
        if (gameobjects[i].health > 0) {
            // console.log("Image :" + gameobjects[i].img);
        }
    }
	
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(gameobjects[0].img, (sprite.width / 6) * currentFrame, 0, 100, 100, gameobjects[0].x, gameobjects[0].y, 256, 256);
    context.drawImage(gameobjects[1].img, (sprite.width / 6) * currentFrame, 0, 100, 100, gameobjects[1].x, gameobjects[1].y, 256, 256);	
	animate();
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

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);

