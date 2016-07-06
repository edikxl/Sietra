var drawPlayerTeam = function(){
	stateLife = true;
	updateMap("1_1",2,4);
}
var damageXYEnemy = function(x,y,id){
	xAttack = x;
	yAttack = y;
	if(hero == warrior){
		if(id == 1){
			for(var i = 1;i < enemyList.length;i ++){
				if(enemyList[i].x == xAttack && enemyList[i].y == yAttack){
					enemyList[i].hp -= 15;
					if(enemyList[i].hp <= 0){
						if(enemyList[i].type == "2_1"){
							xp += 25;
						}
						enemyList[i].status = false;
						enemyDeath += 1;
						updateMap("3",enemyList[i].x,enemyList[i].y);
					}
				}
			}
			mana -= 20;
		}
	}
}
var useSkill = function(id){
	if(hero == warrior){
		if(id == 1){
			if(xCanvasBlock == xHero){
				if((yCanvasBlock - yHero) == 1){
					if(!(checkBlock("enemy",xCanvasBlock,yCanvasBlock))){
						damageXYEnemy(xCanvasBlock,yCanvasBlock,1);
						updateMap("3",xHero,yHero);
						updateMap("1_1_1",xHero,yHero);
						setTimeout(heroUpdateAnim,500);
						setTimeout(function(){unSkill(1);},500);
					}
				}else if((yHero - yCanvasBlock) == 1){
					if(!(checkBlock("enemy",xCanvasBlock,yCanvasBlock))){
						damageXYEnemy(xCanvasBlock,yCanvasBlock,1);
						updateMap("3",xHero,yHero);
						updateMap("1_1_1",xHero,yHero);
						setTimeout(heroUpdateAnim,500);
						setTimeout(function(){unSkill(1);},500);
					}
				}
			}else if(yCanvasBlock == yHero){
				if((xCanvasBlock - xHero) == 1){
					if(!(checkBlock("enemy",xCanvasBlock,yCanvasBlock))){
						damageXYEnemy(xCanvasBlock,yCanvasBlock,1);
						updateMap("3",xHero,yHero);
						updateMap("1_1_1",xHero,yHero);
						setTimeout(heroUpdateAnim,500);
						setTimeout(function(){unSkill(1);},500);
					}
				}else if((xHero - xCanvasBlock) == 1){
					if(!(checkBlock("enemy",xCanvasBlock,yCanvasBlock))){
						damageXYEnemy(xCanvasBlock,yCanvasBlock,1);
						updateMap("3",xHero,yHero);
						updateMap("1_1_1",xHero,yHero);
						setTimeout(heroUpdateAnim,500);
						setTimeout(function(){unSkill(1);},500);
					}
				}
			}
		}
	}
}
var skill = function(id){
	if(stateAttack == false){
		if(hero == warrior){
			if(id == 1){//Удар мечём
				if(mana >= 20){
					stateMove = false;
					stateAttack = true;
					nowSkill = "1";
					if(checkBlock("enemy",xHero - 1,yHero)){
						if(checkBlock("block",xHero - 1,yHero)){
							mn = true;
							updateMap("3_2",xHero - 1,yHero);
						}
					}else{
						mn = true;
						updateMap("3_3",xHero - 1,yHero);
						updateMap("2_1",xHero - 1,yHero);
					}
					if(checkBlock("enemy",xHero + 1,yHero)){
						if(checkBlock("block",xHero + 1,yHero)){
							pn = true;
							updateMap("3_2",xHero + 1,yHero);
						}
					}else{
						pn = true;
						updateMap("3_3",xHero + 1,yHero);
						updateMap("2_1",xHero + 1,yHero);
					}
					if(checkBlock("enemy",xHero,yHero - 1)){
						if(checkBlock("block",xHero,yHero - 1)){
							nm = true;
							updateMap("3_2",xHero,yHero - 1);
						}
					}else{
						nm = true;
						updateMap("3_3",xHero,yHero - 1);
						updateMap("2_1",xHero,yHero - 1);
					}
					if(checkBlock("enemy",xHero,yHero + 1)){
						if(checkBlock("block",xHero,yHero + 1)){
							np = true;
							updateMap("3_2",xHero,yHero + 1);
						}
					}else{
						np = true;
						updateMap("3_3",xHero,yHero + 1);
						updateMap("2_1",xHero,yHero + 1);
					}
				}
			}
		}
	}
}
var unSkill = function(id){
	if(hero == warrior){
		if(id == 1){
			stateAttack = false;
			stateMove = true;
			if(checkBlock("enemy",xHero - 1,yHero)){
				if(checkBlock("block",xHero - 1,yHero)){
					mn = false;
					updateMap("3",xHero - 1,yHero);
				}
			}else{
				mn = false;
				updateMap("3",xHero - 1,yHero);
				updateMap("2_1",xHero - 1,yHero);
			}
			if(checkBlock("enemy",xHero + 1,yHero)){
				if(checkBlock("block",xHero + 1,yHero)){
					pn = false;
					updateMap("3",xHero + 1,yHero);
				}
			}else{
				pn = false;
				updateMap("3",xHero + 1,yHero);
				updateMap("2_1",xHero + 1,yHero);
			}
			if(checkBlock("enemy",xHero,yHero - 1)){
				if(checkBlock("block",xHero,yHero - 1)){
					nm = false;
					updateMap("3",xHero,yHero - 1);
				}
			}else{
				nm = false;
				updateMap("3",xHero,yHero - 1);
				updateMap("2_1",xHero,yHero - 1);
			}
			if(checkBlock("enemy",xHero,yHero + 1)){
				if(checkBlock("block",xHero,yHero + 1)){
					np = false;
					updateMap("3",xHero,yHero + 1);
				}
			}else{
				np = false;
				updateMap("3",xHero,yHero + 1);
				updateMap("2_1",xHero,yHero + 1);
			}
		}
	}
}
var heroUpdateAnim = function(){
	if(hero == warrior){
		stateAttack = false;
		updateMap("3",xHero,yHero);
		updateMap("1_1",xHero,yHero);
	}
}
var hpUpdate = function(){
	if(hHP == 0){
        pxHP = hp * 3.12;
	}else{
		pxHP = 0;
	}
	ctx.fillStyle = ("black");
	ctx.fillRect(324,454,312,36);
	ctx.fillStyle = ("red");
	ctx.fillRect(324,454,pxHP,36);
	ctx.font = ("20px Verdana, sans-serif");
	ctx.fillStyle = ("white");
	ctx.fillText(hp + "/"+ maxHP,440,480);
	if(hp <= 0){
		stopTimer = 4;
		stateLife = false;
		ctx.drawImage(lose,0,0);
	}
}
var manaUpdate = function(){
	if(mana >= 0){
		if(hMana == 0){
	        pxMana = mana * 3.12;
		}else{
			pxMana = 0;
		}
		ctx.fillStyle = ("black");
		ctx.fillRect(324,495,312,36);
		ctx.fillStyle = ("blue");
		ctx.fillRect(324,495,pxMana,36);
		ctx.font = ("20px Verdana, sans-serif");
		ctx.fillStyle = ("white");
		ctx.fillText(mana + "/"+ maxMana,440,520);
	}
}
var xpUpdate = function(){
	if(hXP == 0){
        pxXP = xp * 3.12;
	}else{
		pxXP = 0;
	}
	ctx.fillStyle = ("black");
	ctx.fillRect(324,535,312,36);
	ctx.fillStyle = ("yellow");
	ctx.fillRect(324,535,pxXP,36);
	ctx.font = ("20px Verdana, sans-serif");
	ctx.fillStyle = ("white");
	ctx.fillText(xp + "/"+ maxXP,440,560);
}
var stepPlayer = function(){
	if(xCanvasBlock == 8){
		if(yCanvasBlock == 1){
			stopTimer = 2;
		}
	}else if(step > 0){
		if(yCanvasBlock == yHero){
			if(xCanvasBlock > xHero){
				nowStep = xCanvasBlock - xHero;
				if(nowStep <= step){
					for(var i = 0;i != nowStep;i++){
						if(checkBlock("enemy",xHero + 1,yCanvasBlock) && checkBlock("block",xHero + 1,yCanvasBlock)){
							if(hero == warrior){
								updateMap("1_1",xHero + 1,yHero);
								updateMap("3",xOldHero,yOldHero);
								step -= 1;
							}
						}else{
							return;
						}
					}
				}
			}else if(xCanvasBlock < xHero){
				nowStep = xHero - xCanvasBlock;
				if(nowStep <= step){
					for(var i = 0;i != nowStep;i++){
						if(checkBlock("enemy",xHero - 1,yCanvasBlock) && checkBlock("block",xHero - 1,yCanvasBlock)){
							if(hero == warrior){
								updateMap("1_1",xHero - 1,yHero);
								updateMap("3",xOldHero,yOldHero);
								step -= 1;
							}
						}else{
							return;
						}
					}
				}
			}
		}else if(xCanvasBlock == xHero){
			if(yCanvasBlock > yHero){
				nowStep = yCanvasBlock - yHero;
				if(nowStep <= step){
					for(var i = 0;i != nowStep;i++){
						if(checkBlock("enemy",xCanvasBlock,yHero + 1) && checkBlock("block",xCanvasBlock,yHero + 1)){
							if(hero == warrior){
								updateMap("1_1",xHero,yHero + 1);
								updateMap("3",xOldHero,yOldHero);
								step -= 1;
							}
						}else{
							return;
						}
					}
				}
			}else if(yCanvasBlock < yHero){
				nowStep = yHero - yCanvasBlock;
				if(nowStep <= step){
					for(var i = 0;i != nowStep;i++){
						if(checkBlock("enemy",xCanvasBlock,yHero - 1) && checkBlock("block",xCanvasBlock,yHero - 1)){
							if(hero == warrior){
								updateMap("1_1",xHero,yHero - 1);
								updateMap("3",xOldHero,yOldHero);
								step -= 1;
							}
						}else{
							return;
						}
					}
				}
			}
		}
	}
}