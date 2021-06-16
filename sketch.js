//declaring global variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var back, backI;

var ground, platfrm;

var monkey, monkeyI;
var obstacle, obstacleI, obstacleGroup;
var banana, bananaI, foodGroup;

var gameOver, gameOverI;

var score;
var survivalTym = 0;

function preload() {

  //loading images n animations
  monkeyI = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  backI = loadImage("jungle.png");
  platfrm = loadImage("platfrm.png");

  bananaI = loadImage("banana.png");
  obstacleI = loadImage("obstacle.png");

  gameOverI = loadImage("GO.png");


  //adding/creating new groups
  obstacleGroup = new Group();
  foodGroup = new Group();
}

function setup() {
  createCanvas(500, 400);

  //background
  back = createSprite(250, 200);
  back.addImage(backI);
  back.scale = 1.8;

  //ground/platform
  ground = createSprite(250, 350);
  ground.addImage(platfrm);
  ground.scale = 0.5;

  //monkey
  monkey = createSprite(35, 315, 20, 20);
  monkey.addAnimation("moving", monkeyI);
  monkey.scale = 0.1;

  //make the initial score 0
  score = 0;
}


function draw() {
  //clear the background
  background("lightgreen");

  //display text for "SCORE"
  fill("black");
  textFont("broadway");
  textSize(20);
  text("SCORE : " + score, 370, 30);

  //Survival time
  fill("black");
  textSize(20);
  text("SURVIVAL TIME : " + survivalTym, 10, 30);

  //play state
  if (gameState === PLAY) {

    //calculate survival time
    survivalTym = Math.ceil(frameCount / frameRate());

    //making the monkey jump
    if (keyDown("space") && monkey.y >= 290) {
      monkey.velocityY = -10;
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.5;
    monkey.collide(ground);

    //increasescore if the monkey touches any banana
    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score + 1;
      monkey.scale = monkey.scale + 0.01;
    }

    //increase the size of monkey when according to its score
    /*switch (score) {
      case 2:
        monkey.scale = 0.12;
        break;
      case 3:
        monkey.scale = 0.14;
        break;
      case 6:
        monkey.scale = 0.16;
        break;
      case 9:
        monkey.scale = 0.18;
        break;
      default:
        break;
    }*/

    //call the obstacle n food functions
    obs();
    food();

    //changing the state
    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
     // monkey.scale = 0.1;
    }

    //end state
  } else if (gameState === END) {

    //makr the ground invisible
    ground.visible = false;

    //destroy the monkey
    monkey.velocityY = 0;
    monkey.lifetime = 0;

    //destroy the respective groups
    obstacleGroup.setLifetimeEach(0);
    foodGroup.setLifetimeEach(0);

    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    //GAMEOVER
    fill("black");
    textFont("broadway");
    textSize(30);
    text("GAME OVER!!", 150, 385);
  }

  //display output
  drawSprites()
}

//function for obstacle
function obs() {
  if (frameCount % 140 === 0) {
    //creating the obstacles as local  variable
    var obstacle = createSprite(500, 305, 10, 10);
    obstacle.addImage(obstacleI);
    obstacle.scale = 0.17;

    //moving the obstacles
    obstacle.velocityX = -5;

    //giving the obstacles a lifetime
    obstacle.lifetime = 250;

    //obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 200);

    //adding obstacle in its group
    obstacleGroup.add(obstacle);

  }
}

//function for food
function food() {
  if (frameCount % 190 === 0) {
    //creating the bananas
    banana = createSprite(500, Math.round(random(200, 250)));
    banana.addImage(bananaI);
    banana.scale = 0.1;

    //moving the banana
    banana.velocityX = -4;

    //giving the banana a lifetime
    banana.lifetime = 250;

    //banana.debug = true;
    banana.setCollider("circle", 0, 0, 200);

    //adding banana in its group
    foodGroup.add(banana);
  }
}

//#DhRiTi
//#DD
