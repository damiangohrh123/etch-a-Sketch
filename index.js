//Declaring all the variables here
const gridContainer = document.querySelector('.gridContainer');
const gridItems = gridContainer.getElementsByClassName('grit-item');
const colourPicker = document.querySelector('#colourPicker');
const clearBtn = document.querySelector('.clear')
let isMouseDown = false;
let currentColour = '#000000';

//Slider input
const slider = document.querySelector('.slider');
const sliderDisplay = document.querySelector('.sliderDisplay');

//Colour Picker input
colourPicker.addEventListener('input', (event) => {
currentColour = event.target.value;
});

//Colour modes
let colourmode = 'colour';
const colourBtn = document.querySelector('.colour');
const rainbowBtn = document.querySelector('.rainbow');
const eraserBtn = document.querySelector('.eraser');

//Colour modes button mode change
colourBtn.addEventListener('click', () => {
    colourmode = 'colour';
    colourBtn.classList.add('buttonSelected');
    rainbowBtn.classList.remove('buttonSelected');
    eraserBtn.classList.remove('buttonSelected');
});
rainbowBtn.addEventListener('click', () => {
    colourmode = 'rainbow';
    colourBtn.classList.remove('buttonSelected');
    rainbowBtn.classList.add('buttonSelected');
    eraserBtn.classList.remove('buttonSelected');
});
eraserBtn.addEventListener('click', () => {
    colourmode = 'eraser';
    colourBtn.classList.remove('buttonSelected');
    rainbowBtn.classList.remove('buttonSelected');
    eraserBtn.classList.add('buttonSelected');
});

//Clear button to reset the grid back to white
clearBtn.addEventListener('click', () => {
    clear();
});

//Slider input display
slider.addEventListener('input', () => {
    const sliderValue = slider.value;
    sliderDisplay.textContent = (sliderValue + ' x ' + sliderValue);
    updateGridSize(sliderValue);
});

//Default grid size (16 x 16)
updateGridSize(16);

//Update grid size
function updateGridSize(size) {
    //Clear the grid before the input.
    while (gridContainer.firstChild) {
        gridContainer.firstChild.remove();
      }

    //For loop to create the grid using input size as argument
    if (size > 0) {
        for (let i = 0; i < (size * size); i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridContainer.appendChild(gridItem);
        }
    } 

    //Constraining the grid items accoring to the size (Length and Width).
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

//Colouring of grids
gridContainer.addEventListener('mousedown', () => {
    isMouseDown = true;
});
gridContainer.addEventListener('mouseup', () => {
    isMouseDown = false;
});
gridContainer.addEventListener('mouseover', (event) => {
    if (isMouseDown === true && colourmode === 'colour' && event.target.classList.contains('grid-item')) {
        event.target.style.backgroundColor = currentColour;
    }
    else if (isMouseDown === true && colourmode === 'rainbow' && event.target.classList.contains('grid-item')) {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
    else if (isMouseDown === true && colourmode === 'eraser' && event.target.classList.contains('grid-item')) {
        event.target.style.backgroundColor = '#FFFFFF';
    }
})

//Get all grid items into an array and use for loop to turn them white.
function clear() {
    const gridWhite = document.querySelectorAll('.grid-item');
    for (let i = 0; i < gridWhite.length; i++) {
        gridWhite[i].style.backgroundColor = 'white';
      }
}



