const gridContainer = document.getElementById('grid');
const gridSizeText = document.getElementById('gridSizeText');
const gridSizeInput = document.getElementById('gridSize');
const borderBtn = document.getElementById('borderBtn');
const clearBtn = document.getElementById('clearBtn');

let rowNum = 16;
let colNum = 16;
let mouseDown = false;

let colorMode = 'COLOR_MODE';
let color = '#333';


CreateGrid(colNum, rowNum);

// Create grid with possibility of non-square layouts
function CreateGrid(row, column) {
  clearGrid();
  gridContainer.style.gridTemplateColumns = `repeat(${column}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;

  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      const gridCell = document.createElement('div');
      gridCell.classList.add('grid-item', 'grid-item-border');
      gridCell.addEventListener('mouseenter', changeColor);
      gridCell.addEventListener('mousedown', changeColor);
      gridContainer.appendChild(gridCell);
    }
  }
}

function clearGrid() {
  gridContainer.innerHTML = '';
}

function updateLabelText() {
  gridSizeText.innerText = `Grid Size: ${gridSizeInput.value} x ${gridSizeInput.value}`;
}

function changeColor(event) {
  if (event.type === 'mouseenter' && !mouseDown) return;
  
  if (colorMode === 'COLOR_MODE') {
    event.target.style.backgroundColor = color;
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

// Toggles border on and off
borderBtn.addEventListener('click', () => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.classList.toggle('grid-item-border');
  });
});

// Determine if mouse button is held down or not
document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);

// Clear grid
clearBtn.addEventListener('click', () => {
  clearGrid();
  CreateGrid(colNum, rowNum);
});