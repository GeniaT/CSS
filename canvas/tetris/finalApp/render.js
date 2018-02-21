function clearPreviousFormState() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (gameGrid[currentY + row][currentX + col] === 1) {
        gameGrid[currentY + row][currentX + col] = 0;
        c.clearRect((currentX - 2 + col) * 20, (currentY + row) * 20, 20, 20);
      }
    }
  }
}

function rotate() {
  //4x4 grid to rotate: columns become rows starting from bottom of the column.
  let rotatedForm = [[],[],[],[]];
  for (let col = 0; col <= 3; col++) {
    for (let row = 3; row >=0; row--) {
      rotatedForm[col][3-row] = currentForm[row][col];
    }
  }
  let tempCurrentForm = rotatedForm; //temporali saving the 4x4 grid of the rotated form

  for (let row = 0; row <= 3; row++) { //check if this new rotation can fit the grid, if not return.
    for (let col = 0; col <= 3; col++) {
      if (tempCurrentForm[row][col] === 1 && gameGrid[currentY + row][currentX + col][0] === 2) {
        // rotation not permitted
        return;
      } else if (row === 3 && col === 3) {
        // rotation is permitted
        clearPreviousFormState();
        currentForm = rotatedForm;
        renderCurrentForm();
      }
    }
  }
}

let numberOfLines = 0;
function checkFullLines() {
  let fullLines = false;
  for (let i = 0; i < 22; i++) {
    if (gameGrid[i].indexOf(0) === -1) { //if full line
      fullLines = true
      gameGrid.splice(i, 1);
      gameGrid.unshift([[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]]);

      numberOfLines++;
      document.getElementById("fullLines").innerHTML = numberOfLines;
      score = Number((score + 50/(1000/speed)).toFixed()); //each line bonus gets bigger as the speed increases.
      document.getElementById("score").innerHTML = score;
      // console.log(score);
      if (numberOfLines % 10 === 9) {
        speed = 0.9 * speed;
        level++;
        document.getElementById("level").innerHTML = level;
      }
    }
  }
  if (fullLines) {
    rerenderCanvas();
  }
}

function rerenderCanvas() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < 22; row ++) {
    for (let col = 1; col < 12; col++) {
      if (gameGrid[row][col][0] === 2) {
        c.fillStyle = colors[gameGrid[row][col][1]];
        c.fillRect((col - 2) * 20, row* 20, 20, 20);
      }
    }
  }
}



function fixFormToGrid() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1) {
        gameGrid[currentY + row][currentX + col] = [2, randomNr];
        c.fillRect((currentX - 2 + col) * 20, (currentY + row) * 20, 20, 20);
      }
    }
  }
}
