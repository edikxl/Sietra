var loadImage = function(){
	startImageRU = new Image();
	startImageRU.src = ("image/game/interface/startImageRU.png");

	startImageEN = new Image();
	startImageEN.src = ("image/game/interface/startImageEN.png");

	volumeOn = new Image();
	volumeOn.src = ("image/game/interface/volumeOn.png");

	volumeOff = new Image();
	volumeOff.src = ("image/game/interface/volumeOff.png");

	imageTutorial1_1RU = new Image();
	imageTutorial1_1RU.src = ("image/game/tutorial/tutorial1RU.png");

	imageTutorial1_1EN = new Image();
	imageTutorial1_1EN.src = ("image/game/tutorial/tutorial1EN.png");

	imageTutorial1_2RU = new Image();
	imageTutorial1_2RU.src = ("image/game/tutorial/tutorial1_1RU.png");

	imageTutorial1_2EN = new Image();
	imageTutorial1_2EN.src = ("image/game/tutorial/tutorial1_1EN.png");

	interface = new Image();
	interface.src = ("image/game/interface/interface.png");

	intWar1 = new Image();
	intWar1.src = ("image/game/character/warrior/skill1.png");

	inventory = new Image();
	inventory.src = ("image/game/interface/inventory.png");

	settingsRU = new Image();
	settingsRU.src = ("image/game/interface/settingsRU.png");

	settingsEN = new Image();
	settingsEN.src = ("image/game/interface/settingsEN.png");

	timer = new Image();
	timer.src = ("image/game/interface/timer.png");

	enemyHP = new Image();
	enemyHP.src = ("image/game/interface/enemyHP.png");

	stone = new Image();
	stone.src = ("image/game/area/stone.png");

	redGrass = new Image();
	redGrass.src = ("image/game/area/redGrass.png");

	blueGrass = new Image();
	blueGrass.src = ("image/game/area/blueGrass.png");

	grass = new Image();
	grass.src = ("image/game/area/grass.png");

	warrior = new Image();
	warrior.src = ("image/game/character/warrior/warrior.png");

	warriorSkill1 = new Image();
	warriorSkill1.src = ("image/game/character/warrior/warrior_skill1.png");

	dog = new Image();
	dog.src = ("image/game/enemy/dog.png");

	dogAttack = new Image();
	dogAttack.src = ("image/game/enemy/dogAttack.png");

	winRU = new Image();
	winRU.src = ("image/game/winRU.png");

	winEN = new Image();
	winEN.src = ("image/game/winEN.png");

	loseRU = new Image();
	loseRU.src = ("image/game/loseRU.png");

	loseEN = new Image();
	loseEN.src = ("image/game/loseEN.png");

	infoRU = new Image();
	infoRU.src = ("image/game/interface/infoRU.png");

	infoEN = new Image();
	infoEN.src = ("image/game/interface/infoEN.png");

	startImageEN.onload = function(){
		loadScale();
		variable();
	}
}