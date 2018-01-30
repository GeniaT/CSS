// Left to do : chek bottomCollision !
// J4 displays badly (too long), wheck why. 

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
        case "T1" :
          c.fillRect(this.x, this.y, this.width, this.height/2);
          c.fillRect(this.x+20, this.y, this.width/3, this.height);
          break;
        case "T2" :
          c.fillRect(this.x+20, this.y, this.width/2, this.height);
          c.fillRect(this.x, this.y+20, this.width, this.height/3);
          break;
        case "T3" :
          c.fillRect(this.x, this.y+20, this.width, this.height/2);
          c.fillRect(this.x+20, this.y, this.width/3, this.height);
          break;
        case "T4" :
          c.fillRect(this.x, this.y, this.width/2, this.height);
          c.fillRect(this.x, this.y+20, this.width, this.height/3);
          break;
        case "L1" :
        console.log("width of L1:", this.width);
        console.log("height of L1:", this.height);

          c.fillRect(this.x, this.y, this.width/2, this.height);
          c.fillRect(this.x, this.y+40, this.width, this.height/3);
          break;
        case "L2" :
          c.fillRect(this.x, this.y, this.width, this.height/2);
          c.fillRect(this.x, this.y, this.width/3, this.height);
          break;
        case "L3" :
          c.fillRect(this.x, this.y, this.width, this.height/3);
          c.fillRect(this.x+20, this.y, this.width/2, this.height);
          break;
        case "L4" :
          c.fillRect(this.x, this.y+20, this.width, this.height/2);
          c.fillRect(this.x+60, this.y, this.width/3, this.height);
          break;
        case "J1" :
          c.fillRect(this.x+20, this.y, this.width/2, this.height);
          c.fillRect(this.x, this.y+40, this.width, this.height/3);
          break;
        case "J2" :
          c.fillRect(this.x, this.y, this.width/3, this.height);
          c.fillRect(this.x, this.y+20, this.width, this.height/2);
          break;
        case "J3" :
          c.fillRect(this.x, this.y, this.width, this.height/3);
          c.fillRect(this.x, this.y, this.width/2, this.height);
          break;
        case "J4" :
          c.fillRect(this.x, this.y, this.width, this.height/2);
          c.fillRect(this.x+60, this.y, this.width/3, this.height);
          break;

        case "S1" :
          c.fillRect(this.x, this.y, this.width/2, this.height*2/3);
          c.fillRect(this.x+20, this.y+20, this.width/2, this.height*2/3);
          break;
        case "S2" :
          c.fillRect(this.x+20, this.y, this.width*2/3, this.height/2);
          c.fillRect(this.x, this.y+20, this.width*2/3, this.height/2);
          break;
        case "Z1" :
          c.fillRect(this.x+20, this.y, this.width/2, this.height*2/3);
          c.fillRect(this.x, this.y+20, this.width/2, this.height*2/3);
          break;
        case "Z2" :
          c.fillRect(this.x, this.y, this.width*2/3, this.height/2);
          c.fillRect(this.x+20, this.y+20, this.width*2/3, this.height/2);
          break;
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
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
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
        case "T1" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][this.x/20] === 0) {
              return true;
            }
          break;
        case "T2" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x)/20] === 0) {
              return true;
            }
          break;
        case "T3" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y+20)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y)/20][this.x/20] === 0) {
              return true;
            }
          break;
        case "T4" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x-20)/20] === 0) {
              return true;
            }
          break;
        case "L1" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x-20)/20] === 0) {
              return true;
            }
          break;
        case "L2" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][this.x-20/20] === 0) {
              return true;
            }
          break;
        case "L3" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x)/20] === 0) {
              return true;
            }
          break;
        case "L4" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][this.x-20/20] === 0) {
              return true;
            }
          break;

        case "J1" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x-20)/20] === 0) {
              return true;
            }
          break;
        case "J2" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][this.x-20/20] === 0) {
              return true;
            }
          break;
        case "J3" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x-20)/20] === 0) {
              return true;
            }
          break;
        case "J4" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][this.x+40/20] === 0) {
              return true;
            }
          break;

        case "S1" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x)/20] === 0) {
              return true;
            }
          break;
        case "S2" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][this.x-20/20] === 0) {
              return true;
            }
          break;
        case "Z1" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x-20)/20] === 0) {
              return true;
            }
          break;
        case "Z2" :
          if (this.x >= 20
            && droppedFormsGrid[(this.y)/20][(this.x-20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][this.x/20] === 0) {
              return true;
            }
          break;
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
            && droppedFormsGrid[(this.y)/20][(this.x+20)/20] === 0
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
        case "T1" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+60)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "T2" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "T3" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y+20)/20][(this.x+60)/20] === 0
            && droppedFormsGrid[(this.y)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "T4" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0) {
              return true;
            }
          break;
        case "L1" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "L2" :
        if (this.x + this.width <= 180
          && droppedFormsGrid[(this.y)/20][(this.x+60)/20] === 0
          && droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] === 0) {
            return true;
          }
          break;
        case "L3" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "L4" :
        if (this.x + this.width <= 180
          && droppedFormsGrid[(this.y)/20][(this.x+60)/20] === 0
          && droppedFormsGrid[(this.y+20)/20][(this.x+60)/20] === 0) {
            return true;
          }
          break;

        case "J1" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "J2" :
        if (this.x + this.width <= 180
          && droppedFormsGrid[(this.y)/20][(this.x+20)/20] === 0
          && droppedFormsGrid[(this.y+20)/20][(this.x+60)/20] === 0) {
            return true;
          }
          break;
        case "J3" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0) {
              return true;
            }
          break;
        case "J4" :
        if (this.x + this.width <= 180
          && droppedFormsGrid[(this.y)/20][(this.x+60)/20] === 0
          && droppedFormsGrid[(this.y+20)/20][(this.x+60)/20] === 0) {
            return true;
          }
          break;

        case "S1" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "S2" :
        if (this.x + this.width <= 180
          && droppedFormsGrid[(this.y)/20][(this.x+60)/20] === 0
          && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0) {
            return true;
          }
          break;
        case "Z1" :
          if (this.x + this.width <= 180
            && droppedFormsGrid[(this.y)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0) {
              return true;
            }
          break;
        case "Z2" :
        if (this.x + this.width <= 180
          && droppedFormsGrid[(this.y)/20][(this.x+40)/20] === 0
          && droppedFormsGrid[(this.y+20)/20][(this.x+60)/20] === 0) {
            return true;
          }
          break;
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
        case "T1" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+20)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "T2" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+40)/20][(this.x)/20] === 0
            && droppedFormsGrid[(this.y+60)/20][(this.x+20)/20] === 0) {
              return true;
            }
          break;
        case "T3" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+40)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "T4" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+60)/20][(this.x)/20] === 0) {
              return true;
            }
          break;
        case "L1" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+60)/20][(this.x)/20] === 0
            && droppedFormsGrid[(this.y+60)/20][(this.x+20)/20] === 0) {
              return true;
            }
          break;
        case "L2" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+40)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "L3" :
        if (currentForm.y + currentForm.height <= 420
          && droppedFormsGrid[(this.y+20)/20][(this.x)/20] === 0
          && droppedFormsGrid[(this.y+60)/20][(this.x+20)/20] === 0) {
            return true;
          }
          break;
        case "L4" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+40)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "J1" :
        if (currentForm.y + currentForm.height <= 420
          && droppedFormsGrid[(this.y+60)/20][(this.x)/20] === 0
          && droppedFormsGrid[(this.y+60)/20][(this.x+20)/20] === 0) {
            return true;
          }
          break;
        case "J2" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+40)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "J3" :
        if (currentForm.y + currentForm.height <= 420
          && droppedFormsGrid[(this.y+60)/20][(this.x)/20] === 0
          && droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] === 0) {
            return true;
          }
          break;
        case "J4" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+20)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "S1" :
        if (currentForm.y + currentForm.height <= 420
          && droppedFormsGrid[(this.y+40)/20][(this.x)/20] === 0
          && droppedFormsGrid[(this.y+60)/20][(this.x+20)/20] === 0) {
            return true;
          }
          break;
        case "S2" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+40)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
        case "Z1" :
        if (currentForm.y + currentForm.height <= 420
          && droppedFormsGrid[(this.y+60)/20][(this.x)/20] === 0
          && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0) {
            return true;
          }
          break;
        case "Z2" :
          if (currentForm.y + currentForm.height <= 420
            && droppedFormsGrid[(this.y+20)/20][this.x/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] === 0
            && droppedFormsGrid[(this.y+40)/20][(this.x+40)/20] === 0) {
              return true;
            }
          break;
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
        case "T1" :
          droppedFormsGrid[this.y/20][this.x/20] = 1
          droppedFormsGrid[this.y/20][(this.x+20)/20] = 1
          droppedFormsGrid[this.y/20][(this.x+40)/20] = 1
          droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
          break;
        case "T2" :
          droppedFormsGrid[this.y/20][(this.x+20)/20] = 1
          droppedFormsGrid[(this.y+20)/20][(this.x)/20] = 1
          droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
          droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] = 1
          break;
        case "T3" :
          droppedFormsGrid[(this.y)/20][(this.x+20)/20] = 1
          droppedFormsGrid[(this.y+20)/20][(this.x)/20] = 1
          droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
          droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] = 1
          break;
        case "T4" :
          droppedFormsGrid[this.y/20][this.x/20] = 1
          droppedFormsGrid[(this.y+20)/20][(this.x)/20] = 1
          droppedFormsGrid[(this.y+40)/20][(this.x)/20] = 1
          droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
          break;
        case "L1" :
        droppedFormsGrid[this.y/20][this.x/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x)/20] = 1
        droppedFormsGrid[(this.y+40)/20][(this.x)/20] = 1
        droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] = 1
          break;
        case "L2" :
        droppedFormsGrid[this.y/20][this.x/20] = 1
        droppedFormsGrid[this.y/20][(this.x+20)/20] = 1
        droppedFormsGrid[this.y/20][(this.x+40)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x)/20] = 1
          break;
        case "L3" :
        droppedFormsGrid[this.y/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y)/20][(this.x)/20] = 1
          break;
        case "L4" :
        droppedFormsGrid[(this.y+20)/20][this.x/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] = 1
        droppedFormsGrid[(this.y)/20][(this.x+40)/20] = 1
          break;
        case "J1" :
        droppedFormsGrid[this.y/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+40)/20][(this.x)/20] = 1
          break;
        case "J2" :
        droppedFormsGrid[(this.y+20)/20][this.x/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] = 1
        droppedFormsGrid[(this.y)/20][(this.x)/20] = 1
          break;
        case "J3" :
        droppedFormsGrid[this.y/20][this.x/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x)/20] = 1
        droppedFormsGrid[(this.y+40)/20][(this.x)/20] = 1
        droppedFormsGrid[(this.y)/20][(this.x+20)/20] = 1
          break;
        case "J4" :
        droppedFormsGrid[this.y/20][this.x/20] = 1
        droppedFormsGrid[this.y/20][(this.x+20)/20] = 1
        droppedFormsGrid[this.y/20][(this.x+40)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] = 1
          break;
        case "S1" :
        droppedFormsGrid[this.y/20][this.x/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x)/20] = 1
        droppedFormsGrid[(this.y+40)/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
          break;
        case "S2" :
        droppedFormsGrid[this.y/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y)/20][(this.x+40)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
          break;
        case "Z1" :
        droppedFormsGrid[this.y/20][this.x+20/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+40)/20][(this.x)/20] = 1
          break;
        case "Z2" :
        droppedFormsGrid[this.y/20][this.x/20] = 1
        droppedFormsGrid[(this.y)/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+20)/20] = 1
        droppedFormsGrid[(this.y+20)/20][(this.x+40)/20] = 1
          break;
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

