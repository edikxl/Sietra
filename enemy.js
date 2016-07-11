var createEnemy = function(type,x,y){
	if(type == "2_1"){
		enemyList[enemyId + 1] = {
			id : (enemyId + 1),
			type : "2_1",
			hp : 100,
			maxHP : 100,
			mana : 100,
			step : 6,
			x : x,
			y : y,
			status : true
		}
		enemyId += 1;
		updateMap("2_1",x,y);
	}
}
var drawEnemyTeam = function(){
	r = getRandom(2,4);
	enemyCol = r;
	while(r != 0){
		r -= 1;
		xEnemy = getRandom(13,15);
		yEnemy = getRandom(1,7);
		if(checkBlock("block",xEnemy,yEnemy)){
			if(checkBlock("player",xEnemy,yEnemy)){
				if(checkBlock("enemy",xEnemy,yEnemy)){
					createEnemy("2_1",xEnemy,yEnemy);
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
var damageHero = function(dHP,dMana,enemy){
	if(enemyList[enemy].mana > dMana){
		enemyList[enemy].mana -= dMana;
		hp -= dHP;
	}
}
var stepEnemyBase = function(i,set){
	if(set == "y-"){
		updateMap("(3)",enemyList[i].x,enemyList[i].y);
		enemyList[i].y -= 1;
		updateMap(enemyList[i].type,enemyList[i].x,enemyList[i].y);
	}else if(set == "y+"){
		updateMap("(3)",enemyList[i].x,enemyList[i].y);
		enemyList[i].y += 1;
		updateMap(enemyList[i].type,enemyList[i].x,enemyList[i].y);
	}else if(set == "x-"){
		updateMap("(3)",enemyList[i].x,enemyList[i].y);
		enemyList[i].x -= 1;
		updateMap(enemyList[i].type,enemyList[i].x,enemyList[i].y);
	}else if(set == "x+"){
		updateMap("(3)",enemyList[i].x,enemyList[i].y);
		enemyList[i].x += 1;
		updateMap(enemyList[i].type,enemyList[i].x,enemyList[i].y);
	}
}
var stepEnemy = function(){
	for(var i = 1;i < enemyList.length;i ++){
		if(enemyList[i].status){
			enemyList[i].mana = 100;
			while(enemyStep != enemyList[i].step){
				enemyStep += 1;
				if(xHero == enemyList[i].x){
					if(yHero < enemyList[i].y){
						if(checkBlock("player",enemyList[i].x,enemyList[i].y - 1)){
							if(checkBlock("block",enemyList[i].x,enemyList[i].y - 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y - 1)){
								stepEnemyBase(i,"y-");
							}else if(checkBlock("block",enemyList[i].x + 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x + 1,enemyList[i].y)){
								stepEnemyBase(i,"x+");
							}else if(checkBlock("block",enemyList[i].x - 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x - 1,enemyList[i].y)){
								stepEnemyBase(i,"x-");
							}
						}else{
							damageHero(10,50,i);
						}
					}else if(yHero > enemyList[i].y){
						if(checkBlock("player",enemyList[i].x,enemyList[i].y + 1)){
							if(checkBlock("block",enemyList[i].x,enemyList[i].y + 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y + 1)){
								stepEnemyBase(i,"y+");
							}else if(checkBlock("block",enemyList[i].x + 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x + 1,enemyList[i].y)){
								stepEnemyBase(i,"x+");
							}else if(checkBlock("block",enemyList[i].x - 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x - 1,enemyList[i].y)){
								stepEnemyBase(i,"x-");
							}
						}else{
							damageHero(10,50,i);
						}
					}
				}else if(yHero == enemyList[i].y){
					if(xHero < enemyList[i].x){
						if(checkBlock("player",enemyList[i].x - 1,enemyList[i].y)){
							if(checkBlock("block",enemyList[i].x - 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x - 1,enemyList[i].y)){
								stepEnemyBase(i,"x-");
							}else if(checkBlock("block",enemyList[i].x,enemyList[i].y + 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y + 1)){
								stepEnemyBase(i,"y+");
							}else if(checkBlock("block",enemyList[i].x,enemyList[i].y - 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y - 1)){
								stepEnemyBase(i,"y-");
							}
						}else{
							damageHero(10,50,i);
						}
					}else if(xHero > enemyList[i].x){
						if(checkBlock("player",enemyList[i].x + 1,enemyList[i].y)){
							if(checkBlock("block",enemyList[i].x + 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x - 1,enemyList[i].y)){
								stepEnemyBase(i,"x+");
							}else if(checkBlock("block",enemyList[i].x,enemyList[i].y + 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y + 1)){
								stepEnemyBase(i,"y+");
							}else if(checkBlock("block",enemyList[i].x,enemyList[i].y - 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y - 1)){
								stepEnemyBase(i,"y-");
							}
						}else{
							damageHero(10,50,i);
						}
					}
				}else if(xHero > enemyList[i].x){//x +
					if(checkBlock("block",enemyList[i].x + 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x + 1,enemyList[i].y)){
						stepEnemyBase(i,"x+");
					}else if(checkBlock("block",enemyList[i].x,enemyList[i].y + 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y + 1)){
						stepEnemyBase(i,"y+");
					}else if(checkBlock("block",enemyList[i].x,enemyList[i].y - 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y - 1)){
						stepEnemyBase(i,"y-");
					}
				}else if(xHero < enemyList[i].x){//x -
					if(checkBlock("block",enemyList[i].x - 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x - 1,enemyList[i].y)){
						stepEnemyBase(i,"x-");
					}else if(checkBlock("block",enemyList[i].x,enemyList[i].y + 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y + 1)){
						stepEnemyBase(i,"y+");
					}else if(checkBlock("block",enemyList[i].x,enemyList[i].y - 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y - 1)){
						stepEnemyBase(i,"y-");
					}
				}else if(yHero > enemyList[i].y){//y -
					if(checkBlock("block",enemyList[i].x,enemyList[i].y - 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y - 1)){
						stepEnemyBase(i,"y-");
					}else if(checkBlock("block",enemyList[i].x + 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x + 1,enemyList[i].y)){
						stepEnemyBase(i,"x+");
					}else if(checkBlock("block",enemyList[i].x - 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x - 1,enemyList[i].y)){
						stepEnemyBase(i,"x-");
					}
				}else if(yHero < enemyList[i].y){//y +
					if(checkBlock("block",enemyList[i].x,enemyList[i].y + 1) && checkBlock("enemy",enemyList[i].x,enemyList[i].y + 1)){
						stepEnemyBase(i,"y+");
					}else if(checkBlock("block",enemyList[i].x + 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x + 1,enemyList[i].y)){
						stepEnemyBase(i,"x+");
					}else if(checkBlock("block",enemyList[i].x - 1,enemyList[i].y) && checkBlock("enemy",enemyList[i].x - 1,enemyList[i].y)){
						stepEnemyBase(i,"x-");
					}
				}else{
					console.log("Вы в другом пространстве!");
				}
			}
			enemyStep = 0;
			enemyStepCol += 1;
		}else{
			enemyStep = 0;
			enemyStepCol += 1;
		}
	}
}
loadScale();