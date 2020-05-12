const {Engine, World, Bodies} = Matter;

var engine, world;

var gameState = 'initial';

var ground_1;
var player, player_animation;

var wall1, wall2, wall3, wall4;
var bs1, bs2, bs3, bs4;
var trap1, trap2;

var posGrp;

var coins, coins_grp, coins_ani;
var coin_count = 60;

var invincible, ninja, barrier;

var coin_no = 0;

//DEFINE PRELOAD LATER
function preload(){
    coins_ani = loadImage('sprites/coins.jpg')
}

function setup(){
    engine = Engine.create();
    world = engine.world;

    createCanvas(1500, 800);

    player = createSprite(50, 100, 50, 50);
    ground_1 = createSprite(600, 750, 1200, 25);

    

    coins_grp = createGroup();

    posGrp = createGroup()

    ground_1.x = ground_1.width/2;

}

function draw(){
    Engine.update(engine);
    background(255, 255, 255);

    textSize(18);
    textFont("Georgia");
    textStyle(BOLD);

    text(coin_count, 100, 100);

    player.collide(ground_1);

    if(keyDown("space") && player.y >= 712){
        player.velocityY = -12;
    }

    player.velocityY += 0.8
    if(ground_1.x < 600){
        ground_1.x = ground_1.width/2
    }



    var rand = Math.round(random(1, 3));
    //  console.log(rand);
      //switch(rand){

        // case 1:
          //  wall1.x = 20;
            //wall1.y = 300;

            //bs1.x  = 40
            //bs1.y = 110;

    //     case 2:
    //         wall1.x = 600;
    //         wall1.y = 700;

    //         // bs1.x  = 30;
    //         // bs1.y = 110;

    //     case 3:
    //         wall1.x = 40;
    //         wall1.y = 700;

    //         // bs1.x  = 600;
    //         // bs1.y = 110;

    //  }



    superPowers();

    //NINJA
    if(mousePressedOver(ninja) && gameState === 'play'){
        gameState = 'playNinja';
        coin_count -= 60;
        ninja.visibile = false;
        
    }

    if(gameState === 'playNinja'){
        console.log("ninja active");
        coins_grp.setVelocityXEach(-8);
        ground_1.velocityX = -8
        if(keyDown('space')){
        player.velocityY -= 0.5;
    }
}



    //INVINCIBLE
    if(mousePressedOver(invincible) && gameState == 'play'){
        console.log("invincivble")
        coin_count -= 120;

    }
    //KEYDOWN

    
    if(keyWentDown(RIGHT_ARROW) && gameState === 'initial'){
        gameState = 'play';
        ground_1.velocityX = -4;
        coins_grp.setVelocityXEach(-4);
        posGrp.setVelocityXEach(-4);
    }

    else if(keyWentUp(RIGHT_ARROW)){
        gameState = 'initial';
        ground_1.velocityX = 0;
        coins_grp.setVelocityXEach(0);
        posGrp.setVelocityXEach(0);
    }

    if(gameState === 'play'){
        spcoins();
        obs();
    }

    if(posGrp.x < 0){
        posGrp.destroy();
    }

    console.log(coin_no);

    drawSprites();

}

function spcoins(){
    if(frameCount % 100 == 0){
        var randY = random(600, 700);
        coins = createSprite(1200, randY, 20, 20);
        if(player.isTouching(coins_grp)){
            coins_grp.visibility -= 20;
            coin_count = Math.round((coin_count+1));
            coins.destroy();
        }
        coin_no++;
        coins.addImage(coins_ani);
        coins.scale = 0.2;
        coins.velocityX = ground_1.velocityX;
        coins_grp.add(coins);
        coins.depth = player.depth;
        player.depth += 1

    }
}

function superPowers(){
    if (coin_count >= 60){
        ninja = createSprite(900, 700, 80, 80);
    }

    if(coin_count == 120){
        invincible = createSprite(700, 700, 80, 80);
    }

}

function obs(){
    if(frameCount % 150 === 0){
        wall1 = createSprite(1200, 300, 25, 400);
        posGrp.add(wall1);

        
        wall2 = createSprite(1300, 550, 25, 400);
        posGrp.add(wall2);

        posGrp.setVelocityXEach(-4);
    }
}