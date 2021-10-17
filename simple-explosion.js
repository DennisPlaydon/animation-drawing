var gridSize = 13
var canvasSize = 600
var currentFrame = 0
var polarity = 1

var slider;
function setup() {
    createCanvas(canvasSize, canvasSize);
    frameRate(3); 
    slider = createSlider(7, 57, 15);
    slider.position(10, 650);
    slider.style('width', '180px');
}

function draw() {
    gridSize = slider.value()
    background(0, 195, 192);
    drawCircles(gridSize)

    modifyCircle(gridSize)
}

function modifyCircle(gSize) {
    let gridWidth = canvasSize/gSize
    let centerCell =  Math.floor(gSize/2)

    fill(52);
    let startingX = gridWidth/2+centerCell*gridWidth
    let startingY = gridWidth/2+centerCell*gridWidth

    // Bottom right + Top left
    ellipse(startingX+(currentFrame*gridWidth),startingY+(currentFrame*gridWidth),gridWidth,gridWidth);
    ellipse(startingX-(currentFrame*gridWidth),startingY-(currentFrame*gridWidth),gridWidth,gridWidth);
    
    // Top right + Bottom left
    ellipse(startingX+(currentFrame*gridWidth),startingY-(currentFrame*gridWidth),gridWidth,gridWidth);
    ellipse(startingX-(currentFrame*gridWidth),startingY+(currentFrame*gridWidth),gridWidth,gridWidth);

    // Right + Left
    ellipse(startingX+(currentFrame*gridWidth),startingY,gridWidth,gridWidth);
    ellipse(startingX-(currentFrame*gridWidth),startingY,gridWidth,gridWidth);

    // Up + Down
    ellipse(startingX,startingY-(currentFrame*gridWidth),gridWidth,gridWidth);
    ellipse(startingX,startingY+(currentFrame*gridWidth),gridWidth,gridWidth);

    currentFrame+=polarity
    fill('white')

    // This is to fix a bug where if you increase the grid size and immediately shrink it back down.
    // The current frame is much larger than the grid size so it freaks itself out.
    if (currentFrame-2 > gridSize/2) {
        currentFrame = Math.floor(gridSize/2)
        polarity = -1
    }

    if (currentFrame > gridSize/2 || currentFrame < 1) {
        polarity *= -1
    }
}

function drawCircles(numCirclesToDraw) {
    let gridWidth = canvasSize / numCirclesToDraw
    for (let vertical = 0; vertical < numCirclesToDraw; vertical++) { 
        for (let horizontal = 0; horizontal < gridSize; horizontal++) { 
            ellipse(gridWidth/2+(horizontal*gridWidth),gridWidth/2+(vertical*gridWidth),gridWidth,gridWidth);
        }
    }
}