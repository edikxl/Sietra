//Инициализация Canvas
var init = function(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
}
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
//Старт меню
var startMenu = function(){
	startTheme("on");
	stateInfo = false;
	stateMenu = true;
	if(lang == "RU"){
		ctx.drawImage(startImageRU,0,0);
	}else if(lang == "EN"){
		ctx.drawImage(startImageEN,0,0);
	}
	if(volumeTheme){
		ctx.drawImage(volumeOn,885,0);
	}else{
		ctx.drawImage(volumeOff,885,0);
	}
}
var openInfo = function(){
	stateMenu = false;
	stateInfo = true;
	if(lang == "RU"){
		ctx.drawImage(infoRU,0,0);
	}else if(lang == "EN"){
		ctx.drawImage(infoEN,0,0);
	}
}
//Старт игры
var startGame = function(){
	stateTutorial = false;
	stateGame = true;
	ctx.clearRect(0,0,960,576);
	drawArea();
}
var startTutorial = function(){
	stateMenu = false;
	stateTutorial = true;
	slide = 1;
	if(lang == "RU"){
		ctx.drawImage(imageTutorial1_1RU,0,0);
	}else if(lang == "EN"){
		ctx.drawImage(imageTutorial1_1EN,0,0);
	}
}
var gameLoop = function(){
	if(stateLife){
		if(stateInterface){
			xpUpdate();
			moneyUpdate();
			manaUpdate();
			stepUpdate();
			hpUpdate();
			checkEnemyDeath();
		}
		checkEnemyHP();
		checkState();
	}
}
loadScale();