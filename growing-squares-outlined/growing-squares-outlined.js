var gridSize = 13
var canvasSize = 600
var currentFrame = 0

var gridSlider;
var frameRateSlider;
function setup() {
    let sliderAndTextBuffer = 100
    createCanvas(canvasSize, canvasSize+sliderAndTextBuffer);
    frameRate(3); 
    gridSlider = createSlider(5, 57, 13);
    gridSlider.position(10, 680);
    gridSlider.style('width', '180px');

    frameRateSlider = createSlider(1, 60, 3);
    frameRateSlider.position(220, 680);
    frameRateSlider.style('width', '90px');
}

function draw() {
    // Only set gridSize to odd numbers
    gridSize = 2 * Math.floor(gridSlider.value()/2) + 1

    background(0, 195, 192);
    drawGridCircles(gridSize)
    drawGrowingSquares(gridSize, currentFrame);
    drawGrowingSquares(gridSize, currentFrame-2);
    drawGrowingSquares(gridSize, currentFrame-4);

    textSize(25);
    fill(1);
    text(`Grid Size (${gridSlider.value()}x${gridSlider.value()})`, 5, 660);
    text(`Frame rate (${frameRateSlider.value()} fps)`, 215, 660);
    frameRate(frameRateSlider.value())

    currentFrame++
    if (currentFrame > gridSize/2) {
        resetAnimation()
    }
}

const drawGrowingSquares = (gSize, currentFrame) => {
    let squareWidth = currentFrame * 2 + 1
    
    drawSquare(squareWidth, gSize, 'red', currentFrame)

    let innerTopLeftOffset = 1
    drawSquare(squareWidth-2, gSize, 'white', currentFrame, innerTopLeftOffset)
}

const drawSquare = (size, gSize, colour, currentFrame, offset = 0) => {
    fill(colour)

    let individualCellWidth = canvasSize/gSize
    let centerCell = Math.floor(gSize/2)
    let topLeftX = individualCellWidth/2+(centerCell-currentFrame+offset)*individualCellWidth
    let topLeftY = individualCellWidth/2+(centerCell-currentFrame+offset)*individualCellWidth

    // Draw N x M square
    for (let heightCount = 0; heightCount < size; heightCount++) {
        for (let widthCount = 0; widthCount < size; widthCount++) {
            ellipse(topLeftX+widthCount*individualCellWidth, topLeftY+heightCount*individualCellWidth, individualCellWidth, individualCellWidth);
        }
    }
}

const resetAnimation = () => currentFrame = 0

const drawGridCircles = (numCirclesToDraw) => {
    fill('white')
    let gridWidth = canvasSize / numCirclesToDraw
    for (let vertical = 0; vertical < numCirclesToDraw; vertical++) { 
        for (let horizontal = 0; horizontal < gridSize; horizontal++) { 
            ellipse(gridWidth/2+(horizontal*gridWidth),gridWidth/2+(vertical*gridWidth),gridWidth,gridWidth);
        }
    }
}