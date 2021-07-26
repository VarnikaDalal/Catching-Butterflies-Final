var backImage, girlImg, bflyImg,edges, invground;
var FoodGroup,score;
var stoneImg,stonegrp;

function preload(){
  backImage = loadImage("forest.png")
  girlImg=loadImage("girl.png")
  bflyImg=loadImage("bfly.png")
  stoneImg=loadImage("stone.png");
}

function setup() {
  createCanvas(1500,820);
  FoodGroup = createGroup();
  stonegrp = createGroup();
  forest=createSprite(750,350,600,10);
  forest.addImage("forest", backImage);
  girl=createSprite(200,400,10,10);
  girl.addImage("girl", girlImg);
  girl.scale=.1;
  //bfly=createSprite(500,300,10,10);
  //bfly.addImage("bfly", bflyImg);
  //bfly.scale=.1;
  invground = createSprite(width / 2, 550, width, 10);
  invground.visible = false;
  score=0;
}


function draw() {
  background("forest");  

  if(keyDown("space")){
    girl.velocityY = -7;
  }

  food();
  obstacles();


  girl.velocityY = girl.velocityY + 0.5;
  forest.velocityX=-6;
  
  if (forest.x<600){
    forest.x=forest.width/2;
  }

  if(girl.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    score = score+10;
  }
  if(girl.isTouching(stonegrp)) {
    stonegrp.destroyEach();
    score = score-5;
  }
  
  if (score===30){
    bfly.velocityX=-10;
  }



  //stop trex from falling down
  girl.collide(invground)
  drawSprites();

  fill("Black");
  textSize(22);
  stroke("white");
  strokeWeight(2);
  text("Score: " + score, 100, 100);
}


function food() {
  if (frameCount % 200 === 0) {
    bfly = createSprite(1550,100,40,10);
    bfly.addImage("bfly", bflyImg);
    bfly.y = Math.round(random(120,200));
    bfly.scale = 0.1;
    
    bfly.velocityX = -7;
    bfly.lifetime = 800;
    
    FoodGroup.add(bfly);
  }
}


function obstacles(){
  if (frameCount % 170===0){
    var stone = createSprite(width,450);
    stone.addImage("stone",stoneImg);
    stone.scale = 0.1;
    stone.velocityX=-7;
    stone.lifetime=800;
    stonegrp.add(stone);
  }
}