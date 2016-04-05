
var content = document.getElementById("canvas_content");
var footer = document.getElementById("canvas_footer");
var context = content.getContext("2d");
var context_footer = footer.getContext("2d");
var speed = 1;
var score = 0;
var highscore = 0;
var heart_number = 3;
var monster_number = 1;
var run = true;
var end = false;
var boom_number = 3;
var blood_list = new Array();
var run_requestAnimation;

//storge the highscore
//Use SessionStorage (Can replace sessionStorage by LocalStorage)
if(sessionStorage.getItem("highscore") == null) {
	sessionStorage.setItem("highscore",0);
} else {
	highScore = sessionStorage.getItem("highscore");
}

// Image in game
//background
var background = new Image();
var background_ready = false;
background.onload = function() {
	background_ready = true;
}
background.src = "images/background.jpeg";

//footer
var footer_image = new Image();
var footer_ready = false;
footer_image.onload = function() {
	footer_ready = true;
}
footer_image.src = "images/footer.png";
//monster
var monster_ready = false;
var monster = new Image();
monster.onload = function() {
	monster_ready = true;	
}
monster.src = "images/monster2.png";

//heart
var heart = new Image();
var heart_ready = false;
heart.onload = function() {
	heart_ready = true;
}
heart.src = "images/heart2.png";	

//boom
var boom = new Image();
var boom_ready = false;
boom.onload = function() {
	boom_ready = true;
}
boom.src = "images/boom.png";

//blood
var blood = new Image();
var blood_ready = false;
blood.onload = function() {
	blood_ready = true;
}
blood.src = "images/blood.png";

//pause
var pause = new Image();
var pause_ready = false;
pause.onload = function() {
	pause_ready = true;
}
pause.src = "images/pause1.png";

//reset
var reset = new Image();
var reset_ready = false;
reset.onload = function() {
	reset_ready = true;
}
reset.src = "images/restart.png";

//pause on content
var pause_content = new Image();
pause_content.src = "images/pause1.png";

//blood when monster die
var blood = new Image();
blood.src = "images/blood.png";

//Sound on game
var sound_click = new Audio("sound/click1.mp3");
var sound_boom = new Audio("sound/boom1.mp3");
var sound_gameover = new Audio("sound/gameover.mp3");

//Create Monster
var monster1 = {
	beginX: 0,
	beginY: 0,
	endX: 100,
	endY: 100,
	startX: 0,
	startY: 0,
	stopX: 100,
	stopY: 100,
	speed: speed,
	click: false,
	show: true,
	dieX: 0,
	dieY:0
}
var monster2 = {
	beginX: 190,
	beginY: 0,
	endX: 190,
	endY: 70,
	startX: 190,
	startY: 0,
	stopX: 190,
	stopY: 70,
	speed: speed,
	click: false,
	show: false,
	dieX: 0,
	dieY:0
}
var monster3 = {
	beginX: 390,
	beginY: 0,
	endX: 280,
	endY: 80,
	startX: 390,
	startY: 0,
	stopX: 280,
	stopY: 80,
	speed: speed,
	click: false,
	show: false,
	dieX: 0,
	dieY:0,
	stop: false
}
var monster4 = {
	beginX: 390,
	beginY: 170,
	endX: 290,
	endY: 150,
	startX: 390,
	startY: 180,
	stopX: 290,
	stopY: 150,
	speed: speed,
	click: false,
	show: false,
	dieX: 0,
	dieY:0
}
var monster5 = {
	beginX: 390,
	beginY: 390,
	endX: 280,
	endY: 280,
	startX: 390,
	startY: 390,
	stopX: 280,
	stopY: 280,
	speed: speed,
	click: false,
	show: false,
	dieX: 0,
	dieY:0
}
var monster6 = {
	beginX: 170,
	beginY: 390,
	endX: 170,
	endY: 300,
	startX: 170,
	startY: 390,
	stopX: 170,
	stopY: 300,
	speed: speed,
	click: false,
	show: false,
	dieX: 0,
	dieY:0
}
var monster7 = {
	beginX: 0,
	beginY: 390,
	endX: 110,
	endY: 280,
	startX: 0,
	startY: 390,
	stopX: 110,
	stopY: 280,
	speed: speed,
	click: false,
	show: false,
	dieX: 0,
	dieY:0
}
var monster8 = {
	beginX: 0,
	beginY: 170,
	endX: 90,
	endY: 170,
	startX: 0,
	startY: 170,
	stopX: 90,
	stopY: 170,
	speed: speed,
	click: false,
	show: false,
	dieX: 0,
	dieY:0
}

