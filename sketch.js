const GRID_SIZE = 30;
let numberOfPresents;
let squares;
let mouseIsOverSquare, squareClicked;

class Squares {
    squareX;
    squareY;

    constructor(x, y) {
        this.squareX = x;
        this.squareY = y;
    }

    drawSquare() {
        noStroke();
        fill(20, 255, 0);
        square(this.squareX, this.squareY, GRID_SIZE - 5);
    }

    mouseOverSquare() {
        if(mouseX < (squareHeight + squareX) && mouseX > squareX && 
            mouseY > squareY && mouseY < (squareHeight + squareY)) {
            mouseIsOverSquare = true;
        }
        else {
            mouseIsOverSquare = false;
        }
    }
}

function setup() {
    createCanvas(GRID_SIZE * 20, GRID_SIZE * 30);
    numberOfPresents = floor(random(20, 30));
    console.log(numberOfPresents);

    squareClicked = false;
}

function draw() {
    background(200, 40, 20);

    squares = new Squares(GRID_SIZE, GRID_SIZE);

    // if(0 < mouseX < i && 0 < mouseY < j && mouseClicked) {
    //     squareClicked = true;
    // }

    // for(let i = 15; i < width - GRID_SIZE + 15; i += GRID_SIZE) {
    //     for(let j = GRID_SIZE * 5; j < height - GRID_SIZE - 15; j += GRID_SIZE) {
    //         if(squareClicked === false) {
    //             fill(180);
    //             noStroke();
    //             square(i, j, GRID_SIZE - 5);
    //         }
    //         else {
    //             fill(180, 0);
    //             noStroke();
    //             square(i, j, GRID_SIZE - 5);
    //         }
    //     }
    // }
    
}

function mousePressed() {
    if(mouseIsOverSquare === true) {
        squareClicked = true;
        fill(20, 0, 255, 0);
    }
}