var dino, back, dinoImg, invisibleGround, rock, rockImg, score, banana, bananaImg, backImg, gamestate, sprite;

function preload(){
  dinoImg = loadAnimation("dino1.png","dino2.png","dino3.png", "dino4.png","dino5.png", "dino6.png");
  backImg = loadImage("jungle.jpg");
  bananaImg = loadImage("banana.png");
  rockImg = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  score = 0;
  back = createSprite(camera.x-100, 0);
  back.addImage("back", backImg);
  back.scale = 1;
  back.velocityX = -2;
  dino = createSprite(80,300,20,20);
  dino.addAnimation("dino", dinoImg);
  dino.scale = 0.1;
  dino.setCollider("circle", 0, 0, 400);
  //dino.debug = true;
  invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible = false;
  sprite = createSprite(500,200,10,10);
  sprite.visible = false;
  
  bananaGroup = new Group();
  rockGroup = new Group();
  
  gamestate = "PLAY";
}

function bananas(){
  if(camera.x%90 === 0){
    banana = createSprite(camera.x+400, Math.round(random(120,200)), 10, 10);
    banana.addImage(bananaImg);
    banana.scale = 0.08;
    banana.velocityX = -8;
    banana.lifeTime = 50;
    
    bananaGroup.add(banana);
  }
}

function end(){
  banana.velocityx = 0;
  rock.velocityx = 0;
  back.x = 0;
  banana.x = 3000;
  rock.x = 3000;
  dino.x = 3000;
  background("green");
  stroke("white");
  textSize(20);
  fill("white");
  text("GAME OVER", camera.x-50, 200);
}

function rocks(){
  if(camera.x%200 === 0){
    rock = createSprite(camera.x+400, 320, 10, 10);
    rock.addImage(rockImg);
    rock.scale = 0.25;
    rock.setCollider("circle",0,0,100);
    rock.velocityX = -8;
    rock.lifeTime = 50;
    
    rockGroup.add(rock);
  }
}

function draw() {
  background(253);
  if(gamestate === "PLAY"){
    if (back.x < camera.x){
      back.x+=400;
    }
    camera.x+=4;
    dino.x+=4;
    dino.collide(invisibleGround);
    invisibleGround.x+=4;

    if(keyDown("space") && dino.y>=280){
      dino.velocityY = -13;
    }

    dino.velocityY = dino.velocityY+0.7;

    bananas();
    rocks();

    if(rockGroup.isTouching(dino)){
      dino.scale = 0.08;
      sprite.x +=1;
    }

    if(bananaGroup.isTouching(dino)){
      score = score+2;
      bananaGroup.destroyEach();
    }
    
    switch(score){
      case 10: dino.scale = 0.12;
        break;
      case 20: dino.scale = 0.14;
        break;
      case 30: dino.scale = 0.16;
        break;
      case 40: dino.scale = 0.18;
        break;
      case 50: dino.scale = 0.2;
        break;
      case 60: dino.scale = 0.22;
        break;
      case 70: dino.scale = 0.24;
        break;
      case 80: dino.scale = 0.26;
        break;
      case 90: dino.scale = 0.28;
        break;
      case 100: dino.scale = 0.30;
        break;
      case 110: dino.scale = 0.32;
        break;
      case 120: dino.scale = 0.34;
        break;
      default: break;
    }

    if(sprite.x === 522){
      gamestate = "END";
    }
  }
  
  
  
  else if(gamestate === "END"){
  end();
  }
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score,camera.x-50,50);
}