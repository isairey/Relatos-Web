function percent(){
      screenWidth = screen.availWidth;
      screenHeight = screen.availHeight;

      function constructor(){
          this.getWidth = function(){
              return screenWidth;
          }
          this.getHeight = function(){
              return screenHeight;
          }
          this.width = function(percentage){
			return Math.round((screenWidth*percentage)/100)
          }
          this.height = function(percentage){
			return Math.round((screenHeight*percentage)/100)
          }
      }

     return new constructor();
   }
