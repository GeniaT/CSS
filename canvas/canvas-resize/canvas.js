const canvas = document.querySelector('canvas');
// Setting full screen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d'); //creates a var with a bunch of methods for drawing
// c.fillStyle = 'rgba(255,0,0,0.5)'; //if only this line is used, same style is applied to Rects
// c.fillRect(100,100,100,100); //(x (from left),y(from top),width,height)
// c.fillStyle = 'rgba(0,0,255,0.5)';
// c.fillRect(400,100,100,100);
// c.fillStyle = 'rgba(0,255,0,0.5)';
// c.fillRect(300,300,100,100);
// console.log(canvas);
//
// //line
// c.beginPath(); //means we start a new line, if not the path will be connected to a previous one
// c.moveTo(50,300); //starting point
// c.lineTo(300,100); //creation of points
// c.lineTo(400,300);
// c.strokeStyle = "#fa34a3";
// c.stroke(); //joining the points

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false); //(x,y,radius,from wich angle to start, where to finish, CounterClockWise?)
// c.strokeStyle = 'blue';
// c.stroke();

// for(let i = 0; i < 3; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false); //(x,y,radius,from wich angle to start, where to finish, CounterClockWise?)
//   c.strokeStyle = 'blue';
//   c.stroke();
// }

//animating & interacting
let mouse = {
  x: undefined,
  y: undefined
}

let maxRadius = 40;
let minRadius = 2;

let colorArray = [
  '#133645',
  '#3F8782',
  '#F0806C',
  '#D94D3D',
  '#CFB7A2'
]
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function Circle(x,y,dx,dy,radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = minRadius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); //(x,y,radius,from wich angle to start, where to finish, CounterClockWise?)
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if ( this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //Interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
       && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
         if (this.radius < maxRadius) {
           this.radius += 1;
         }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

let circleArray = [];
function init() {
  circleArray = []; //reset after resize of the screen
  for (let i = 0; i < 800; i++) {
    let radius = 30;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5); //basically the speed, to make it + or -
    let dy = (Math.random() - 0.5);

    circleArray.push(new Circle(x,y,dx,dy,radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
