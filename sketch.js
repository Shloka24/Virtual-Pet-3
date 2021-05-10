var dog, dogImg, dogBark;
var happyDogImg, bg;
var database;
var foodS, foodStock;
var foodI, foodImg;
var feedB, addB, enterB;
var fedTime, lastFed;
var gameState, gameStateRef;
var bedroomImg, washRoomImg, gardenImg;


function preload()
{
   dogImg = loadImage("Dog.png");
   happyDogImg = loadImage("happydog.png");
   bg = loadImage("background.jpg");
   bedroomImg = loadImage("Bed Room.png");
   washroomImg = loadImage("Wash Room.png");
   gardenImg = loadImage("Garden.png");
   dogBark = loadSound("dogWoof.mp3");
   foodImg = loadImage("Food Stock.png");
   foodStockImg = loadImage("Food Stock.png");
   
}

function setup(){
database = firebase.database();
 createCanvas(800,600);

gameStateRef = database.ref('gameState');
gameStateRef.on("value", function(data){
  gameState = data.val();
})

fedTime = database.ref('FeedTime');
fedTime.on("value", function (data){
  lastFed = data.val();
})

foodI = new Food();
foodI.getFoodStock();

dog  = createSprite(650, 450, 50, 50);
dog.scale = 0.3;
dog.addImage(dogImg);

foodBowl = createSprite(500, 500, 50, 50);
foodBowl.addImage(foodStockImg);
foodBowl.scale = 0.2;

feedB = createButton('FEED YOUR DOG');
feedB.position(600, 150);
feedB.mousePressed(feedDog);

addB = createButton('ADD FOOD');
addB.position(800, 150);
addB.mousePressed(addFood);



}


function draw() {  
background(bg);

foodI.display();

  drawSprites();
  
  fill("black");
  textSize(25);
  if(lastFed>= 12){
    text("Last Feed:"+ lastFed%12 + "PM", 80, 50);
  }else if(lastFed === 0){
    text("Last Feed: 12 AM", 100, 100);
  }else {
    text("Last Feed:" + lastFed + "AM", 80, 50);
  }

  currentTime = hour();
  fill("black");
  textSize(25);
  if(currentTime === lastFed +1){
    update("Playing");
    foodI.garden();
    text("Look! Tommy is playing in the garden and enjoying!!", 10, 50);
  }else if(currentTime === lastFed +2){
    update("Sleeping");
    foodI.bedroom();
    text("Tommy is sleeping at this time. Shhh...!", 30, 50);
  }else if(currentTime> (lastFed+3) && (currentTime<= lastFed+4)){
    update("Bathing");
    foodI.washroom();
    text("Tommy is bathing! Pls. go outside, it's private", 3, 50);
  }else{
    update("Hungry");
    gameState = "Hungry";
    foodI.display();
    strokeWeight(20);
     textSize(30);
     fill("black");
     text("Food Remaining:" + foodS, 500, 300);
     text("Tommy is hungry! Feed him food..", 180, 200);
    
    
  }

  if(gameState!== "Hungry"){
    feedB.hide();
    addB.hide();
    dog.remove();
    foodBowl.remove();
  }else{
    feedB.show();
    addB.show();
    foodBowl.addImage(foodStockImg);
    dog.addImage(dogImg);
  
  }


}

function readStock(data){
  foodS = data.val();
  foodI.updateFoodStock(foodS);
  foodI.deductFoodStock();
  
}




function feedDog(){
   dog.addImage(happyDogImg);
   dogBark.play();
   foodI.deductFoodStock();
   foodI.updateFoodStock(foodS);
   database.ref('/').update({
     Food: foodS,
     FeedTime: hour()
})
   
   }   


function addFood(){
  dog.addImage(dogImg);
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function update(state){
  database.ref('gameState').update({
    gameState: state
  })
}