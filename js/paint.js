const canvas = document.querySelector("#draw");
const context = canvas.getContext('2d');

context.strokeStyle="#ff0000";
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 50;

let isDrawing = false;
let lastX =  0;
let lastY = 0;
let hue = 0;

const rand = (min, max) => min + Math.random() * (max - min);

const randHSLA = () => {
  return `hsla(${rand(1,360)}, ${rand(1,100)}%, ${rand(1,100)}%, ${rand(0.1, 1.0)})`
}

const draw = (ev) => {
  if (!isDrawing) return;
  context.strokeStyle = randHSLA();
  context.lineWidth = rand(10, 60);
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(ev.offsetX - canvas.offsetLeft, ev.offsetY - canvas.offsetTop);
  context.stroke();

  [lastX, lastY] = [ev.offsetX - canvas.offsetLeft, ev.offsetY - canvas.offsetTop];    
  
};

const startDraw = (ev) => {
  isDrawing = true;
  [lastX, lastY] = [ev.offsetX - canvas.offsetLeft, ev.offsetY - canvas.offsetTop];  
  
};

const stopDraw = () => {
  isDrawing = false;
};

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseout', stopDraw);