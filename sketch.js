var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,ground;
var score = 0;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  monkey = createSprite(40,320,20,20);
  monkey.addAnimation("monkeyRunning" ,monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,370,900,20);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  
  

  
}


function draw() {
  
  background("lightblue");
  
  if(gameState === PLAY){
    
     monkey.collide(ground);
   
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -17;
    }

    ground.velocityX = -(4 + 3* score/100)
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
    if (ground.x < 0){
        ground.x = ground.width/2;
    }
    
    if(monkey.isTouching(obstacleGroup)){
     gameState = END;
    }
     
    spawnFood();
     spawnObstacles(); 
     obstacleGroup = createGroup(); 
     foodGroup = createGroup();  
    
    if(monkey.isTouching(foodGroup)){
    score = score + 1;
    }
    }
   
  else if (gameState === END) {
        ground.velocityX = 0;
        obstacleGroup.destroyEach();
        foodGroup.destroyEach();
   }
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time :  " + survivalTime,100,50);
  
 drawSprites(); 
}

 function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -3;
   
   obstacle.y = 340;
   
   obstacle.addImage(obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = random(100,250);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
}




