var getRandom = function(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}
var drawArea = function(){
	ctx.drawImage(grass,xArea,yArea);
	xArea += 64;
	if(xArea == 960){
		yArea += 64;
		xArea = 0;
		if(yArea == 448){
			drawInterface();
			drawTeam();
		}else{
			requestAnimFrame(drawArea);
		}
	}else{
		requestAnimFrame(drawArea);
	}
}
var checkEnemyDeath = function(){
	if(stateGame){
		if(stateLife){
			ctx.fillStyle = ("black");
			ctx.fillRect(721,454,75,56);
			ctx.font = ("40px Verdana, sans-serif");
			ctx.fillStyle = ("red");
			ctx.fillText(enemyDeath,745,495);
			ctx.fillStyle = ("blue");
			ctx.fillText(enemyCol,745,555);
		}
	}
}
var checkState = function(){
	if(enemyDeath == enemyCol){
		stopTimer = 4;
		if(lang == "RU"){
			ctx.drawImage(winRU,0,0);
		}else if(lang == "EN"){
			ctx.drawImage(winEN,0,0);
		}
	}
	if(hp <= 0){
		stopTimer = 4;
		stateLife = false;
		if(lang == "RU"){
			ctx.drawImage(loseRU,0,0);
		}else if(lang == "EN"){
			ctx.drawImage(loseEN,0,0);
		}
	}
}
var checkEnemyHP = function(){
	if(stateGame){
		if(stateLife){
			if(typeTimer == "player"){
				for(var i = 1;i < enemyList.length;i ++){
					if(enemyList[i].hp > 0){
						ctx.drawImage(enemyHP,enemyList[i].x * 64 - 64,enemyList[i].y * 64 - 64);
						ctx.fillStyle = ("red");
						if(enemyList[i].maxHP == 100){
							enemyHPCol = enemyList[i].hp * 0.48;
						}else{
							enemyHPCol = 48;
						}
						ctx.fillRect(enemyList[i].x * 64 - 56,enemyList[i].y * 64 - 61,enemyHPCol,6);
					}
				}
			}
		}
	}
}
var checkBlock = function(type,x,y){
	if((x == 8) && (y == 1)){
		return false;
	}else if(type == "block"){
		if(mapArea[y-1][x-1] != "3_1"){
			return true;
		}else{
			return false;
		}
	}else if(type == "player"){
		if(mapArea[y-1][x-1] != "1_1" && mapArea[y-1][x-1] != "1_1_1"){
			return true;
		}else{
			return false;
		}
	}else if(type == "enemy"){
		if(mapArea[y-1][x-1] != "2_1"){
			return true;
		}else{
			return false;
		}
	}
}
var updateMap = function(num,x,y){
	mapArea[y-1][x-1] = num;
	if(num == "1_1"){
		xOldHero = xHero;
		yOldHero = yHero;
		xHero = x;
		yHero = y;
		xCordHero = xHero * 64;
		yCordHero = yHero * 64;
		type = warrior;
	}else if(num == "1_1_1"){
		type = warriorSkill1;
	}else if(num == "2_1"){
		if(typeTimer == "enemy"){
			enemyTime += 200;
		}else if(typeTimer == "player"){
			enemyTime = 0;
		}
		setTimeout(function(){
			type = dog;
			ctx.drawImage(type,(x-1)*64,(y-1)*64);
		},enemyTime);
		if(enemyStepCol == enemyCol - 1){
			setTimeout(function(){stopTimer = "3";},enemyTime);
			return;
		}else{
			return;
		}
	}else if(num == "(3)"){
		setTimeout(function(){
			type = grass;
			ctx.drawImage(type,(x-1)*64,(y-1)*64);
		},enemyTime + 50);
		return;
	}else if(num == "3"){
		type = grass;
	}else if(num == "3_1"){
		type = stone;
	}else if(num == "3_2"){
		type = blueGrass;
	}else if(num == "3_3"){
		type = redGrass;
	}
	ctx.drawImage(type,(x-1)*64,(y-1)*64);
}
var drawInterface = function(){
	stateInventory = false;
	stateSettings = false;
	stateInterface = true;
	ctx.drawImage(interface,0,448);
	if(hero == warrior){
		ctx.drawImage(intWar1,6,454);
	}
}
var drawInventory = function(){
	stateInterface = false;
	stateInventory = true;
	ctx.drawImage(inventory,0,448);
}
var drawSettings = function(){
	stateInterface = false;
	stateSettings = true;
	if(lang == "EN"){
		ctx.drawImage(settingsEN,0,448);
	}else if(lang == "RU"){
		ctx.drawImage(settingsRU,0,448);
	}
}
var nextStep = function(){
	if(typeTimer == "player"){
		stateChoosePos = true;
		typeTimer = "player";
		runTimer();
	}else if(typeTimer == "enemy"){
		stateChoosePos = false;
		enemyTime = 0;
		enemyStepCol = 0;
		typeTimer = "enemy";
		runTimer();
		stepEnemy();
	}else if(typeTimer == "start"){
		stateChoosePos = true;
		stateChooseStart = true;
		typeTimer = "start";
		updateMap("3_2",3,2);
		updateMap("3_2",2,4);
		updateMap("3_2",3,6);
		updateMap("1_1",2,4);
		runTimer();
	}
}
var runTimer = function(){
	s -= 1;
	ctx.drawImage(timer,448,0);
	ctx.font = ("40px Verdana, sans-serif");
	if(typeTimer == "player"){
		ctx.fillStyle = ("green");
	}else if(typeTimer == "enemy"){
		ctx.fillStyle = ("red");
	}else if(typeTimer == "start"){
		ctx.fillStyle = ("blue");
	}
	ctx.fillText(s,455,45);
	if(s <= 0){
		if(typeTimer == "player"){
			s = 10;
			stopTimer = 0;
			typeTimer = "enemy";
			nextStep();
			stateChoosePos = false;
		}else if(typeTimer == "enemy"){
			step = maxStep;
			s = 30;
			stateChoosePos = true;
			stopTimer = 0;
			typeTimer = "player";
			nextStep();
		}else if(typeTimer == "start"){
			step = maxStep;
			s = 30;
			stateChoosePos = false;
			stateChooseStart = false;
			updateMap("3",3,2);
			updateMap("3",2,4);
			updateMap("3",3,6);
			updateMap("1_1",xHero,yHero);
			stopTimer = 0;
			typeTimer = "player";
			nextStep();
		}else{
			alert("Wrong!");
		}
	}else if(stopTimer != 0){
		if(stopTimer == 1){
			s = 30;
			stateChoosePos = false;
			stateChooseStart = false;
			updateMap("3",3,2);
			updateMap("3",2,4);
			updateMap("3",3,6);
			updateMap("1_1",xHero,yHero);
			stateMove = true;
			stopTimer = 0;
			typeTimer = "player";
			nextStep();
		}else if(stopTimer == 2){
			step = maxStep;
			mana = maxMana;
			s = 10;
			stopTimer = 0;
			typeTimer = "enemy";
			nextStep();
			stateChoosePos = false;
		}else if(stopTimer == 3){
			step = maxStep;
			mana = maxMana;
			s = 30;
			stateChoosePos = true;
			stopTimer = 0;
			typeTimer = "player";
			nextStep();
		}else if(stopTimer == 4){
			return true;
		}
	}else{
		setTimeout(runTimer,1000);
	}
}
var drawBlockTeam = function(){
	r = getRandom(4,6);
	while(r != 0){
		r -= 1;
		xBlock = getRandom(0,15);
		yBlock = getRandom(0,7);
		if("block",xBlock,yBlock){
			if(checkBlock("player",xBlock,yBlock)){
				if(checkBlock("enemy",xBlock,yBlock)){
					updateMap("3_1",xBlock,yBlock);
				}else{
					r += 1;
				}
			}else{
				r += 1;
			}
		}else{
			r += 1;
		}
	}
}
var drawTeam = function(){
	drawBlockTeam();
	drawEnemyTeam();
	drawPlayerTeam();
	setInterval(gameLoop,1000/60);
	if(stateLife){
		typeTimer = "start";
		nextStep();
	}
}
var stepStart = function(){
	if(xCanvasBlock == 3){
		if(yCanvasBlock == 2){
			updateMap("3_2",xHero,yHero);
			updateMap("1_1",3,2);
		}else if(yCanvasBlock == 6){
			updateMap("3_2",xHero,yHero);
			updateMap("1_1",3,6);
		}
	}else if(xCanvasBlock == 2){
		if(yCanvasBlock == 4){
			updateMap("3_2",xHero,yHero);
			updateMap("1_1",2,4);
		}
	}else if(xCanvasBlock == 8){
		if(yCanvasBlock == 1){
			stopTimer = 1;
		}
	}
}
//Клавиатура
window.onkeydown = function(e){
	if(stateGame){
		if(stateChoosePos){
			if(!stateChooseStart){
				if(e.keyCode == 13){//Enter
					if(typeTimer == "player"){
						stopTimer = 2;
					}
				}else if(hero == warrior){
					if(stateInterface){
						if(e.keyCode == 49){//1
							if(stateMove){
								skill(1);
							}else if(stateAttack){
								if(nowSkill != "1"){
									skill(1);
								}else if(nowSkill == "1"){
									unSkill(1);
								}
							}
						}else if(e.keyCode == 50){//2
							
						}else if(e.keyCode == 51){//3

						}else if(e.keyCode == 52){//4

						}else if(e.keyCode == 53){//5

						}else if(e.keyCode == 54){//6

						}else if(e.keyCode == 55){//7

						}else if(e.keyCode == 56){//8
							
						}
					}
				}
			}
		}
	}else if(stateTutorial){
		if(e.keyCode == 13){
			if(slide == 1){
				slide = 2;
				if(lang == "RU"){
					ctx.drawImage(imageTutorial1_2RU,0,0);
				}else if(lang == "EN"){
					ctx.drawImage(imageTutorial1_2EN,0,0);
				}
			}else if(slide == 2){
				startGame();
			}
		}
	}
}
//Мышь
canvas.onclick = function(e){
	xCanvas = e.pageX - canvas.offsetLeft - 8;
	yCanvas = e.pageY - canvas.offsetTop - 8;
	xCanvasBlock = (Math.floor(xCanvas / 64)) + 1;
	yCanvasBlock = (Math.floor(yCanvas / 64)) + 1;
	if(stateMenu){
		if((xCanvas > 330) && (xCanvas < 630)){
			if((yCanvas > 200) && (yCanvas < 300)){
				startTutorial();
				xCanvas = null;
			}else if(yCanvas > 301 && yCanvas < 401){
				openInfo();
				xCanvas = null;
			}
		}else if(xCanvas > 5 && xCanvas < 95){
			if(yCanvas > 5 && yCanvas < 45){
				lang = "EN";
				startMenu();
			}else if(yCanvas > 50 && yCanvas < 90){
				lang = "RU";
				startMenu();
			}
		}else if(xCanvas > 885 && xCanvas < 960){
			if(yCanvas > 0 && yCanvas < 56){
				if(volumeTheme){
					volumeTheme = false;
					audioTheme.setVolume(0);
					startMenu();
				}else{
					volumeTheme = true;
					audioTheme.setVolume(1);
					startMenu();
				}
			}
		}
	}else if(stateInfo){
		if(xCanvas > 400 && xCanvas < 600){
			if(yCanvas > 500 && yCanvas < 555){
				startMenu();
			}
		}
	}else if(stateGame){
		if(stateChoosePos){//Ход игрока
			if(!stateChooseStart){//Не первый ход
				if(stateMove){
					if(xCanvasBlock == 8){
						if(yCanvasBlock == 1){
							stopTimer = 2;
						}
					}
					stepPlayer();
				}else if(stateAttack){
					if(nowSkill == 1){
						useSkill(1);
					}
				}
			}else if(stateChooseStart){//Первый ход
				stepStart();
			}
		}
		if(xCanvas > 880 && xCanvas < 955){
			if(yCanvas >  454 && yCanvas < 510){
				if(stateInterface){
					drawInventory();
				}else if(stateInventory){
					drawInterface();
				}
			}
		}else if(xCanvas > 799 && xCanvas < 874){
			if(yCanvas > 516 && yCanvas < 562){
				if(stateInterface){
					drawSettings();
				}else if(stateSettings){
					drawInterface();
				}
			}
		}else if(stateSettings){
			if(xCanvas > 37 && xCanvas < 127){//Lang
				if(yCanvas > 469 && yCanvas < 508){
					lang = "EN";
					drawSettings();
				}else if(yCanvas > 513 && yCanvas < 553){
					lang = "RU";
					drawSettings();
				}
			}else if(xCanvas > 189 && xCanvas < 214){//1vol
				if(yCanvas > 483 && yCanvas < 498){
					ctx.fillStyle = ("black");
					ctx.fillRect(215,482,25,16);
					ctx.fillRect(241,482,25,16);
					ctx.fillStyle = ("white");
					ctx.fillRect(189,482,25,16);
					audioTheme.setVolume(0.25);
				}else if(yCanvas > 540 && yCanvas < 554){
					ctx.fillStyle = ("black");
					ctx.fillRect(215,539,25,16);
					ctx.fillRect(241,539,25,16);
					ctx.fillStyle = ("white");
					ctx.fillRect(189,539,25,16);
					audioWarrior1.setVolume(0.25);
					
				}
			}else if(xCanvas > 215 && xCanvas < 240){//2vol
				if(yCanvas > 483 && yCanvas < 498){
					ctx.fillStyle = ("black");
					ctx.fillRect(241,482,25,16);
					ctx.fillStyle = ("white");
					ctx.fillRect(189,482,25,16);
					ctx.fillRect(215,482,25,16);
					audioTheme.setVolume(0.50);
				}else if(yCanvas > 540 && yCanvas < 554){
					ctx.fillStyle = ("black");
					ctx.fillRect(241,539,25,16);
					ctx.fillStyle = ("white");
					ctx.fillRect(189,539,25,16);
					ctx.fillRect(215,539,25,16);
					audioWarrior1.setVolume(0.50);
				}
			}else if(xCanvas > 241 && xCanvas < 266){//3vol
				if(yCanvas > 483 && yCanvas < 498){
					ctx.fillStyle = ("white");
					ctx.fillRect(189,482,25,16);
					ctx.fillRect(215,482,25,16);
					ctx.fillRect(241,482,25,16);
					audioTheme.setVolume(1);
				}else if(yCanvas > 540 && yCanvas < 554){
					ctx.fillStyle = ("white");
					ctx.fillRect(189,539,25,16);
					ctx.fillRect(215,539,25,16);
					ctx.fillRect(241,539,25,16);
					audioWarrior1.setVolume(1);
				}
			}else if(xCanvas > 267 && xCanvas < 292){//Xvol
				if(yCanvas > 483 && yCanvas < 498){
					ctx.fillStyle = ("black");
					ctx.fillRect(189,482,25,16);
					ctx.fillRect(215,482,25,16);
					ctx.fillRect(241,482,25,16);
					audioTheme.setVolume(0);
				}else if(yCanvas > 540 && yCanvas < 554){
					ctx.fillStyle = ("black");
					ctx.fillRect(189,539,25,16);
					ctx.fillRect(215,539,25,16);
					ctx.fillRect(241,539,25,16);
					audioWarrior1.setVolume(0);	
				}
			}
		}
	}
}
//Audio
var loadAudio = function(mus,vol){
	var audio = document.createElement('audio');
	audio.src = mus;
	audio.volume = vol || 1;
	if(mus == "music/menuTheme.mp3"){
		audio.loop = "loop";
	}

	var met = {
		dom : false,
		state : "stop",

		play : function(){
			this.dom.currentTime = 0;
			this.dom.play();
			this.state = "play";
		},
		stop : function(){
			this.dom.pause();
			this.dom.currentTime = 0;
		},
		setVolume : function(vol){
			this.dom.volume = vol;
		}
	};
	met.dom = audio;

	return met;
}
var startTheme = function(state){
	if(state == "on"){
		audioTheme.play();
	}else if(state == "off"){
		audioTheme.stop();
	}
}
loadScale();