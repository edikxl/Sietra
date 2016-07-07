var variable = function(){
	//Canvas
	canvas = null;
	ctx = null;
	//Язык
	lang = "EN";
	//Статусы игры
	stateGame = false;
	stateChoosePos = false;
	stateChooseStart = false;
	stateEnemyStep = false;
	statePlayerStep = false;
	stateStartStep = false;
	stateMove = false;
	stateAttack = false;
	stateReadyAttack = false;
	stateLife = false;
    //Координаты
	xCanvas = null;
	yCanvas = null;

	xMouse = null;
	yMouse = null;

	xHero = 0;
	yHero = 0;

	xArea = 0;
	yArea = 0;

	xBlock = 0;
	yBlock = 0;

	xEnemy = 0;
	yEnemy = 0;

	xAttack = 0;
	yAttack = 0;

	mn = false;
	pn = false;
	nm = false;
	np = false;
    //Параметры
	hp = 100;
	mana = 100;
	xp = 0;
	step = 3;
	nowStep = 0;

	maxHP = 100;
	maxMana = 100;
	maxXP = 100;
	maxStep = 3;

	pxHP = 0;
	pxMana = 0;
	pxXP = 0;
	//Характеристика
	hHP = 0;
	hMana = 0;
	hXP = 0;
	hStep = 0;
    //Таймер
    typeTimer = null;
    stopTimer = 0;
	s = 30;
	//Враги
	enemyCol = 0;
	enemyStep = 0;
	enemyId = 0;
	enemyDeath = 0;
	//Прочее
	nowSkill = 0;
	r = 0;
	fullArea = false;
	hero = warrior;

	enemyList = [];

	mapArea = [
		[0,0,0,0,0,0,0,"3_1",0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];
}