//draw elements
var render = function() {
	//draw background
	if(background_ready) {
		context.drawImage(background, 0, 0);
	}
	updateblood();
	//draw monster
	if (monster_ready) {
		if(monster1.show) {
			context.drawImage(monster, monster1.startX, monster1.startY, 90, 90);
		}
		if(monster2.show) {
			context.drawImage(monster, monster2.startX, monster2.startY, 90, 90);
		}
		if(monster3.show) {
			context.drawImage(monster, monster3.startX, monster3.startY, 90, 90);
		}
		if(monster4.show) {
			context.drawImage(monster, monster4.startX, monster4.startY, 90, 90);
		}
		if(monster5.show) {
			context.drawImage(monster, monster5.startX, monster5.startY, 90, 90);
		}
		if(monster6.show) {
			context.drawImage(monster, monster6.startX, monster6.startY, 90, 90);
		}
		if(monster7.show) {
			context.drawImage(monster, monster7.startX, monster7.startY, 90, 90);
		}	
		if(monster8.show) {
			context.drawImage(monster, monster8.startX, monster8.startY, 90, 90);
		}
	}

	//draw boom 
	if(boom_ready) {
		var x = 380;
		for(var i = 0; i < boom_number; i++) {
			context.drawImage(boom, x, 0, 30, 30);
			x += 37; //Space between 2 booms
		} 
	}	

	//draw footer background
	if(footer_ready) {
		context_footer.drawImage(footer_image,0,0, 500, 80);
	}

	//draw pause
	if(pause_ready) {
		context_footer.drawImage(pause, 20, 15, 50, 50);
	}

	//draw reset
	if(reset_ready) {
		context_footer.drawImage(reset, 90, 15, 50, 50);	
	}

	//draw heart
	var x_heart = 160;
	for(var i = 0; i <= heart_number; i++) {
	context_footer.drawImage(heart, x_heart, 15, 50, 50);
			x_heart += 35; //Space between 2 hearts
	}

	//draw highscore
	highScore = sessionStorage.getItem("highscore");
	context_footer.beginPath();
	context_footer.fillStyle = "#440066";
	context_footer.rect(350, 45, 150, 30);
	context_footer.fill();
	context_footer.closePath();
	context_footer.beginPath();
	context_footer.fillStyle = "#ffff00"
	context_footer.font = "20px Arial";
	highScore = sessionStorage.getItem("highscore");
	context_footer.fillText("Highscore: " + highscore, 360, 67);
	//draw score
	context_footer.beginPath();
	context_footer.fillStyle = "#440066";
	context_footer.rect(350, 6, 150, 30);
	context_footer.fill();
	context_footer.closePath();
	context_footer.beginPath();
	context_footer.fillStyle = "#ffff00";
	context_footer.font = "20px Arial";
	context_footer.fillText("Scrore: " + score, 360, 28);

	//draw pause icon on content
	if(!run && !end) {
		context.drawImage(pause_content, 175, 175, 150, 150);
	}

	//draw gameover
	if(!run && end) {
		sound_gameover.play();
		context.fillStyle = "#440066";
		context.font = "55px Arial";
		context.fillText("You Lose!", 90, 265);
		//draw new highscore
		if(score > highscore) {
			highscore = score;
			sessionStorage.setItem("highscore", score);
			context.fillStyle = "#440066";
			context.font = "30px Arial";
			context.fillText("NEW HIGH SCORE: " + highscore, 95, 295);
		}
	}
}

//refresh monster on canvas
function refresh(monster) {
	monster.show = false;
	monster.startX = monster.beginX;
	monster.startY = monster.beginY;
	monster.stopX = monster.endX;
	monster.stopY = monster.endY;
	monster.speed = speed;
}

