const gridContainer = document.getElementById('grid');
const gridSizeText = document.getElementById('gridSizeText');
const gridSizeInput = document.getElementById('gridSize');

let rowNum = 16;
let colNum = 16;

CreateGrid(colNum, rowNum);

function CreateGrid(row, column) {
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${column}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;

  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      const gridCell = document.createElement('div');
      gridCell.classList.add('grid-item');
      gridContainer.appendChild(gridCell)
    }
  }
}

// Update label while adjusting the slider
gridSizeInput.addEventListener('mousedown', () => {
  gridSizeInput.addEventListener('mousemove', updateLabelText);
});

// remove event listener for moving the slider and update grid
gridSizeInput.addEventListener('mouseup', () => {
  gridSizeInput.removeEventListener('mousemove', updateLabelText);
  colNum = rowNum = gridSizeInput.value;
  CreateGrid(colNum, rowNum);
});

function updateLabelText() {
  gridSizeText.innerText = `Grid Size: ${gridSizeInput.value} x ${gridSizeInput.value}`;
}