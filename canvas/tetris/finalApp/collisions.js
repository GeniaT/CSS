function checkLeftCollision() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1 && gameGrid[currentY + row][currentX - 1 + col][0] === 2) {
        return false;//go left not permitted
      }
    }
  }
  return true; //permitted
}

function checkRightCollision() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1 && gameGrid[currentY + row][currentX + 1 + col][0] === 2) {
        return false;//go left not permitted
      }
    }
  }
  return true; //permitted
}

function checkBottomCollision() {
  //check if all the '1s' in current form state will meet '0s' in the gameGrid
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1 && gameGrid[currentY + 1 + row][currentX + col][0] === 2) {
        return false;
      }
    }
  }
  return true;
}
