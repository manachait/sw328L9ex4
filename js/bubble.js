var mycanvas;
var context;
var bubble;
var prevX = 170;
var prevY = 170;
var offset = 0.4;
var watchID = null;
function init(){
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady(){
    startAccelerometer();
}
function startAccelerometer(){
    mycanvas = document.getElementById("mycanvas");
    context = mycanvas.getContext("2d");
    bubble = document.getElementById("bubble");
    bubble.onload = function(){
        var options = {frequency: 100};
        watchID = navigator.accelerometer.watchAcceleration(moveBubble, stopBubble, options);
    };
    bubble.src = "img/bubble.png";
}
function moveBubble(acc){
    compX = -0.428;
    compY = 1.243;
    var x = (acc.x + compX) * 100;
    var y = (acc.y + compY) * 100;
    var newX = x * offset + (1 - offset) * prevX;
    var newY = y * offset + (1 - offset) * prevY;
	
    drawImage(newX, newY);
    prevX = newX;
    prevY = newY;
}
function stopBubble(error){
    navigator.accelerometer.clearWatch(watchID);
    alert("Error " + error.code);
}
function drawImage(x, y){
    context.clearRect(0, 0, 340, 400);
    context.drawImage(bubble, x, y);
    drawCross();
}
function drawCross(){
    context.strokeStyle = "#2222cc";
    context.lineWidth = 2;
    context.moveTo(170, 0);
    context.lineTo(170, 340);
    context.stroke();
    context.moveTo(0, 170);
    context.lineTo(340, 170);
    context.stroke();   
    var rad = 55;
    context.beginPath();
    context.arc(170, 170, rad, 0, 2 * Math.PI);
    context.stroke();
}