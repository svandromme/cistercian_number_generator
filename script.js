const numbersVectors = 	[	[], // 0
							[
								{
									from: [0,1],
									to: [0.5,1]
								}
							], // 1
							[
								{
									from: [0,0.16],
									to: [0.5,0.16]
								}
							], // 100
							[
								{
									from: [0,1],
									to: [0.5,0.16]
								}
							], // 3
							[
								{
									from: [0,0.16],
									to: [0.5,1]
								}
							], // 4
							[
								{
									from: [0,1],
									to: [0.5,1]
								},
								{
									from: [0,0.16],
									to: [0.5,1]
								}
							], // 5
							[
								{
									from: [0.5,1],
									to: [0.5,0.16]
								}
							], // 6
							[
								{
									from: [0,1],
									to: [0.5,1]
								},
								{
									from: [0.5,1],
									to: [0.5,0.16]
								}
							], // 7
							[
								{
									from: [0,0.16],
									to: [0.5,0.16]
								},
								{
									from: [0.5,1],
									to: [0.5,0.16]
								}
							], // 8
							[
								{
									from: [0,1],
									to: [0.5,1]
								},
								{
									from: [0,0.16],
									to: [0.5,0.16]
								},
								{
									from: [0.5,1],
									to: [0.5,0.16]
								}
							] // 9
						];


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const w = canvas.width;
const h = canvas.height;
const pos00 = {	
				x: w/2, 
				y: h/2
			};

ctx.lineWidth = 0.02*w;

var randomNumber = 0;

function clear() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.beginPath();
}

function middleLine() {
	ctx.moveTo(pos00.x, pos00.y-h/2);
	ctx.lineTo(pos00.x, pos00.y+h/2);
}

function changeValue() {
	var number = document.getElementById("number").value;
	if(number < 0) {
		number = 0;
		document.getElementById("number").value = 0;
	}
	if(number > 9999) {
		number = 9999;
		document.getElementById("number").value = 9999;
	}
	draw(number);
}

function generateRandom() {
	randomNumber = getRandomInt(9999);
	draw(randomNumber);	
}

function reveal() {
	document.getElementById("number").value = randomNumber;
}

function draw(number) {
	number = '' + number;
	var numbers = number.split('').reverse();
	clear();
	middleLine();
	if(numbers.length > 0) drawUnits(numbers[0]);
	if(numbers.length > 1) drawTens(numbers[1]);
	if(numbers.length > 2) drawHundreds(numbers[2]);
	if(numbers.length > 3) drawThousands(numbers[3]);
	ctx.stroke();
}

function drawNumber(number, transpoX, transpoY) {
	for (const vector of numbersVectors[number]) {
		ctx.moveTo(	transpoX * vector.from[0] * (w/2) + pos00.x, 
					transpoY * vector.from[1] * (h/2) + pos00.y - transpoY*ctx.lineWidth/2);
		ctx.lineTo(	transpoX * vector.to[0] * (w/2) + pos00.x, 
					transpoY * vector.to[1] * (h/2) + pos00.y - transpoY*ctx.lineWidth/2);
	}
}

function drawUnits(number) {
	drawNumber(number, 1, -1);
}

function drawTens(number) {
	drawNumber(number, -1, -1);
}

function drawHundreds(number) {
	drawNumber(number, 1, 1);
}

function drawThousands(number) {
	drawNumber(number, -1, 1);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}