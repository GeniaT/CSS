const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 200;
canvas.height = 440;

document.onkeydown = function(e) {
  switch (e.keyCode) {
      case 37:
          console.log('left');
          break;
      case 38:
          console.log('up');
          break;
      case 39:
          console.log('right');
          break;
      case 40:
          console.log('down');
          break;
    }
}

function init() {
  let index = Math.floor(Math.random() * formAndRotationParams.length)
  let newForm = // To complete
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    currentForm.update();
}

init()
animate()

//Check if animate is needed without a Form class.
//See how can I mix the animate functionnality without creating a class. 
