window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();

  };
  let frame = 0;
  let myObstacles = [];
  //Flappy img
  let Faby = function () {
    this.width = 0;
    this.height = 0;
    this.speedX = 0;
    this.speedY = 2;
    this.gravity = 0.9;
    this.gravitySpeed = 0;
    this.update = function () {
      //ctx.clearRect(0,0, canvas.width, canvas.height);
      this.speedY += 2;
    };
    this.newPos = function () { };
    this.draw = function () {
      //bird image
      let birdImage = new Image();
      birdImage.src = 'images/flappy.png';
      // birdImage.onload = function(){
      ctx.drawImage(birdImage, 100, this.gravity * this.speedY, 49.8, 35.1);
      // }

    }
  }

  //Obstacles

  function component(width, height, pipe, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {      
      let pipe = new Image();
      pipe.src = pipe;
      console.log(pipe.src);
      ctx.drawImage(pipe,this.width, this.height, this.x, this.y);
      //ctx.drawImage(pipeImage, width, height, x, y);
    }

    this.newPos = function () {
      this.x += this.speedX;
      this.y += this.speedY;
    }

    this.left = function () { return this.x }
    this.right = function () { return (this.x + this.width) }
    this.top = function () { return this.y }
    this.bottom = function () { return this.y + (this.height) }

    this.crashWith = function (obstacle) {
      return !((this.bottom() < obstacle.top()) ||
        (this.top() > obstacle.bottom()) ||
        (this.right() < obstacle.left()) ||
        (this.left() > obstacle.right()))
    }
    
  }


  //background image
  let img = new Image();    
  img.src = 'images/bg.png';
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ////////////////////////////////
  let backgroundImage = {
    img: img,
    x: 0,
    speed: -1,

    move: function () {
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function () {
      ctx.drawImage(this.img, this.x, 0);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + canvas.width, 0);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, 0);
      }
    },
  }

  let faby = new Faby();

  //Press spacekey to decrement Y  
  document.onkeypress = function (e) {
    if (e.keyCode === 32) {
      //faby.gravity = -0.1;
      faby.speedY -= 50;
    }
  }

  function updateCanvas() {
    frame += 1;
    backgroundImage.move();
    // //for (i = 0; i < myObstacles.length; i += 1) {
    //   if (player.crashWith(myObstacles[i])) {
    //     //myGameArea.stop();
    //     return;
    //   }
    // }

    ctx.clearRect(0, 0, canvas.width, canvas.Height);
    backgroundImage.draw();
    faby.draw();
    faby.update();
    pipes.update();
    //console.log(pipes)
    requestAnimationFrame(updateCanvas);
  }
  
  //function component(width, height, pipe, x, y) {
  let pipes = new component(30, 300, "images/obstacle_bottom.png", 450, 0); 

  // function startGame() {
  //   updateCanvas();
  //   console.log("teste");
  // }

  // startGame();

  img.onload = updateCanvas;
};