function rotate() {
  let currentX = currentForm.x;
  let currentY = currentForm.y;
  switch(rotatedForm) { //in each case, we draw the next rotation, "rotatedForm" is the present form & rotation.
    case "O1" :
      currentForm = new Form(currentX, currentY , 40, 40, "O", 1);
      break;
    case "I1" :
      currentForm = new Form(currentX, currentY , 80, 20, "I", 2);
      break;
    case "I2" :
      currentForm = new Form(currentX, currentY , 20, 80, "I", 1);
      break;
    case "T1" :
      currentForm = new Form(currentX, currentY , 40, 60, "T", 2);
      break;
    case "T2" :
      currentForm = new Form(currentX, currentY , 60, 40, "T", 3);
      break;
    case "T3" :
      currentForm = new Form(currentX, currentY , 40, 60, "T", 4);
      break;
    case "T4" :
      currentForm = new Form(currentX, currentY , 60, 40, "T", 1);
      break;
    case "L1" :
      currentForm = new Form(currentX, currentY , 60, 40, "L", 2);
      break;
    case "L2" :
      currentForm = new Form(currentX, currentY , 40, 60, "L", 3);
      break;
    case "L3" :
      currentForm = new Form(currentX, currentY , 60, 40, "L", 4);
      break;
    case "L4" :
      currentForm = new Form(currentX, currentY , 40, 60, "L", 1);
      break;
    case "J1" :
      currentForm = new Form(currentX, currentY , 60, 40, "J", 2);
      break;
    case "J2" :
      currentForm = new Form(currentX, currentY , 40, 60, "J", 3);
      break;
    case "J3" :
      currentForm = new Form(currentX, currentY , 60, 40, "J", 4);
      break;
    case "J4" :
      currentForm = new Form(currentX, currentY , 40, 60, "J", 1);
      break;
    case "S1" :
      currentForm = new Form(currentX, currentY , 60, 40, "S", 2);
      break;
    case "S2" :
      currentForm = new Form(currentX, currentY , 40, 60, "S", 1);
      break;
    case "Z1" :
      currentForm = new Form(currentX, currentY , 60, 40, "Z", 2);
      break;
    case "Z2" :
      currentForm = new Form(currentX, currentY , 40, 60, "Z", 1);
      break;
  }
    rotatedForm = `${currentForm.form}${currentForm.rotation}`;
    console.log("form:", rotatedForm);
}
// Implementation
let currentForm
function init() {
  const formAndRotationParams = [
    // [60, 0, 40, 40, "O", 1],
    // [60, 0, 20, 80, "I", 1], [60, 0, 80, 20, "I", 2],
    // [60, 0, 60, 40, "T", 1], [60, 0, 40, 60, "T", 2], [60, 0, 60, 40, "T", 3], [60, 0, 40, 60, "T", 4],
    [60, 0, 40, 60, "L", 1], [60, 0, 60, 40, "L", 2], [60, 0, 40, 60, "L", 3], [60, 0, 60, 40, "L", 4],
    [60, 0, 40, 60, "J", 1], [60, 0, 60, 40, "J", 2], [60, 0, 40, 60, "J", 3], [60, 0, 60, 40, "J", 4],
    // [60, 0, 40, 60, "S", 1], [60, 0, 60, 40, "S", 2],
    // [60, 0, 40, 60, "Z", 1], [60, 0, 60, 40, "Z", 2]
   ];
  let index = Math.floor(Math.random() * formAndRotationParams.length)
  let newForm = formAndRotationParams[index];
  currentForm = new Form(60, 0, newForm[2], newForm[3], newForm[4], newForm[5]);
  rotatedForm = `${currentForm.form}${currentForm.rotation}`;
  console.log("form:", rotatedForm);
  formFalls();
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    currentForm.update();
}

init()
animate()