//random monster
function random() {
	if (!monster1.show) {
		refresh(monster1);
	}
	if (!monster2.show) {
		refresh(monster2);
	}
	if (!monster3.show) {
		refresh(monster3);
	}
	if (!monster4.show) {
		refresh(monster4);	
	}
	if (!monster5.show) {
		refresh(monster5);	
	}
	if (!monster6.show) {
		refresh(monster6);
	}
	if (!monster7.show) {
		refresh(monster7);
	}
	if (!monster8.show) {
		refresh(monster8);
	}
	var value = Math.floor((Math.random() * 8) + 1);
	switch(value) {
		case 1:
			if (!monster1.show) {
				monster1.show = true;
			}
			break;
		case 2:
			if (!monster2.show) {
				monster2.show = true;
			}
			break;
		case 3:
			if (!monster3.show) {
				monster3.show = true;
			}
			break;
		case 4:
			if (!monster4.show) {
				monster4.show = true;
			}
			break;
		case 5:
			if (!monster5.show) {
				monster5.show = true;
			}
			break;
		case 6:
			if (!monster6.show) {
				monster6.show = true;
			}
			break;
		case 7:
			if (!monster7.show) {
				monster7.show = true;
		}
			break;
		case 8:
			if (!monster8.show) {
				monster8.show = true;
		}
			break;
	}
}

function updateMonster(monster) {
	monster.click = true;
	if (monster.startX > monster.stopX) {
		monster.startX -= monster.speed;
	} else if (monster.startX < monster.stopX) {
		monster.startX += monster.speed;
	}

	if (monster.startY > monster.stopY) {
		monster.startY -= monster.speed;
	} else if (monster.startY < monster.stopY) {
		monster.startY += monster.speed;
	}

	if (monster.startX == monster.stopX && monster.startY == monster.stopY) {
		monster.startX = monster.stopX;
		monster.startY = monster.stopY;
		monster.stopX = monster.beginX;
		monster.stopY = monster.beginY;
	}

	if (monster.startX == monster.beginX && monster.startY == monster.beginY) {
		monster.show = false;
		monster.stop = true;
		monster.startX = monster.beginX;
		monster.startY = monster.beginY;
		monster.stopX = monster.endX;
		monster.stopY = monster.endY;
		score -= 5;
		heart_number--;
		random();
	}
}

function getBoom() {
	heart_number++;
	score += 5;
	sound_boom.play();
	if(monster1.show) {
		score += 10;
		monster1.show = false;
		monster1.click = false;
		getblood(monster1.startX, monster1.startY);
	}
	if(monster2.show) {
		score += 10;
		monster2.show = false;
		monster2.click = false;
		getblood(monster2.startX, monster2.startY);
	}
	if(monster3.show) {
		score += 10;
		monster3.show = false;
		monster3.click = false;
		getblood(monster3.startX, monster3.startY);
	}
	if(monster4.show) {
		score += 10;
		monster4.show = false;
		monster4.click = false;
		getblood(monster4.startX, monster4.startY);
	}
	if(monster5.show) {
		score += 10;
		monster5.show = false;
		monster5.click = false;
		getblood(monster5.startX, monster5.startY);
	}
	if(monster6.show) {
		score += 10;
		monster6.show = false;
		monster6.click = false;
		getblood(monster6.startX, monster6.startY);
	}
	if(monster7.show) {
		score += 10;
		monster7.show = false;
		monster7.click = false;
		getblood(monster7.startX, monster7.startY);
	}
	if(monster8.show) {
		score += 10;
		monster8.show = false;
		monster8.click = false;
		getblood(monster8.startX, monster8.startY);
	}
	speed = speed;
		setTimeout(function() {
		random();
	}, 1000);
}

function getLevel() {
	var level = Math.floor(score / 100);
	switch(level) {
		case 1: 
			speed = 1;
			monster_number = 2;
			break;
		case 2:
			speed = 1;
			monster_number = 3;
			break;
		case 3:
			speed = 2;
			monster_number = 4;
			break;
		case 4:
			speed = 2;
			monster_number = 5;
			break;
		case 5: 
			speed = 3;
			monster_number = 5;
			break;
		case 6: 
			speed = 3;
			monster_number = 6;
			break;
		case 7: 
			speed = 4;
			monster_number = 7;
			break;
		case 8:
			speed = 4;
			monster_number = 8;
			break;
	}
}
function getblood (x, y) {
	var died = {
		x: x,
		y: y
	};
	blood_list[blood_list.length] = died;
}

