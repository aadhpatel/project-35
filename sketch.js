//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var dog1
var happy1
var feed
var addFood;
var fedTime
var lastFed;
var foodObj;

function preload()
{
  //load images here
dog1=loadImage("images/dogImg.png");
happy1=loadImage("images/dogImg1.png");

}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  foodStock=database.ref('Food');
  foodStock.on('value',readStock);
 dog=createSprite(100,200,20,20);

 foodObj=new Food(100,200,30,30);

 function feedDog() {
   dog.addImage(happyDog);

   feed=createButton("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);

    addFood=createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);

   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour()
   })
 }

 function addFoods() {
   foodS++;
   database.ref('/').update({
     Food:foodS
   })
 }


}


function draw() {  
background(46, 139, 87);
 

drawSprites();

text("Note:Press UP_ARROW Key to feed dog milk!",10,200);
text("Food Remaining:"+foodStock, 50,200);
  //add styles here

  textSize(20);
  fill("white");
  stroke("purple");

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();

    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Fed : 12 AM",350,30);
    }else{
      text("Last Fed : "+lastFed + "AM", 350,30);
    }
  });


  
}

 function readStock(data){
   foodS=data.val();
 }

 function writeStock(x) {

  if(x<-0) {
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
 }

 function addFood() {
if(button.mousePressed) {
  database=+1;
}
 }


 function feedDog() {
hour(database);
happyDog=addImage(happy1);

 }



