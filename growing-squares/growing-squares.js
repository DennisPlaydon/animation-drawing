var gridSize = 13
var canvasSize = 600
var currentFrame = 0
var polarity = 1

var gridSlider;
var frameRateSlider;
function setup() {
    let sliderAndTextBuffer = 100
    createCanvas(canvasSize, canvasSize+sliderAndTextBuffer);
    frameRate(3); 
    gridSlider = createSlider(5, 57, 5);
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
    drawGrowingSquares(gridSize);

    textSize(25);
    fill(1);
    text(`Grid Size (${gridSlider.value()}x${gridSlider.value()})`, 5, 660);
    text(`Frame rate (${frameRateSlider.value()} fps)`, 215, 660);
    frameRate(frameRateSlider.value())
}

function drawGrowingSquares(gSize) {
    let individualCellWidth = canvasSize/gSize
    let squareWidth = currentFrame * 2 + 1
    
    setFill()
    let centerCell = Math.floor(gSize/2)
    let topLeftX = individualCellWidth/2+(centerCell-currentFrame)*individualCellWidth
    let topLeftY = individualCellWidth/2+(centerCell-currentFrame)*individualCellWidth
    
    // Draw N x M square
    for (let heightCount = 0; heightCount < squareWidth; heightCount++) {
        for (let widthCount = 0; widthCount < squareWidth; widthCount++) {
            ellipse(topLeftX+widthCount*individualCellWidth, topLeftY+heightCount*individualCellWidth, individualCellWidth, individualCellWidth);
        }
    }

    currentFrame++
    if (currentFrame > gridSize/2) {
        resetAnimation()
    }
}

function setFill() {
    fill(255,110,110);
}

function resetAnimation() {
    currentFrame = 0
}

function drawGridCircles(numCirclesToDraw) {
    fill('white')
    let gridWidth = canvasSize / numCirclesToDraw
    for (let vertical = 0; vertical < numCirclesToDraw; vertical++) { 
        for (let horizontal = 0; horizontal < gridSize; horizontal++) { 
            ellipse(gridWidth/2+(horizontal*gridWidth),gridWidth/2+(vertical*gridWidth),gridWidth,gridWidth);
        }
    }
}