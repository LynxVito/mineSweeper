const GRID_SIZE = 30;
let numberOfPresents;
let squares;
let mouseIsOverSquare, squareClicked;
let squareHeight;
let squareX, squareY;

class Squares {
    squareX;
    squareY;

    constructor(x, y) {
        this.squareX = x;
        this.squareY = y;
    }

    drawSquare() {
        noStroke();
        square(this.squareX, this.squareY, 25);

        console.log(this.squareX, this.squareY);
    }

    mouseOverSquare() {
        if(mouseX < (25 + this.squareX) && mouseX > this.squareX && 
            mouseY > this.squareY && mouseY < (25 + this.squareY)) {
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
    mouseIsOverSquare = false;

    squares = new Squares(0, 0);

    fill(20, 255, 0);
}

function draw() {
    background(200, 40, 20);

    squares.drawSquare();
    squares.mouseOverSquare();

    // for(squareX = 15; squareX < width - GRID_SIZE + 15; squareX += GRID_SIZE) {
    //     for(squareY = GRID_SIZE * 5; squareY < height - GRID_SIZE - 15; squareY += GRID_SIZE) {
    //             squares.drawSquare();
    //             squares.mouseOverSquare();
    //         }
    //     }
    // }

    // squareX = 0;
    // squareY = 0;
    // squareHeight = GRID_SIZE - 5;

    // noStroke();
    // square(squareX, squareY, squareHeight);

    // mouseOverSquare();

    // console.log(mouseIsOverSquare, mouseIsPressed);
    
}

// function mouseOverSquare() {
//     if(mouseX < (squareHeight + squareX) && mouseX > squareX && 
//         mouseY > squareY && mouseY < (squareHeight + squareY)) {
//         mouseIsOverSquare = true;
//     }
//     else {
//         mouseIsOverSquare = false;
//     }
// }

function mousePressed() {
    if(mouseIsOverSquare === true) {
        squareClicked = true;
        fill(20, 0, 255, 0);
    }
}