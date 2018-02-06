const canvas = document.querySelector('#fallingForm');
const c = canvas.getContext('2d')
const forms = [
  [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
  ],
  [
    [0,0,0,0],
    [0,1,1,0],
    [0,1,1,0],
    [0,0,0,0],
  ],
  [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0],
  ],
  [
    [0,0,1,0],
    [0,0,1,0],
    [0,1,1,0],
    [0,0,0,0],
  ],
  [
    [0,0,1,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0],
  ],
  [
    [0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [0,0,0,0],
  ],
  [
    [0,0,0,0],
    [0,1,0,0],
    [1,1,1,0],
    [0,0,0,0],
  ]
]
const colors = ['#fc8df6','#998be5','#47aaed','#29d188','#e8d614','#ed6a3b','#8c9093'];
let gameGrid = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]]

canvas.width = 200;
canvas.height = 440;

let currentForm;
let currentColor;
let currentX;
let currentY;

document.onkeydown = function(e) {
  switch (e.keyCode) {
      case 37:
          console.log('left');
          break;
      case 38:
          console.log('up');
          rotate();
          break;
      case 39:
          console.log('right');
          break;
      case 40:
          console.log('down');
          currentY += 1;
          render();
          break;
    }
}

function newFormCreation() {
  let randomForm = Math.floor(Math.random() * forms.length);
  let randomFColor = Math.floor(Math.random() * forms.length);
  currentForm = forms[randomForm];
  currentColor = colors[randomFColor];
  currentX = 3;
  currentY = 0;
}

let interval;
function formFalls() {
  interval = setInterval(function() {
    currentY += 1;
    render();
  }, 1000);
}

function rotate() {
  //4x4 grid to rotate: columns become rows starting from bottom of the column.
  let rotatedForm = [[],[],[],[]];
  for (let col = 0; col <= 3; col++) {
    for (let row = 3; row >=0; row--) {
      rotatedForm[col][3-row] = currentForm[row][col];
    }
  }
  currentForm = rotatedForm;
  render();
}



function render() {
  //we add the currentForm on the grid
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      gameGrid[currentY + row][currentX + col] = currentForm[row][col];
    }
  }
  //and draw all the '1' from the grid. (optimizable- redraw only the form, the other 1s on the bottom remain the same)
  c.fillStyle = currentColor;
  for (let row = 0; row < 22; row++) {
    for (let col = 0; col < 10; col++) {
      if (gameGrid[row][col] === 1) {
        c.fillRect(col * 20, row * 20, 20, 20);
      } else {
        c.clearRect(col * 20, row * 20, 20, 20);
      }
    }
  }
}
function init() {
  newFormCreation();
  render();
  // formFalls();
}

// function animate() {
//     requestAnimationFrame(animate)
//     c.clearRect(0, 0, canvas.width, canvas.height)
//     render()
// }

init()
// animate()
//need to fix the "down" event so the grid is rendered properly. 
