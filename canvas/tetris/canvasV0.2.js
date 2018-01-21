const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 200;
canvas.height = 440;

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
          if (currentForm.y + currentForm.height <= 420) {
            currentForm.y = currentForm.y + 20;
          }
          break;
    }
}

function formFalls() {
    let interval = setInterval(function() {
      if (currentForm.y + currentForm.height <= 420) {
        currentForm.y = currentForm.y + 20;
      } else {
        clearInterval(interval);
        init()
      }
    }, 1000);
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
}

// Implementation
let currentForm
function init() {
  currentForm = new Form(60, 0, 40, 40);
  formFalls();
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    currentForm.update();
}

init()
animate()
