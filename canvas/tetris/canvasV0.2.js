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
          if (currentForm.checkLeftCollision()) {
            currentForm.x -= 20;
          }
          break;
      case 38:
          console.log('up');
          //to continue......
          rotate();
          break;
      case 39:
          console.log('right');
          if (currentForm.checkRightCollision()) {
            currentForm.x += 20;
          }
          break;
      case 40:
          console.log('down');
          if (currentForm.checkBottomCollision()) {
              currentForm.y += 20;
            } else {
              clearInterval(interval);
              currentForm.addFormToCanvas2();
              init()
            }
          break;
    }
}
let interval;
function formFalls() {
    interval = setInterval(function() {
    if (currentForm.checkBottomCollision()) {
        currentForm.y += 20;
    } else {
      clearInterval(interval);
      currentForm.addFormToCanvas2();
      init()
    }
  }, 1000);
}

function rerenderCanvas2() {
  d.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < 22; row ++) {
    for (let col = 0; col < 10; col++) {
      if (droppedFormsGrid[row][col] === 1) {
        d.fillStyle = 'rgba(255,0,0,0.5)';
        d.fillRect(col * 20, row * 20, 20, 20);
      }
    }
  }
}

let rotatedForm;
function Form(x, y, width, height, form, rotation) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.form = form
    this.rotation = rotation
    rotatedForm = `${this.form}${this.rotation}`;

    this.update = function() {
      this.draw()
    }
    this.draw = function() {
      c.fillStyle = 'rgba(255,0,0,0.5)';
      switch(rotatedForm) {
        case "O1" :
          c.fillRect(this.x, this.y, this.width, this.height);
          break;
        case "I1" :
          c.fillRect(this.x, this.y, this.width, this.height);
          break;
        case "I2" :
          c.fillRect(this.x, this.y, this.width, this.height);
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
    }
    this.checkLeftCollision = function () {
      switch(rotatedForm) {
        case "O1" :
          if (this.x >= 20 && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x-20)/20] === 0) {
              return true;
            }
          break;
        case "I1" :
          if (this.x >= 20 && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+60)/20][(this.x-20)/20] === 0) {
              return true;
            }
          break;
        case "I2" :
          if (this.x >= 20 && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0) {
              return true;
            }
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
    }

    this.checkRightCollision = function () {
      switch(rotatedForm) {
        case "O1" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "I1" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+60)/20][(this.x+20)/20] === 0) {
              return true;
            }
          break;
        case "I2" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+80)/20] === 0) {
              return true;
            }
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
    }

    this.checkBottomCollision = function () {
      switch(rotatedForm) {
        case "O1" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+40)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0) {
              return true;
            }
          break;
        case "I1" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+80)/20][this.x/20] === 0) {
              return true;
            }
          break;
        case "I2" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+20)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+60)/20] === 0) {
              return true;
            }
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
    }
    this.addFormToCanvas2 = function() {
      switch(rotatedForm) {
        case "O1" :
          droppedFormsGrid[this.y/20][this.x/20] = 1
          droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
          droppedFormsGrid[(this.y+20)/20][this.x/20] = 1
          droppedFormsGrid[this.y/20][(this.x+20)/20] = 1
          break;
        case "I1" :
          droppedFormsGrid[this.y/20][this.x/20] = 1
          droppedFormsGrid[(this.y+20)/20][this.x/20] = 1
          droppedFormsGrid[(this.y+40)/20][this.x/20] = 1
          droppedFormsGrid[(this.y+60)/20][this.x/20] = 1
          break;
        case "I2" :
          droppedFormsGrid[this.y/20][this.x/20] = 1
          droppedFormsGrid[this.y/20][(this.x+20)/20] = 1
          droppedFormsGrid[this.y/20][(this.x+40)/20] = 1
          droppedFormsGrid[this.y/20][(this.x+60)/20] = 1
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
      //and upshift the clean lines on top of the grid
      droppedFormsGrid.forEach((row, index) => {
        if (row.indexOf(0) === -1) { //if full line
          droppedFormsGrid.splice(index, 1);
          droppedFormsGrid.unshift([0,0,0,0,0,0,0,0,0,0]);
          return;
        }
      });
      rerenderCanvas2();
    }
}
// let index;
// let index2;
// function randomForm(forms) {
//   index = Math.floor(Math.random() * forms.length)
//   // index2 = Math.floor(Math.random() * forms[index].length)
//   console.log('index', index);
//   // console.log('index2', index2)
//   let randomizedForm = forms[index]
//     return randomizedForm
// }

function rotate() {
  // console.log("trying to rotate!");
  console.log("current form before rotation", rotatedForm);
  let currentX = currentForm.x;
  let currentY = currentForm.y;
  switch(rotatedForm) { //in each case, we draw the next rotation, "rotatedForm" is the present form & rotation.
    case "O1" :
      currentForm = new Form(currentX, currentY , 40, 40, "O", 1);
      break;
    case "I1" :
      // console.log('supposed to flip I1 into I2...');
      currentForm = new Form(currentX, currentY , 80, 20, "I", 2);
      break;
    case "I2" :
      currentForm = new Form(currentX, currentY , 20, 80, "I", 1);
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
    rotatedForm = `${currentForm.form}${currentForm.rotation}`;
    console.log("current form after rotation", rotatedForm);
}
// Implementation
let currentForm
function init() {
  const formAndRotationParams = [ [60, 0, 40, 40, "O", 1], [60, 0, 20, 80, "I", 1], [60, 0, 80, 20, "I", 2] ];
  let index = Math.floor(Math.random() * formAndRotationParams.length)
  let newForm = formAndRotationParams[index];
  // [
  //   [[new Form(60, 0, 40, 40, "O", 1), [1]]],
  //   [[new Form(60, 0, 20, 80, "I", 1), [1]]/*, [new Form(60, 0, 80, 20, "I", 2), [2]]*/]
  // ];
  // currentForm = randomForm(possibleForms);
  currentForm = new Form(newForm[0], newForm[1], newForm[2], newForm[3], newForm[4], newForm[5]);
  rotatedForm = `${currentForm.form}${currentForm.rotation}`;
  formFalls();
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    currentForm.update();
}

init()
animate()
