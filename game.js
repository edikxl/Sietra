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
	document.getElementById("rebut").style.display = 'none';
	stateMenu = true;
	if(lang == "RU"){
		ctx.drawImage(startImageRU,0,0);
	}else if(lang == "EN"){
		ctx.drawImage(startImageEN,0,0);
	}
}
//Старт игры
var startGame = function(){
	stateMenu = false;
	stateGame = true;
	ctx.clearRect(0,0,960,576);
	drawArea();
}
var gameLoop = function(){
	xpUpdate();
	manaUpdate();
	stepUpdate();
	hpUpdate();
	checkEnemyHP();
	checkState();
}
//Старт
window.onload = function(){
	loadImage();
	variable();
	init();
	startMenu();
}