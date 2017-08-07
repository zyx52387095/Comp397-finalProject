<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0;">
	<style>
		body{margin:0;padding:0;}
		.view{width: 700px;height:500px;position: relative;}
		#coins{width:90px;height: 70px;line-height: 70px;position:absolute;left:0px;top:0;padding-left: 60px;background:url(image/coins.png) no-repeat;background-size:30px 30px;background-position:20px 20px;font-size: 34px;color: #FFF;}
	</style>
	<title>简单跑酷游戏</title>
	<script src="easeljs-0.7.1.min.js"></script>
	<script src="preloadjs-0.4.1.min.js"></script>
	<script src="megaman.js"></script>
</head>
<body>
	<div class="view">
		<canvas id="cas" width="700" height="500">您的浏览器不支持canvas</canvas>
		<div id="coins">0</div>
	</div>
	<div id="showFPS" style="display: none;"></div>
	<script>
		var KEYCODE_W = 87;			//usefull keycode
var KEYCODE_A = 65;			//usefull keycode
var KEYCODE_D = 68;			//usefull keycode
var KEYCODE_S = 83;			//usefull keycode

// Movement flags
var moveRight = false;
var moveLeft = false;
var moveUp = false;
var moveDown = false;

var advance = 3;

var stage,
	carrito;

var init = function() {
	stage = new createjs.Stage(document.getElementById("canvas"));
	carrito = new createjs.Bitmap("img/car.png");
	carrito.regX = carrito.image.width * 0.5;
	carrito.regY = carrito.image.height * 0.5;
	carrito.x = stage.canvas.width * 0.5;
	carrito.y = stage.canvas.height * 0.5;

	console.log(stage);
	console.log(carrito);
	stage.addChild(carrito);

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(window);
};
  
var tick = function() {
	//console.log("TICK");
	var advanceX = 0, advanceY = 0;

	if(!!moveUp){
		advanceY = -advance;
		carrito.rotation = 0;
	}

	if(!!moveDown){
		advanceY = advance;
		carrito.rotation = 180;
	}

	if(!!moveRight){
		advanceX = advance;
		carrito.rotation = 90;
	}

	if(!!moveLeft){
		advanceX = -advance;
		carrito.rotation = -90;
	}

	carrito.x += advanceX;
	carrito.y += advanceY;


	//vertical space loop
	if((carrito.y - carrito.image.height * 0.5) > stage.canvas.height){
		carrito.y = -(carrito.image.height * 0.5);
	}

	if((carrito.y + carrito.image.height * 0.5) < 0){
		carrito.y = stage.canvas.height + (carrito.image.height * 0.5);
	}

	//horizontal space loop
	if((carrito.x - carrito.image.width * 0.5) > stage.canvas.width){
		carrito.x = -(carrito.image.width * 0.5);
	}

	if((carrito.x + carrito.image.width * 0.5) < 0){
		carrito.x = stage.canvas.width + (carrito.image.width * 0.5);
	}

	stage.update();
};

var handleKeyDown = function(e){
	if(!e){var e = window.event;}

	switch(e.keyCode){
		case KEYCODE_W:
			moveUp = true;
			moveDown = false;
			moveLeft = false;
			moveRight = false;
			break;
		case KEYCODE_S:
			moveDown = true;
			moveUp = false;
			moveLeft = false;
			moveRight = false;
		break;
		case KEYCODE_A:
			moveLeft = true;
			moveUp = false;
			moveDown = false;
			moveRight = false;
			break;
		case KEYCODE_D:
			moveRight = true;
			moveUp = false;
			moveDown = false;
			moveLeft = false;
			break;
	}

	//console.log(e.keyCode);
};

var handleKeyUp = function(e){
	if (!e) {var e = window.event;}

	switch(e.keyCode){
		case KEYCODE_W: moveUp = false; break;
		case KEYCODE_S: moveDown = false; break;
		case KEYCODE_A: moveLeft = false; break;
		case KEYCODE_D: moveRight = false; break;
	}
	//console.log(e.keyCode);
};

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
	</script>
</body>
</html>