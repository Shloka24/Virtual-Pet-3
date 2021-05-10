class Food{
    constructor(){
        this.image = loadImage("Milk.png");
        this.foodStock = 0;
    }

    getFoodStock(){
         this.foodStock = database.ref('Food');
        this.foodStock.on("value", function(data){
            foodS = data.val();
        });
    }

    updateFoodStock(stock){
      database.ref('/').update({
          foodS: stock
      })
        
    }

    deductFoodStock(){
        if(foodS<= 0){
            foodS = 0;
        }else{
            foodS = foodS - 1;
        }
        
    }
    bedroom(){
        background(bedroomImg, 800, 600)
    }
    washroom(){
        background(washroomImg, 800, 600);
    }
    garden(){
        background(gardenImg, 800, 600);
    }
    

    

    
    display(){

        var x = 20 , y = 150

        if(foodS !== 0){
            for(var i = 0; i<foodS; i++){
                if(i%10 === 0){
                    x = 20;
                    y = y+60;
                }
                image(this.image, x, y, 70, 70);
                x = x+40;
            }
        }

    }

    
    
}