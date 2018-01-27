const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const droppedForms = document.querySelector('#droppedForms')
const d = droppedForms.getContext('2d')
let droppedFormsGrid = [
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
let currentMiniSquaresLocations = [];

canvas.width = 200;
canvas.height = 440;
droppedForms.width = 200;
droppedForms.height = 440;
// Event Listeners
document.onkeydown = function(e) {
  switch (e.keyCode) {
      case 37:
          console.log('left');
          if (currentForm.x >= 20) {
            currentForm.x = currentForm.x - 20;
          }
          break;
      case 38:
          console.log('up');
          break;
      case 39:
          console.log('right');
          if (currentForm.x + currentForm.width <= 180) {
            currentForm.x = currentForm.x + 20;
          }
          break;
      case 40:
          console.log('down');
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(currentForm.y+40)/20][currentForm.x/20] !== undefined
            && droppedFormsGrid[(currentForm.y+40)/20][currentForm.x/20] === 0
            && droppedFormsGrid[(currentForm.y+40)/20][(currentForm.x+20)/20] === 0) {
              currentForm.y = currentForm.y + 20;
            }
            console.log(droppedFormsGrid);
          break;
    }
}

function formFalls() {
    let interval = setInterval(function() {
    if (currentForm.y + currentForm.height <= 420
      && droppedFormsGrid[(currentForm.y+40)/20][currentForm.x/20] !== undefined
      && droppedFormsGrid[(currentForm.y+40)/20][currentForm.x/20] === 0
      && droppedFormsGrid[(currentForm.y+40)/20][(currentForm.x+20)/20] === 0) {
        currentForm.y = currentForm.y + 20;
    } else {
      clearInterval(interval);
      currentForm.addFormToCanvas2();
      init()
    }
  }, 1000);
}

function rerenderCanvas2() {
  for (let row = 0; row < 22; row ++) {
    for (let col = 0; col < 10; col++) {
      if (droppedFormsGrid[row][col] === 1) {
        d.fillStyle = 'rgba(255,0,0,0.5)';
        d.fillRect(col * 20, row * 20, 20, 20);
      }
    }
  }
}

function Form(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.update = function() {
        this.draw()
    }
    this.draw = function() {
      c.fillStyle = 'rgba(255,0,0,0.5)';
      c.fillRect(this.x, this.y, this.width, this.height);
    }
    this.checkCollision = function () {
            console.log("inside collision");
      let rotatedForm = "O";
      //array of locations of each "mini square" forming the whole form in canvas2 Grid
      switch(rotatedForm) {

        case "O" : //the square is formed of 2 rows of 2 mini squares
          // bottomMiniSquaresLocations = [
          //   // droppedFormsGrid[this.y/20][this.x/20],              // [1,2]
          //   // droppedFormsGrid[this.y/20][(this.x+20)/20]          // [3,4]
          //   droppedFormsGrid[(this.y+20)/20][this.x/20],
          //   droppedFormsGrid[(this.y+20)/20][(this.x+20)/20],
          // ];
          if (droppedFormsGrid[(this.y+40)/20][this.x/20] !== undefined
            && droppedFormsGrid[(this.y+40)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0) {
              return true; //no collision, keep falling
            } else {
              currentForm.addFormToCanvas2();
              console.log(droppedFormsGrid);
              return false;
            }
          break;
        case "I" :
          bottomMiniSquaresLocations = [];
          break;
        case "T" :
          bottomMiniSquaresLocations = [];
          break;
        case "L" :
          bottomMiniSquaresLocations = [];
          break;
        case "J" :
          bottomMiniSquaresLocations = [];
          break;
        case "Z" :
          bottomMiniSquaresLocations = [];
          break;
        case "S" :
          bottomMiniSquaresLocations = [];
          break;
        // Complete with each form&rotation combination like L3,T2,B1,...
      }
    }
    this.addFormToCanvas2 = function() {
      let rotatedForm = "O";
      d.fillStyle = 'rgba(255,0,0,0.5)';
      d.fillRect(this.x, this.y, this.width, this.height);
      switch(rotatedForm) {
        case "O" :
          droppedFormsGrid[this.y/20][this.x/20] = 1
          droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
          droppedFormsGrid[(this.y+20)/20][this.x/20] = 1
          droppedFormsGrid[this.y/20][(this.x+20)/20] = 1
          break;
        case "I" :
          break;
        case "T" :
          break;
        case "L" :
          break;
        case "J" :
          break;
        case "Z" :
          break;
        case "S" :
          break;
        // Complete with each form&rotation combination like L3,T2,B1,...
      }
      //check for full lines in canvas2: if full lines, remove this from droppedFormsGrid
      //and upshift the removed elements on top of the grid
      droppedFormsGrid.forEach((row) => {
        if (row.indexOf(0) === -1) { //if full line
          //slice or splice the droppedFormsgrid and upshift [0,0,0,0,0,0,0,0,0,0] in the beginning
          return; //to complete when grid updated properly.
        }
      });
      //rerender the canvas according to "1"s in the grid
      rerenderCanvas2();
    }
}

// Implementation
let currentForm
function init() {
  //Starting point. Next, need to randomize different forms creation.
  currentForm = new Form(60, 0, 40, 40); //uncomment when UT done
  formFalls();
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    currentForm.update();
}

init()
animate()
