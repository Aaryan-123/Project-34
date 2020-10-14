//Create variables here
var dogImg;
var happyDogImg;
var database;
var foods;
var foodstock;

function preload()
{
  //load images here
  
  dogImg = loadImage('Dog.png');
  happyDogImg = loadImage('happydog(1).png');
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage(dogImg);

  database = firebase.database();
  
  foodstock = database.ref('Food');
  foodstock.on("value", readStock);
}

function draw() {
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foods);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  fill("white");
  textSize(15);
  text("Note: Press UP_ARROW key to feed drago milk!")

  fill("white");
  textSize(20);
  text("Food remaining : " + foods);
}

function readStock(data) {
  foods = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}