function updateblood() {
	if(blood_list.length > 0) {
		for(var i = 0; i < blood_list.length; i++) {
			context.drawImage(blood, blood_list[i].x, blood_list[i].y, 110, 110);
		}
	}
}

function restart() {
	speed = 1;
	score = 0;
	heart_number = 3;
	monster_number = 1;
	run = true;
	end = false;
	boom_number = 3;
	highScore = sessionStorage.getItem("highscore");
	blood_list = new Array();
	refresh(monster1);
	refresh(monster2);
	refresh(monster3);
	refresh(monster4);
	refresh(monster5);
	refresh(monster6);
	refresh(monster7);
	refresh(monster8);
	monster1.show = true;
	main();
}

function clickMonster(monster, x, y) {
	if(monster.click) {
		if(x >= monster.startX && x <= monster.startX + 110 && y >= monster.startY && y <= monster.startY + 110 ) {
			sound_click.play();
			score += 10;
			heart_number++;
			monster.click = false;
			monster.show = false;
			monster.dieX = monster.startX;
			monster.dieY = monster.startY;
			monster.stopX = monster.endX;
			monster.stopY = monster.endY;
			for(var i = 0; i < monster_number; i++)
			{
				random();
			}	
			getblood(monster.dieX, monster.dieY);
		}
	}
}

//event click on canvas
content.addEventListener("click", function(e) {
	score -= 5;
	heart_number--;
	var locationX = e.pageX - this.offsetLeft;
	var locationY = e.pageY - this.offsetTop;
	if(monster1.show) {
		clickMonster(monster1, locationX, locationY);
	}
	if(monster2.show) {
		clickMonster(monster2, locationX, locationY);
	}
	if(monster3.show) {
		clickMonster(monster3, locationX, locationY);
	}
	if(monster4.show) {
		clickMonster(monster4, locationX, locationY);
	}
	if(monster5.show) {
		clickMonster(monster5, locationX, locationY);
	}
	if(monster6.show) {
		clickMonster(monster6, locationX, locationY);
	}
	if(monster7.show) {
		clickMonster(monster7, locationX, locationY);
	}
	if(monster8.show) {
		clickMonster(monster8, locationX, locationY);
	}
	if(locationX > 175 && locationX < 325 && locationY > 175 && locationY < 325) {
		score += 5;
		run = true;
		heart_number++;
		main();
	}
	if((locationY > 0 && locationY < 40) && ((locationX > 380 && locationX < 420) || (locationX > 417 && locationX < 457) || (locationX > 454 && locationX < 494))) {
		boom_number--;
		getBoom();
	}

})

footer.addEventListener("click", function(e) {
	var locationX = e.pageX - this.offsetLeft;
	var locationY = e.pageY - this.offsetTop;
	if(locationX > 20 && locationX < 70 && locationY >= 15 && locationY <= 65) {
		if(run == true) {
			run = false;
		} else {
			run = true;
			main();
		}
	}
	if(locationX > 90 && locationX < 140 && locationY > 15 && locationY < 65) {
		restart();
	}
});

function main() {
	getLevel();
	if (monster1.show) {
		updateMonster(monster1);
	}
	if (monster2.show) {
		updateMonster(monster2);
	}
	if (monster3.show) {
		updateMonster(monster3);
	}
	if (monster4.show) {
		updateMonster(monster4);
	}
	if (monster5.show) {
		updateMonster(monster5);
	}
	if (monster6.show) {
		updateMonster(monster6);
	}
	if (monster7.show) {
		updateMonster(monster7);
	}
	if (monster8.show) {
		updateMonster(monster8);
	}
	if(heart_number < 0) {
		run = false;
		end = true;
	}
	render();
	if(run) {
		cancelAnimationFrame(run_requestAnimation);
		run_requestAnimation = requestAnimationFrame(main);
	}
}

var windows = window;
requestAnimationFrame = windows.requestAnimationFrame || windows.webkitRequestAnimationFrame || windows.msRequestAnimationFrame || windows.mozRequestAnimationFrame;

main();
