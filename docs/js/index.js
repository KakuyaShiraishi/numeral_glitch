let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let context = ctx;

let width = window.innerWidth;
let height = window.innerHeight;

let centerX = width * 0.5;
let mainColor = '#fff';
let globalAlpha = 0.5;

canvas.width = width;
canvas.height = height;

let numbersNum = Math.floor(Math.max(width, height) / Math.min(width, height) * 100);
let numbers = [];

function animate() {
  window.requestAnimationFrame(animate);
  render();
}


function render() {
  let x = 0, 
    y = 0,
    maxH = 0;

  for (var i = 0, n = numbers.length; i < n; i++) {
    let p = numbers[i];
    
    if (p.num < 0) {
      p.num = random(0, 1000);
    }
    
    let length = Math.floor( Math.log(p.num) / Math.LN10 ) + 1;
    length *= (p.h * 0.7);
    
    maxH = p.h > maxH ? p.h : maxH;
    
    if (x > width) {
      x = 0;
      y += maxH;
      maxH = 0;
    }
    
    let tY = y + p.h;
    
    ctx.beginPath();
    ctx.fillStyle = i % 5 === 0 ? '#000' : p.c;
    ctx.font = p.h + "px Courier New";
    ctx.fillText(p.num, x, tY);
    
    x += length;
    p.num -= p.v;
  }
}

function newNumber() {
 
  return {
    num: random(10, 10000),
    h: random(10, 100),
    c: `hsl(${random(0, 360)}, 100%, 50%)`,
    v: random(1, 100)
  }
}

function init() {
  for (var i = 0; i < numbersNum; i++) {
    numbers.push(newNumber())
  }
}

init();
animate();

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}