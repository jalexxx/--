/*

The Game Project 7 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;

var game_score;
var flagpole;
var lives;
var platform;
var enemies;

var music;

function preload() {
  soundFormats("mp3", "wav");

  //load your sounds here
  music = loadSound("assets/music.wav");
  music.setVolume(0.5);
	
}   
 
function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	lives = 4;
	startGame();
	
}
	
function startGame(){
	gameChar_x = width/2;
	gameChar_y = floorPos_y + 30 ;
	
	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	
	
	// Initialise arrays of scenery objects.
	trees_x = [
		100,
		400, 
		650,
		950,
		1250, 
		1600,
		1900,
		2200,
		2500,
		3000,
		3300
	];
	
	clouds = [ 
		{x_pos: 100, y_pos: 100, size: 140},
		{x_pos: 150, y_pos: 250, size: 150},
		{x_pos: 500, y_pos: 170, size: 140},
		{x_pos: 800, y_pos: 300, size: 170},
		{x_pos: 900, y_pos: 350, size: 180}, 
		{x_pos: 1000, y_pos: 130, size: 180}, 
		{x_pos: 1100, y_pos: 300, size: 180},
		{x_pos: 1200, y_pos: 280, size: 180},
		{x_pos: 1300, y_pos: 200, size: 180},
		{x_pos: 1600, y_pos: 350, size: 180},
		{x_pos: 1900, y_pos: 250, size: 180},
		{x_pos: 1950, y_pos: 100, size: 180},
		{x_pos: 2300, y_pos: 150, size: 180},
		{x_pos: 2300, y_pos: 275, size: 180},
		{x_pos: 2500, y_pos: 200, size: 180},
	];
	
	mountains = [ 
		{ x_pos: 200 , y_pos: floorPos_y} ,
		{ x_pos: 1000, y_pos: floorPos_y} ,
		{ x_pos: 2500, y_pos: floorPos_y} 
	];
	
	canyons = [
		{ x_pos: 200, width: 140},
		{ x_pos: 440, width: 50},
		{ x_pos: 540, width: 50},
		{ x_pos: 620, width: 50},
		{ x_pos: 1000, width: 90},
		{ x_pos: 1350, width: 90},
		{ x_pos: 1950, width: 90},
		{ x_pos: 2550, width: 90},
		{ x_pos: 2790, width: 90},
		{ x_pos: 3500, width: 400} 
	];
	
	collectables = [ 
		{ x_pos: 100, y_pos: 430, size: 50, isFound:  false},
		{ x_pos: 725, y_pos: 430, size: 50, isFound:  false},
		{ x_pos: 400, y_pos: 430, size: 50, isFound:  false},
		{ x_pos: 950, y_pos: 430, size: 50,isFound:  false},
		{ x_pos: 1250, y_pos: 430, size: 50, isFound:  false },
		{ x_pos: 1600, y_pos: 430, size: 50, isFound:  false},
		{ x_pos: 1700, y_pos: 430, size: 50, isFound:  false },
		{ x_pos: 1850, y_pos: 430, size: 50, isFound:  false },
		{ x_pos: 2400, y_pos: 430, size: 50, isFound:  false }, 
		{ x_pos: 2765, y_pos: 430, size: 50, isFound:  false }, 
		{ x_pos: 824, y_pos: 202, size: 50, isFound:  false }, 
		{ x_pos: 205, y_pos: 202, size: 50, isFound:  false }, 
		{ x_pos: 3400, y_pos: 250, size: 50, isFound:  false },
		{ x_pos: 2600, y_pos: 250, size: 50, isFound:  false }
	];
	
	game_score = 0;
  flagpole = {
    x_pos: 4000,
    isReached: false
  };
  lives -=1;
  platform = [];
  enemies = [];
	//adding platforms
 platform.push(createPlatform(300, floorPos_y - 100, 30));
 platform.push(createPlatform(560, floorPos_y - 70, 70));
platform.push(createPlatform(650, floorPos_y - 100, 70));
platform.push(createPlatform(730, floorPos_y - 150 , 70));
platform.push(createPlatform(800, floorPos_y - 220, 70));
platform.push(createPlatform(180, floorPos_y - 220, 70));
platform.push(createPlatform(260, floorPos_y - 160, 30));
platform.push(createPlatform(339   , floorPos_y -40, 30));
platform.push(createPlatform(0  , floorPos_y -40, 30));
platform.push(createPlatform(50, floorPos_y -100, 30));
platform.push(createPlatform(80 , floorPos_y -160, 60));
platform.push(createPlatform(2550, floorPos_y -160, 60));
platform.push(createPlatform(2700 , floorPos_y -160, 60));
platform.push(createPlatform(3500, floorPos_y -160, 400));
platform.push(createPlatform(3400, floorPos_y -100, 100));
platform.push(createPlatform(2540 , floorPos_y - 60, 60));
platform.push(createPlatform(3300 , floorPos_y - 50, 40));
  //adding enemies
 enemies.push(new Enemy(100, floorPos_y, 100, 1));
 enemies.push(new Enemy(780, floorPos_y, 100, 2));
enemies.push(new Enemy(2600 , floorPos_y, 100, 2));
enemies.push(new Enemy(3600 , floorPos_y, 100, 2));
}  


function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
	
	push();
	translate(scrollPos, 0);
	drawClouds();
	drawMountains();
	drawTrees();
	//draws canyons
	for(var i = 0; i < canyons.length; i++)
		{
			drawCanyon(canyons[i]);
			checkCanyon(canyons[i]);
		}


	for(var i = 0; i < collectables.length; i++)
	{
		if(! collectables[i].isFound)
				{
					drawCollectable(collectables[i]);
					checkCollectable(collectables[i]);
				}
		}
	renderFlagpole();
	for (var i = 0; i < platform.length; i++) {
    platform[i].draw();
  }

  // draw enemy
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();
    if (enemies[i].checkEnemy(gameChar_world_x, gameChar_y)) {
      startGame();
      break;
    }
  }


	pop();
	
	// drawing game character
	drawGameChar();
	
		 // Draw Score
	  fill(255);
	  noStroke();
	  textSize(14);
	  text("Score: " + game_score, 20, 20);

	  //Draw lives
	  fill(255);
	  noStroke();
	  text("Lives: " + lives, 920, 20);

	  //Gameover and level complete logic
	  if (lives < 1) {
		textSize(45);
		text("Game over. Press space to continue", 150, 150);
		return;
	  }
	

	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}	
	
 // Logic to make the game character rise and fall.
  if (gameChar_y < floorPos_y) {
    isContact = false;
    for (var i = 0; i < platform.length; i++) {
      if (platform[i].checkPlatform(gameChar_world_x, gameChar_y)) {
        isContact = true;
        break;
      }
    }
    if (isContact == false) {
      gameChar_y += 3;
      isFalling = true;
    } else {
      isFalling = false;
    }
  } else {
    isFalling = false;
  }

	

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
	
	 //checkflagpole
  if (!flagpole.isReached) {
    checkFlagpole();
  }
  //check if character is out if the canvas
  if (gameChar_y > height) {
    if (lives > 0) {
      isPlummeting = false;
      startGame();
    }
}
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	console.log("press" + keyCode);
	console.log("press" + key);
	if (flagpole.isReached && key == " ") {
    nextLevel();
    return;
  } else if (lives == 0 && key == " ") {
    returnToStart();
    return;
  }
	if(keyCode == 65)
		{
			isLeft = true; // a key 
			
		}
	
	if (keyCode == 68)
		{
			isRight = true;// d key
		}
	
	if(key == " ")
		{
			if(!isFalling)
				{
					gameChar_y -= 100;
				}
		}
}

function keyReleased()
{

	console.log("release" + keyCode);
	console.log("release" + key);
	if(keyCode == 65)
		{
			isLeft = false;
		}
	
	if(keyCode == 68 )
		{
			isRight = false;
		}
}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
		
	if(isLeft && isFalling)
		{
			
		// add your jumping-left code
			fill(255, 222, 173);
			ellipse(gameChar_x, gameChar_y - 64, 20, 20);
			rect(gameChar_x , gameChar_y - 20 , 8, 10);
			fill(240, 128, 128);
			rect(gameChar_x -5 ,gameChar_y - 35  , 15  , 15);
			stroke(248 ,248, 255);
			fill (255, 255, 255); 
			rect(gameChar_x -8 , gameChar_y - 50  , 20, 20);
			rect(gameChar_x , gameChar_y -50, 5, 22);
			
		}
	
		else if(isRight && isFalling)
			{
				
			// add your jumping-right code
			fill(255, 222, 173);
			ellipse(gameChar_x, gameChar_y - 64 , 20, 20);
			rect(gameChar_x - 2  , gameChar_y - 20 , 8, 10);
			fill(240, 128, 128);
			rect(gameChar_x -5 ,gameChar_y - 35  , 15  , 15);
			stroke(248 ,248, 255);
			fill (255, 255, 255); 
			rect(gameChar_x -8 , gameChar_y - 50  , 20, 20);
			rect(gameChar_x , gameChar_y -50, 5, 22);
				
			}
	
		else if(isLeft)
			{
				
			// add your walking left code
			fill(255, 222, 173);
			ellipse(gameChar_x, gameChar_y - 64   , 20, 20);
			rect(gameChar_x - 2 , gameChar_y - 17 , 8, 15);
			fill(240, 128, 128);
			rect(gameChar_x - 6   , gameChar_y - 35  , 15  , 20);
			stroke(248 ,248, 255);
			fill (255, 255, 255); 
			rect(gameChar_x - 9, gameChar_y  - 52 , 20, 20);
			rect(gameChar_x - 2  , gameChar_y - 47 , 5, 22);
				
			}
	
		else if(isRight)
			{
				
		// add your walking right code
		fill(255, 222, 173);
		ellipse(gameChar_x, gameChar_y - 65  , 20, 20);
		rect(gameChar_x,gameChar_y - 17  , 8, 15);
		fill(240, 128, 128);
		rect(gameChar_x - 5   , gameChar_y - 35   , 15  , 20);
		stroke(248 ,248, 255);
		fill (255, 255, 255); 
		rect(gameChar_x -8   , gameChar_y - 52  , 20, 20);
		rect(gameChar_x , gameChar_y - 47 , 5, 22);
				
			}
	
		else if(isFalling || isPlummeting)
			{
				
		// add your jumping facing forwards code
		fill(255, 222, 173);
		ellipse(gameChar_x, gameChar_y - 64  , 20, 20);  
		rect(gameChar_x + 2 , gameChar_y - 20  , 8, 15);
		rect(gameChar_x - 8 ,gameChar_y - 22, 8, 10);
		fill(240, 128, 128);
		rect(gameChar_x - 8 , gameChar_y - 35  , 18, 15);
		stroke(248 ,248, 255);
		fill (255, 255, 255); 
		rect(gameChar_x - 8 ,  gameChar_y - 52    , 18, 18);
		rect(gameChar_x - 10 , gameChar_y - 49  , 5, 22);
		rect(gameChar_x + 11 , gameChar_y - 50, 5, 23);
				
			}
	
		else
			{
				
		// add your standing front facing code
		fill(255, 222, 173);
		ellipse(gameChar_x, gameChar_y - 64 , 20, 20);
		rect(gameChar_x - 8  , gameChar_y - 17 , 8, 15);
		rect(gameChar_x + 2 , gameChar_y - 17 , 8, 15); 
		stroke(248 ,248, 255);
		fill (255, 255, 255); 
		rect(gameChar_x - 9 , gameChar_y - 52   , 20, 20);
		rect(gameChar_x - 15 , gameChar_y - 47 , 5, 25);
		rect(gameChar_x + 12 , gameChar_y - 47 ,5,25);
		fill(240, 128, 128);
		noStroke();
		rect(gameChar_x - 8 ,gameChar_y - 32  , 18 , 18);
				
				music.play();
			}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

function drawClouds()
{
	for(var i = 0; i < clouds.length; i++)
		{
			fill(255,255,255); 
			ellipse ( clouds[i].x_pos - 10, clouds[i].y_pos, clouds[i].size,70);
			ellipse ( clouds[i].x_pos - 110, clouds[i].y_pos, clouds[i].size -50, 50);
			ellipse ( clouds[i].x_pos + 90, clouds[i].y_pos, clouds[i].size - 40, 50);
		}	
}

// Function to draw mountains objects.
function drawMountains()
{
	for( var i = 0; i < mountains.length; i++)
		{
			fill (160,  82,  45);
			rect(mountains[i].x_pos - 200 , mountains[i].y_pos  - 230, 399, 230,  20, 15, 5, 10);
			fill(139 , 69 , 19 );
			rect(mountains[i].x_pos - 200 , mountains[i].y_pos - 230, 80, 228 , 70, 0  ,2, 2);
			fill (0 ,128, 0);
			ellipse(mountains[i].x_pos, mountains[i].y_pos - 220, 400, 50);
		}
	
}

// Function to draw trees objects.

function drawTrees()
{
	for(var i = 0; i < trees_x.length; i++)
		{
		fill(139,  69, 19);
		rect(trees_x[i] - 18  , floorPos_y - 85 , 40 , 90);
		fill( 34, 139,  34);
		ellipse( trees_x[i],floorPos_y - 130 , 150  , 150);
		}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
fill(139 , 69 , 19);
			rect(t_canyon.x_pos , floorPos_y, t_canyon.width , 150  );
			
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
	if(gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y)
		{
			isPlummeting = true;
		}
	if (isPlummeting) {
    	gameChar_y += 1;
  }
	
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{

		fill(139,   0,   0);
		rect(t_collectable.x_pos - 25,
			 t_collectable.y_pos - 10,
			 t_collectable.size, 10 );
		fill(0,0,0);
		rect (t_collectable.x_pos - 25,
			  t_collectable.y_pos,
			  t_collectable.size, 10);
		rect(t_collectable.x_pos +  15, 
			 t_collectable.y_pos - 8,
			 t_collectable.size - 45, 5);
		fill(255, 215, 0);
		rect (t_collectable.x_pos - 15, 
			  t_collectable.y_pos - 10, 
			  t_collectable.size - 45 , 10);
		rect(t_collectable.x_pos - 5 ,
			 t_collectable.y_pos - 10,
			 t_collectable.size - 45, 10);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
	
	if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size)
		{
			t_collectable.isFound = true;
			game_score += 1
			
		}
}

function renderFlagpole() {
  push();
  stroke(150);
  strokeWeight(5);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 200);
  if (flagpole.isReached) {
    noStroke();
    fill(255, 0, 0);
    rect(flagpole.x_pos, floorPos_y - 200, 50, 50);
  } else {
    noStroke();
    fill(255, 0, 0);
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
  }
  pop();
}

function checkFlagpole() {
  if (dist(gameChar_world_x, gameChar_y, flagpole.x_pos, floorPos_y) < 40) {
    flagpole.isReached = true;
  }
}

function createPlatform(x_pos, y_pos, width) {
  var platform = {
    x_pos: x_pos,
    y_pos: y_pos,
    width: width,
    draw: function() {
      fill(139,  69,  19);

      rect(this.x_pos, this.y_pos, this.width, 50);

      fill(139,0, 0);
      rect(this.x_pos, this.y_pos, this.width, 30);
    },
    checkPlatform: function(gc_x_pos, gc_y_pos) {
      if (gc_x_pos > this.x_pos && gc_x_pos < this.x_pos + this.width) {
        if (gc_y_pos < this.y_pos && gc_y_pos + 10 > this.y_pos) {
          return true;
        }
      }
      return false;
    }
  };

  return platform;
}

function Enemy(x_pos, y_pos, range, speed) {
  this.x_pos = x_pos;
  this.y_pos = y_pos;
  this.range = range;
  this.current_x = x_pos;
  this.speed = speed;
  // Design of enemy
  this.draw = function() {
    fill(0);
    rect(this.current_x -7 , this.y_pos - 150  , 63 , 150);
	ellipse(this.current_x + 24 ,this.y_pos - 140     , 65 , 73   );
	 fill(255);
	ellipse(this.current_x + 25,this.y_pos - 130 , 45, 60   );
	  fill(0);
	 ellipse(this.current_x + 25,this.y_pos - 110, 15, 5);
	 ellipse(this.current_x + 15,this.y_pos - 130, 5, 3); 
	 ellipse(this.current_x + 35 ,this.y_pos - 130 , 5, 3); 
	 ellipse(this.current_x + 15,this.y_pos - 137 , 10, 5); 
	 ellipse(this.current_x + 35 ,this.y_pos - 137, 10, 5); 
	 fill(128,0,128);
	 rect(this.current_x + 12, this.y_pos - 128 , 5 , 15);
	 rect(this.current_x + 33, this.y_pos - 128, 5 , 15);
	 rect(this.current_x + 33, this.y_pos - 155, 5 , 13);
	 rect(this.current_x + 12, this.y_pos - 155, 5 , 13);
	  
	  
	  
	  
  };
  this.update = function() {
    this.current_x += this.speed;
    if (this.x_pos > this.current_x) {
      this.speed = abs(this.speed);
    } else if (this.x_pos + this.range < this.current_x) {
      this.speed = -this.speed;
    }
  };
  this.checkEnemy = function(gc_x_pos, gc_y_pos) {
    var distance = dist(gc_x_pos, gc_y_pos, this.current_x, this.y_pos);
    //make sure this works after changing the draw function
    if (distance < 40) {
      return true;
    }
    return false;
  };
}
