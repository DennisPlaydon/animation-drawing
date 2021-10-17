var gridSize = 13
var canvasSize = 600
var currentFrame = 0
var polarity = 1

var slider;
function setup() {
    createCanvas(canvasSize, canvasSize);
    frameRate(3); 
    slider = createSlider(5, 57, 5);
    slider.position(10, 650);
    slider.style('width', '180px');
}

function draw() {
    // Only set gridSize to odd numbers
    gridSize = 2 * Math.floor(slider.value()/2) + 1
    background(0, 195, 192);
    drawGridCircles(gridSize)
    drawGrowingSquares(gridSize);
}

function drawGrowingSquares(gSize) {
    let gridWidth = canvasSize/gSize
    
    let squareWidth = currentFrame * 2 + 1
    // let squareWidth = 5
    
    if (currentFrame % 2 == 0){ 
        fill(255,110,110);
    }
    else {
        fill(110,110,255);
    }
    let centerCell = Math.floor(gSize/2)
    let startingX = gridWidth/2+(centerCell-currentFrame)*gridWidth
    let startingY = gridWidth/2+(centerCell-currentFrame)*gridWidth
    
    for (let heightCount = 0; heightCount < squareWidth; heightCount++) {
        for (let widthCount = 0; widthCount < squareWidth; widthCount++) {
            ellipse(startingX+widthCount*gridWidth, startingY+heightCount*gridWidth, gridWidth, gridWidth);
        }
    }
    // ellipse(startingX-(currentFrame*gridWidth),startingY-(currentFrame*gridWidth),gridWidth,gridWidth);

    currentFrame++

    if (currentFrame > gridSize/2) {
        resetAnimation()
    }
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